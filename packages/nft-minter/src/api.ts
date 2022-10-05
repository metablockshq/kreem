import { Transaction } from '@solana/web3.js';
import { getNftMinterProgram } from './factory';
import { getInitNftSafeInstruction } from './instructions/init-nft-safe';
import { getInitializeNftMinterInstruction } from './instructions/initialize-nft-minter';
import {
  getMintCollectionNftInstruction,
  getMintRegularNftInstruction,
} from './instructions/mint-safe-nfts';
import {
  getEdInstruction,
  getMintSignedCollectionNftInstruction,
  getMintSignedNftInstruction,
} from './instructions/mint-signed-nfts';

import {
  findNftSafeAddress,
  getPdaKeys,
  getSafePdaKeys,
  PdaKeys,
  SafePdaKeys,
} from './pda';
import {
  InitializeNftMinterApiArgs,
  InitializeNftSafeApiArgs,
  IntializeNftMinterArgs,
  MintCollectionNftApiArgs,
  MintRegularNftApiArgs,
  MintSignedCollectionNftApiArgs,
  MintSignedCollectionNftArgs,
  MintSignedNftApiArgs,
  MintSignedNftArgs,
} from './types/types';

const initializeNftMinter = async (args: InitializeNftMinterApiArgs) => {
  try {
    const program = getNftMinterProgram(args.connection, args.wallet);
    const usersKey = args.wallet.publicKey;

    const argument: IntializeNftMinterArgs = {
      authorityAddress: usersKey,
      program: program,
    };

    const instruction = await getInitializeNftMinterInstruction(argument);
    const transaction = new Transaction();
    transaction.add(instruction);
    const tx = await program.provider.sendAndConfirm!(transaction, []);

    return tx;
  } catch (e) {
    throw e;
  }
};

const mintSignedNft = async (args: MintSignedNftApiArgs) => {
  try {
    const program = getNftMinterProgram(args.connection, args.wallet);
    const usersKey = args.wallet.publicKey;
    const pdaKeys: PdaKeys = await getPdaKeys(usersKey);

    const argument: MintSignedNftArgs = {
      signature: args.signature,
      message: args.message,
      mintName: args.mintName,
      mintUri: args.mintUri,
      mintSymbol: args.mintSymbol,
      isMasterEdition: args.isMasterEdition,
      isParentForNfts: args.isParentForNfts,
      pdaKeys: pdaKeys,
      program: program,
      claimantAddress: usersKey,
    };

    const instruction = await getMintSignedNftInstruction(argument);
    const edInstruction = getEdInstruction({
      message: args.message,
      authorityAddress: args.authorityAddress,
      signature: args.signature,
    });

    const tranasction = new Transaction();
    tranasction.add(edInstruction);
    tranasction.add(instruction);
    const tx = await program.provider.sendAndConfirm!(tranasction, []);

    return tx;
  } catch (e) {
    throw e;
  }
};

const mintSignedCollectionNft = async (
  args: MintSignedCollectionNftApiArgs
) => {
  try {
    const program = getNftMinterProgram(args.connection, args.wallet);
    const usersKey = args.wallet.publicKey;

    const pdaKeys: PdaKeys = await getPdaKeys(usersKey);

    const argument: MintSignedCollectionNftArgs = {
      signature: args.signature,
      message: args.message,
      mintName: args.mintName,
      mintUri: args.mintUri,
      mintSymbol: args.mintSymbol,
      isMasterEdition: args.isMasterEdition,
      isParentForNfts: args.isParentForNfts,
      pdaKeys: pdaKeys,
      program: program,
      claimantAddress: usersKey,
      nftCollectionMintAddress: args.collectionMintAddress,
    };

    const instruction = await getMintSignedCollectionNftInstruction(argument);

    const edInstruction = getEdInstruction({
      message: args.message,
      authorityAddress: args.authorityAddress,
      signature: args.signature,
    });

    const transaction = new Transaction();
    transaction.add(edInstruction);
    transaction.add(instruction);
    const tx = await program.provider.sendAndConfirm!(transaction, []);

    return tx;
  } catch (e) {
    throw e;
  }
};

