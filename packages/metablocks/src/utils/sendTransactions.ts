// @ts-nocheck
import {
  Commitment,
  Connection,
  Keypair,
  SignatureStatus,
  RpcResponseAndContext,
  SimulatedTransactionResponse,
  Transaction,
  TransactionInstruction,
  TransactionSignature,
} from '@solana/web3.js';
import { SequenceType } from '../types';

interface TransactionInstructionWithType {
  instructionsSet: TransactionInstruction[];
  sequenceType?: SequenceType;
}

interface TransactionsPlayingIndexes {
  transactionsIdx: { [txIdx: number]: number }[];
  sequenceType?: SequenceType;
}

interface Block {
  blockhash: string;
  lastValidBlockHeight: number;
}

export const sendTransactionsV2 = async ({
  connection,
  wallet,
  TransactionInstructions,
  signersSet,
  block,
}: {
  connection: Connection;
  wallet: any;
  TransactionInstructions: TransactionInstructionWithType[];
  signersSet: Keypair[][];
  block?: Block;
  showUiComponent?: boolean;
}) => {
  if (!wallet.publicKey) throw new Error('Wallet not connected!');
  //block will be used for timeout calculation
  if (!block) {
    block = await connection.getLatestBlockhash('confirmed');
  }

  const maxTransactionsInBath =
    TransactionInstructions.filter(
      (x) => x.sequenceType === SequenceType.Sequential
    ).length > 0
      ? 20
      : 30;
  const currentTransactions = TransactionInstructions.slice(
    0,
    maxTransactionsInBath
  );
  const unsignedTxns: Transaction[] = [];
  //this object will determine how we run transactions e.g [ParallelTx, SequenceTx, ParallelTx]
  const transactionCallOrchestrator: TransactionsPlayingIndexes[] = [];
  for (let i = 0; i < currentTransactions.length; i++) {
    const transactionInstruction = currentTransactions[i];
    const signers = signersSet[i];

    if (transactionInstruction.instructionsSet.length === 0) {
      continue;
    }

    const transaction = new Transaction({ feePayer: wallet.publicKey });
    transactionInstruction.instructionsSet.forEach((instruction) =>
      transaction.add(instruction)
    );
    transaction.recentBlockhash = block.blockhash;

    if (signers.length > 0) {
      transaction.partialSign(...signers);
    }
    //we take last index of unsignedTransactions to have right indexes because
    //if transactions was empty
    //then unsigned transactions could not mach TransactionInstructions param indexes
    const currentUnsignedTxIdx = unsignedTxns.length;
    const currentTransactionCall =
      transactionCallOrchestrator[transactionCallOrchestrator.length - 1];
    //we check if last item in current transactions call type is same
    //if not then we create next transaction type
    if (
      currentTransactionCall &&
      currentTransactionCall.sequenceType ===
        transactionInstruction.sequenceType
    ) {
      //we push reflection of transactionInstruction as object value for retry.
      currentTransactionCall.transactionsIdx.push({
        [currentUnsignedTxIdx]: i,
      });
    } else {
      transactionCallOrchestrator.push({
        //we push reflection of transactionInstruction as object value for retry.
        transactionsIdx: [{ [currentUnsignedTxIdx]: i }],
        sequenceType: transactionInstruction.sequenceType,
      });
    }
    unsignedTxns.push(transaction);
  }
  console.log(transactionCallOrchestrator);
  const signedTxns = await wallet.signAllTransactions(unsignedTxns);

  console.log(
    'Transactions play type order',
    transactionCallOrchestrator.map((x) => {
      return {
        ...x,
        sequenceType:
          typeof x.sequenceType !== 'undefined'
            ? //@ts-ignore
              SequenceType[SequenceType[x.sequenceType]]
            : 'Parallel',
      };
    })
  );
  console.log('Signed transactions', signedTxns);
  try {
    for (const fcn of transactionCallOrchestrator) {
      if (
        typeof fcn.sequenceType === 'undefined' ||
        fcn.sequenceType === SequenceType.Parallel
      ) {
        //wait for all Parallel
        await Promise.all(
          fcn.transactionsIdx.map((idx) => {
            const transactionIdx: any = Object.keys(idx)[0];
            const transactionInstructionIdx = idx[transactionIdx];
            return sendSignedTransaction({
              connection,
              signedTransaction: signedTxns[transactionIdx],
              block: block!,
              transactionInstructionIdx: transactionInstructionIdx,
            });
          })
        );
      }
      if (fcn.sequenceType === SequenceType.Sequential) {
        //wait for all Sequential
        for (const idx of fcn.transactionsIdx) {
          const transactionIdx: any = Object.keys(idx)[0];
          const transactionInstructionIdx = idx[transactionIdx];
          await sendSignedTransaction({
            connection,
            signedTransaction: signedTxns[transactionIdx],
            block,
            transactionInstructionIdx: transactionInstructionIdx,
          });
        }
      }
    }
    //we call recursively our function to forward rest of transactions if
    // number of them is higher then maxTransactionsInBath
    if (TransactionInstructions.length > maxTransactionsInBath) {
      const forwardedTransactions = TransactionInstructions.slice(
        maxTransactionsInBath,
        TransactionInstructions.length
      );
      const forwardedSigners = signersSet.slice(
        maxTransactionsInBath,
        TransactionInstructions.length
      );
      await sendTransactionsV2({
        connection,
        wallet,
        TransactionInstructions: forwardedTransactions,
        signersSet: forwardedSigners,
      });
    }
  } catch (e) {
    throw e;
  }
};

