import { Program } from '@project-serum/anchor';
import {
  Ed25519Program,
  PublicKey,
  SystemProgram,
  SYSVAR_INSTRUCTIONS_PUBKEY,
  SYSVAR_RENT_PUBKEY,
} from '@solana/web3.js';
import { programIds } from '../factory';
import {
  findAssociatedTokenAddress,
  getTokenMetadataKeys,
  SafePdaKeys,
} from '../pda';
import {
  Creator,
  MintCollectionNftArgs,
  MintRegularNftArgs,
  NewNftCollectionMintDetails,
  OldNftCollectionMintDetails,
  UpdateMintCollectionNftArgs,
  UpdateRegularNftArgs,
} from '../types/types';

// mint regular nft instruction
async function getMintRegularNftInstruction(args: {
  pdaKeys: SafePdaKeys;
  program: Program;
  receiverAddress: PublicKey;
  payerAddress: PublicKey;
  isParentNft: boolean;
  isMasterEdition: boolean;
  mintUri: string;
  mintSymbol: string;
  mintName: string;
  creators: Array<Creator> | null;
  sellerBasisPoints: number;
  isMutable: boolean | null;
}) {
  const argument: MintRegularNftArgs = {
    mintMetadataBump: args.pdaKeys.mintMetadataBump,
    mintMasterEditionBump: args.pdaKeys.mintMasterEditionBump,
    mintName: args.mintName,
    mintSymbol: args.mintSymbol,
    isMasterEdition: args.isMasterEdition,
    isParentNft: args.isParentNft,
    mintUri: args.mintUri,
    creators: args.creators,
    sellerBasisPoints: args.sellerBasisPoints,
    isMutable: args.isMutable,
  };

  const [receiverMintAta, _] = await findAssociatedTokenAddress(
    args.receiverAddress,
    args.pdaKeys.mintAddress
  );

  const mintRegularNftInstruction = await args.program.methods
    .mintRegularNft(argument)
    .accounts({
      receiver: args.receiverAddress,
      payer: args.payerAddress,
      nftSafe: args.pdaKeys.nftSafeAddress,
      mint: args.pdaKeys.mintAddress,
      payerMintAta: args.pdaKeys.payerMintAta,
      receiverMintAta: receiverMintAta,
      mintMetadata: args.pdaKeys.mintMetadataAddress,
      mintMasterEdition: args.pdaKeys.mintMasterEditionAddress,
      tokenMetadataProgram: programIds.TOKEN_METADATA_PROGRAM_ID,
      tokenProgram: programIds.TOKEN_PROGRAM_ID,
      associatedTokenProgram: programIds.ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY,
    })
    .instruction();
  return mintRegularNftInstruction;
}

// mint collection nft instruction
async function getMintCollectionNftInstruction(args: {
  pdaKeys: SafePdaKeys;
  program: Program;
  receiverAddress: PublicKey;
  payerAddress: PublicKey;
  isParentNft: boolean;
  isMasterEdition: boolean;
  mintUri: string;
  mintSymbol: string;
  mintName: string;
  isPrimarySaleHappened: boolean | null;
  sellerBasisPoints: number;
  isMutable: boolean | null;
  creators: Array<Creator> | null;
  nftCollectionMint: PublicKey;
  nftCollectionMasterEdition: PublicKey;
  nftCollectionMetadata: PublicKey;
  nftCollectionMetadataBump: number;
  nftCollectionMasterEditionBump: number;
  nftCollectionAdmin: PublicKey;
  message: Uint8Array | null;
  signature: Uint8Array | null;
}) {
  const argument: MintCollectionNftArgs = {
    mintMetadataBump: args.pdaKeys.mintMetadataBump,
    mintMasterEditionBump: args.pdaKeys.mintMasterEditionBump,
    isMasterEdition: args.isMasterEdition,
    isParentNft: args.isParentNft,
    mintName: args.mintName,
    mintSymbol: args.mintSymbol,
    mintUri: args.mintUri,
    isPrimarySaleHappened: args.isPrimarySaleHappened,
    sellerBasisPoints: args.sellerBasisPoints,
    isMutable: args.isMutable,
    creators: args.creators,
    nftCollectionMasterEditionBump: args.nftCollectionMasterEditionBump,
    nftCollectionMetadataBump: args.nftCollectionMetadataBump,
    message: args.payerAddress == args.receiverAddress ? null : args.message,
    signature:
      args.payerAddress == args.receiverAddress ? null : args.signature,
  };

  const [receiverMintAta, _] = await findAssociatedTokenAddress(
    args.receiverAddress,
    args.pdaKeys.mintAddress
  );

  let payerMintAta = args.pdaKeys.payerMintAta;
  if (args.payerAddress.toString() === args.receiverAddress.toString()) {
    payerMintAta = receiverMintAta;
  }

  const mintCollectionNftInstruction = await args.program.methods
    .mintCollectionNft(argument)
    .accounts({
      nftCollectionAdmin: args.nftCollectionAdmin,
      nftCollectionMasterEdition: args.nftCollectionMasterEdition,
      nftCollectionMetadata: args.nftCollectionMetadata,
      nftCollectionMint: args.nftCollectionMint,
      nftCollectionAdminSafe: args.pdaKeys.nftSafeAddress,
      receiver: args.receiverAddress,
      payer: args.payerAddress,
      mint: args.pdaKeys.mintAddress,
      receiverMintAta: receiverMintAta,
      payerMintAta: payerMintAta,
      mintMetadata: args.pdaKeys.mintMetadataAddress,
      mintMasterEdition: args.pdaKeys.mintMasterEditionAddress,
      tokenMetadataProgram: programIds.TOKEN_METADATA_PROGRAM_ID,
      tokenProgram: programIds.TOKEN_PROGRAM_ID,
      associatedTokenProgram: programIds.ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY,
      instructions: SYSVAR_INSTRUCTIONS_PUBKEY,
    })
    .instruction();
  return mintCollectionNftInstruction;
}