// This has to be initialized for the user if not existing for minting NFTs
const initializeNftSafe = async (args: InitializeNftSafeApiArgs) => {
  try {
    const program = getNftMinterProgram(args.connection, args.wallet);
    const usersKey = args.wallet.publicKey;

    const argument = {
      payerAddress: usersKey,
      program: program,
    };

    const instruction = await getInitNftSafeInstruction(argument);
    const transaction = new Transaction();
    transaction.add(instruction);
    const tx = await program.provider.sendAndConfirm!(transaction, []);

    return tx;
  } catch (e) {
    throw e;
  }
};

const mintRegularNft = async (args: MintRegularNftApiArgs) => {
  try {
    const program = getNftMinterProgram(args.connection, args.wallet);
    const usersKey = args.wallet.publicKey;

    const [nftSafeAddress, _] = await findNftSafeAddress(usersKey);

    let nftSafeData = await program.account.nftSafe.fetch(nftSafeAddress);

    if (nftSafeData == null) {
      await initializeNftSafe({
        wallet: args.wallet,
        connection: args.connection,
      });

      nftSafeData = await program.account.nftSafe.fetch(nftSafeAddress);
    }

    const pdaKeys: SafePdaKeys = await getSafePdaKeys(
      args.receiverAddress,
      usersKey,
      nftSafeData.nftCount
    );

    const argument = {
      pdaKeys: pdaKeys,
      program: program,
      receiverAddress: args.receiverAddress,
      payerAddress: usersKey,
      isParentNft: args.isParentNft,
      isMasterEdition: args.isMasterEdition,
      mintUri: args.mintUri,
      mintSymbol: args.mintSymbol,
      mintName: args.mintName,
    };

    const mintRegularNftInstruction = await getMintRegularNftInstruction(
      argument
    );
    const transaction = new Transaction();
    transaction.add(mintRegularNftInstruction);
    const tx = await program.provider.sendAndConfirm!(transaction, []);

    return tx;
  } catch (e) {
    throw e;
  }
};

const mintCollectionNft = async (args: MintCollectionNftApiArgs) => {
  try {
    const program = getNftMinterProgram(args.connection, args.wallet);
    const usersKey = args.wallet.publicKey;

    const [nftSafeAddress, _] = await findNftSafeAddress(
      args.nftCollectionAdmin
    );

    const nftSafeData = await program.account.nftSafe.fetch(nftSafeAddress);

    if (nftSafeData == null) {
      throw Error('There is no Regular NFT');
    }

    const adminPdaKeys: SafePdaKeys = await getSafePdaKeys(
      args.nftCollectionAdmin,
      args.nftCollectionAdmin,
      nftSafeData.nftCount
    );

    const pdaKeys: SafePdaKeys = await getSafePdaKeys(
      usersKey,
      usersKey,
      nftSafeData.nftCount,
      args.nftCollectionAdmin
    );

    const mintCollectionNftInstruction = await getMintCollectionNftInstruction({
      pdaKeys: pdaKeys,
      program: program,
      receiverAddress: usersKey,
      payerAddress: usersKey,
      isParentNft: args.isParentNft,
      isMasterEdition: args.isMasterEdition,
      mintUri: args.mintUri,
      mintSymbol: args.mintSymbol,
      mintName: args.mintName,
      nftCollectionMint: adminPdaKeys.mintAddress,
      nftCollectionMasterEdition: adminPdaKeys.mintMasterEditionAddress,
      nftCollectionMetadata: adminPdaKeys.mintMetadataAddress,
      nftCollectionMetadataBump: adminPdaKeys.mintMetadataBump,
      nftCollectionMasterEditionBump: adminPdaKeys.mintMasterEditionBump,
      nftCollectionAdmin: args.nftCollectionAdmin,
      message: args.message != null ? args.message! : null,
      signature: args.signature != null ? args.signature! : null,
    });

    const transaction = new Transaction();
    transaction.add(mintCollectionNftInstruction);
    const tx = await program.provider.sendAndConfirm!(transaction, []);

    return tx;
  } catch (e) {
    throw e;
  }
};

export {
  initializeNftMinter,
  mintSignedNft,
  mintSignedCollectionNft,
  initializeNftSafe,
  mintRegularNft,
  mintCollectionNft,
};