export const transactionInstructionsToTypedInstructionsSets = (
  instructionsSet: TransactionInstruction[],
  type: SequenceType
): TransactionInstructionWithType => {
  return {
    instructionsSet: instructionsSet,
    sequenceType: type,
  };
};

const DEFAULT_TIMEOUT = 60000;
/////////////////////////////////////////////////
export async function sendSignedTransaction({
  signedTransaction,
  connection,
  timeout = DEFAULT_TIMEOUT,
  block,
  transactionInstructionIdx,
}: {
  signedTransaction: Transaction;
  connection: Connection;
  sendingMessage?: string;
  sentMessage?: string;
  successMessage?: string;
  timeout?: number;
  block: Block;
  transactionInstructionIdx?: number;
  showUiComponent?: boolean;
}): Promise<{ txid: string; slot: number }> {
  const rawTransaction = signedTransaction.serialize();
  const startTime = getUnixTs();
  let slot = 0;
  const txid: TransactionSignature = await connection.sendRawTransaction(
    rawTransaction,
    {
      skipPreflight: true,
    }
  );

  console.log('Started awaiting confirmation for', txid);
  let hasTimeout = false;
  let done = false;
  (async () => {
    while (!done && getUnixTs() - startTime < timeout) {
      connection.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
      });
      await sleep(500);
    }
  })();
  try {
    const confirmation = await awaitTransactionSignatureConfirmation(
      txid,
      timeout,
      connection,
      'recent',
      true,
      block
    );
    if (confirmation?.status?.err) {
      throw new Error('Transaction failed: Custom instruction error');
    }
    slot = confirmation?.status?.slot || 0;
    hasTimeout = confirmation.timeout;
  } catch (err) {
    // Sentry.captureException(`sendSignedTransaction line 287: ${err}`, {
    //   tags: { tag: 'sendTransactionsErrors' },
    // });
    let simulateResult: SimulatedTransactionResponse | null = null;
    try {
      simulateResult = (
        await simulateTransaction(connection, signedTransaction, 'single')
      ).value;
    } catch (e) {
      //
    }
    if (simulateResult && simulateResult.err) {
      if (simulateResult.logs) {
        for (let i = simulateResult.logs.length - 1; i >= 0; --i) {
          const line = simulateResult.logs[i];
          if (line.startsWith('Program log: ')) {
            //Sentry.captureException(`sendSignedTransaction line 303: ${line}`);
            throw {
              txInstructionIdx: transactionInstructionIdx,
              error:
                'Transaction failed: ' + line.slice('Program log: '.length),
              txid: txid,
            };
          }
        }
      }
      //   Sentry.captureException(
      //     `sendSignedTransaction line 314: ${simulateResult.err}`,
      //     { tags: { tag: 'sendTransactionsErrors' } }
      //   );
      throw {
        txInstructionIdx: transactionInstructionIdx,
        error: JSON.stringify(simulateResult.err),
        txid: txid,
      };
    }
    // throw new Error('Transaction failed');
  } finally {
    done = true;
  }
  if (hasTimeout) {
    throw {
      txInstructionIdx: transactionInstructionIdx,
      error: 'Timed out awaiting confirmation on transaction',
      txid: txid,
    };
  }

  console.log('Latency', txid, getUnixTs() - startTime);
  return { txid, slot };
}

/////////////////////////
export const getUnixTs = () => {
  return new Date().getTime() / 1000;
};

///////////////////////////////
const sleep = (ttl: number) =>
  new Promise((resolve) => setTimeout(() => resolve(true), ttl));