const getEdInstruction = (args: {
  message: Uint8Array;
  authorityAddress: PublicKey;
  signature: Uint8Array;
}) => {
  const edInstruction = Ed25519Program.createInstructionWithPublicKey({
    message: args.message,
    publicKey: args.authorityAddress.toBytes(),
    signature: args.signature,
    instructionIndex: 0,
  });
  return edInstruction;
};

//update regular nft
async function getUpdateRegularNftInstruction(args: {
  pdaKeys: SafePdaKeys;
  program: Program;
  payerAddress: PublicKey;
  mintName: string;
  mintSymbol: string;
  mintUri: string;
  creators: Array<Creator> | null;
  sellerBasisPoints: number;
  isMutable: boolean | null;
  isPrimarySaleHappened: boolean | null;
}) {
  const argument: UpdateRegularNftArgs = {
    mintMetadataBump: args.pdaKeys.mintMetadataBump,
    mintMasterEditionBump: args.pdaKeys.mintMasterEditionBump,
    mintBump: args.pdaKeys.mintBump,
    mintName: args.mintName,
    mintSymbol: args.mintSymbol,
    mintUri: args.mintUri,
    creators: args.creators,
    sellerBasisPoints: args.sellerBasisPoints,
    isMutable: args.isMutable,
    isPrimarySaleHappened: args.isPrimarySaleHappened,
  };

  const updateRegularNftInstruction = await args.program.methods
    .updateRegularNft(argument)
    .accounts({
      payer: args.payerAddress,
      nftSafe: args.pdaKeys.nftSafeAddress,
      mint: args.pdaKeys.mintAddress,
      mintMetadata: args.pdaKeys.mintMetadataAddress,
      mintMasterEdition: args.pdaKeys.mintMasterEditionAddress,
      tokenMetadataProgram: programIds.TOKEN_METADATA_PROGRAM_ID,
      tokenProgram: programIds.TOKEN_PROGRAM_ID,
      associatedTokenProgram: programIds.ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY,
    })
    .instruction();
  return updateRegularNftInstruction;
}

// update collection nft instruction
async function getUpdateCollectionNftInstruction(args: {
  program: Program;
  mintAddress: PublicKey;
  nftCollectionAdminSafe: PublicKey;
  payerAddress: PublicKey;
  oldCollectionNftDetails: OldNftCollectionMintDetails;
  newCollectionNftDetails: NewNftCollectionMintDetails;
  nftCollectionAdmin: PublicKey;
  creators: Array<Creator> | null;
  sellerBasisPoints: number;
  isMutable: boolean | null;
  mintName: string;
  mintSymbol: string;
  mintUri: string;
  isPrimarySaleHappened: boolean | null;
}) {
  const metadataDetails = await getTokenMetadataKeys(args.mintAddress);

  const argument: UpdateMintCollectionNftArgs = {
    mintMetadataBump: metadataDetails.metadataBump,
    mintMasterEditionBump: metadataDetails.masterEditionBump,
    mintName: args.mintName,
    mintSymbol: args.mintSymbol,
    mintUri: args.mintUri,
    isPrimarySaleHappened: args.isPrimarySaleHappened,
    sellerBasisPoints: args.sellerBasisPoints,
    isMutable: args.isMutable,
    creators: args.creators,
    oldNftCollectionMetadataBump:
      args.oldCollectionNftDetails.oldNftCollectionMetadataBump,
    oldNftCollectionMasterEditionBump:
      args.oldCollectionNftDetails.oldNftCollectionMasterEditionBump,
    newNftCollectionMetadataBump:
      args.newCollectionNftDetails.newNftCollectionMetadataBump,
    newNftCollectionMasterEditionBump:
      args.newCollectionNftDetails.newNftCollectionMasterEditionBump,
  };

  const updateCollectionNftInstruction = await args.program.methods
    .updateCollectionNft(argument)
    .accounts({
      payer: args.payerAddress,
      mint: args.mintAddress,
      mintMetadata: metadataDetails.metadataAddress,
      mintMasterEdition: metadataDetails.masterEditionAddress,
      tokenMetadataProgram: programIds.TOKEN_METADATA_PROGRAM_ID,
      nftCollectionAdminSafe: args.nftCollectionAdminSafe,
      nftCollectionAdmin: args.nftCollectionAdmin,
      oldNftCollectionMint: args.oldCollectionNftDetails.oldNftCollectionMint,
      oldNftCollectionMetadata:
        args.oldCollectionNftDetails.oldNftCollectionMetadata,
      oldNftCollectionMasterEdition:
        args.oldCollectionNftDetails.oldNftCollectionMasterEdition,
      newNftCollectionMint: args.newCollectionNftDetails.newNftCollectionMint,
      newNftCollectionMetadata:
        args.newCollectionNftDetails.newNftCollectionMetadata,
      newNftCollectionMasterEdition:
        args.newCollectionNftDetails.newNftCollectionMasterEdition,
      tokenProgram: programIds.TOKEN_PROGRAM_ID,
      associatedTokenProgram: programIds.ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY,
    })
    .instruction();
  return updateCollectionNftInstruction;
}

export {
  getEdInstruction,
  getMintRegularNftInstruction,
  getMintCollectionNftInstruction,
  getUpdateRegularNftInstruction,
  getUpdateCollectionNftInstruction,
};