//////////////////////////////
async function awaitTransactionSignatureConfirmation(
  txid: TransactionSignature,
  //after that time we will start to check blockHeight
  startTimeoutCheckThreshold: number,
  connection: Connection,
  commitment: Commitment = 'recent',
  queryStatus = false,
  startingBlock: Block
) {
  //If the validator can’t find a slot number for the blockhash
  //or if the looked up slot number is more than 151 slots lower
  // than the slot number of the block being processed, the transaction will be rejected.
  const timeoutBlockPeriod = 152;
  const timeoutBlockHeight =
    startingBlock.lastValidBlockHeight + timeoutBlockPeriod;
  console.log('Start block height', startingBlock?.lastValidBlockHeight);
  console.log('Possible timeout block', timeoutBlockHeight);
  let done = false;
  let startTimeoutCheck = false;
  let timeout = false;
  let status: SignatureStatus | null = {
    slot: 0,
    confirmations: 0,
    err: null,
  };
  let subId = 0;
  await new Promise((resolve, reject) => {
    const fn = async () => {
      setTimeout(() => {
        if (done) {
          return;
        }
        console.log('Starting timeout check');
        console.log(
          'Timeout check was set to start after',
          startTimeoutCheckThreshold
        );
        startTimeoutCheck = true;
      }, startTimeoutCheckThreshold);
      try {
        subId = connection.onSignature(
          txid,
          (result, context) => {
            done = true;
            status = {
              err: result.err,
              slot: context.slot,
              confirmations: 0,
            };
            if (result.err) {
              console.log('Rejected via websocket', result.err);
              //   Sentry.captureException(
              //     `awaitTransactionSignatureConfirmation line 107: ${result.err}`,
              //     { tags: { tag: 'sendTransactionsErrors' } }
              //   );
              reject(result.err);
            } else {
              console.log('Resolved via websocket', result);
              resolve(result);
            }
          },
          commitment
        );
      } catch (e) {
        done = true;
        console.error('WS error in setup', txid, e);
      }
      while (!done && queryStatus) {
        // eslint-disable-next-line no-loop-func
        const fn = async () => {
          try {
            const promises: [
              Promise<RpcResponseAndContext<(SignatureStatus | null)[]>>,
              Promise<number>?
            ] = [connection.getSignatureStatuses([txid])];
            //if startTimeoutThreshold passed we start to check if
            //current blocks are did not passed timeoutBlockHeight threshold
            if (startTimeoutCheck) {
              promises.push(connection.getBlockHeight('confirmed'));
            }

            const [signatureStatuses, blockHeight] = await Promise.all(
              promises
            );
            if (
              typeof blockHeight !== undefined &&
              timeoutBlockHeight <= blockHeight!
            ) {
              done = true;
              timeout = true;
              console.log('Tx Timeout ----');
              reject({ timeout: true });
            }

            if (blockHeight) {
              console.log('Timeout threshold blockheight', timeoutBlockHeight);
              console.log('Current blockheight', blockHeight);
            }
            status = signatureStatuses && signatureStatuses.value[0];
            if (!done) {
              if (!status) {
                console.log('REST null result for', txid, status);
              } else if (status.err) {
                console.log('REST error for', txid, status);
                done = true;
                // Sentry.captureException(
                //   `awaitTransactionSignatureConfirmation line 158: ${status.err}`,
                //   { tags: { tag: 'sendTransactionsErrors' } }
                // );
                reject(status.err);
              } else if (!status.confirmations) {
                console.log('REST no confirmations for', txid, status);
              } else {
                console.log('REST confirmation for', txid, status);
                done = true;
                resolve(status);
              }
            }
          } catch (e) {
            if (!done) {
              //   Sentry.captureException(
              //     `awaitTransactionSignatureConfirmation line 173: ${e}`,
              //     { tags: { tag: 'sendTransactionsErrors' } }
              //   );
              console.log('REST connection error: txid', txid, e);
            }
          }
        };
        fn();
        await sleep(2000);
      }
    };
    fn();
  })
    .catch(() => {
      //@ts-ignore
      if (connection._signatureSubscriptions[subId])
        connection.removeSignatureListener(subId);
    })
    .then((_) => {
      //@ts-ignore
      if (connection._signatureSubscriptions[subId])
        connection.removeSignatureListener(subId);
    });
  done = true;
  return { status, timeout };
}

//////////////////////////////////////////////
export async function simulateTransaction(
  connection: Connection,
  transaction: Transaction,
  commitment: Commitment
): Promise<RpcResponseAndContext<SimulatedTransactionResponse>> {
  // @ts-ignore
  transaction.recentBlockhash = await connection._recentBlockhash(
    // @ts-ignore
    connection._disableBlockhashCaching
  );

  const signData = transaction.serializeMessage();
  // @ts-ignore
  const wireTransaction = transaction._serialize(signData);
  const encodedTransaction = wireTransaction.toString('base64');
  const config: any = { encoding: 'base64', commitment };
  const args = [encodedTransaction, config];

  // @ts-ignore
  const res = await connection._rpcRequest('simulateTransaction', args);
  if (res.error) {
    throw new Error('failed to simulate transaction: ' + res.error.message);
  }
  return res.result;
}
