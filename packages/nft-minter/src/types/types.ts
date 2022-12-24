import { Program } from '@project-serum/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import { PdaKeys } from '../pda';
import { NftMinter } from './nft_minter';

export interface ClaimArgs {
  signature: Uint8Array;
  message: Uint8Array;
}

export interface IntializeNftMinterArgs {
  program: Program<NftMinter>;
  authorityAddress: PublicKey;
}

export interface CreateMintArgs {
  program: Program<NftMinter>;
  claimantAddress: PublicKey;
  pdaKeys: PdaKeys;
  uri: String;
}

interface ApiInputArgs {
  connection: Connection;
  wallet: any;
}

export interface InitializeNftMinterApiArgs extends ApiInputArgs {
  uri: string;
}

export interface InitializeNftSafeApiArgs extends ApiInputArgs {}

export interface MintRegularNftApiArgs extends ApiInputArgs {
  mintName: string;
  mintSymbol: string;
  isMasterEdition: boolean;
  isParentNft: boolean;
  mintUri: string;
  receiverAddress: PublicKey;
  creators: Array<NftCreator> | null;
  sellerBasisPoints: number | null;
  isMutable: boolean | null;
}

export interface Creator {
  address: PublicKey;
  verified: boolean;
  share: number;
}

export interface NftCreator {
  address: PublicKey;
  share: number;
}

export interface MintRegularNftArgs {
  mintMetadataBump: number;
  mintMasterEditionBump: number;
  mintName: string;
  mintSymbol: string;
  isMasterEdition: boolean;
  isParentNft: boolean;
  mintUri: string;
  creators: Array<Creator> | null;
  sellerBasisPoints: number;
  isMutable: boolean | null;
}

export interface MintCollectionNftApiArgs extends ApiInputArgs {
  mintName: string;
  mintSymbol: string;
  mintUri: string;
  isPrimarySaleHappened: boolean | null;
  sellerBasisPoints: number | null;
  isMutable: boolean | null;
  creators: Array<NftCreator> | null;
  isMasterEdition: boolean;
  isParentNft: boolean;
  nftCollectionAdmin: PublicKey;
  nftCollectionMintAddress: PublicKey;
  receiverAddress: PublicKey;
  signature?: Uint8Array | null;
  message?: Uint8Array | null;
}

export interface MintCollectionNftArgs {
  mintMetadataBump: number;
  mintMasterEditionBump: number;
  mintName: string;
  mintSymbol: string;
  isMasterEdition: boolean;
  isParentNft: boolean;
  mintUri: string;
  isPrimarySaleHappened: boolean | null;
  sellerBasisPoints: number;
  isMutable: boolean | null;
  creators: Array<Creator> | null;
  nftCollectionMetadataBump: number;
  nftCollectionMasterEditionBump: number;
  signature?: Uint8Array | null;
  message?: Uint8Array | null;
}

export interface UpdateRegularNftArgs {
  mintMetadataBump: number;
  mintMasterEditionBump: number;
  mintBump: number;
  mintName: string;
  mintSymbol: string;
  mintUri: string;
  creators: Array<Creator> | null;
  sellerBasisPoints: number;
  isMutable: boolean | null;
  isPrimarySaleHappened: boolean | null;
}

export interface UpdateRegularNftApiArgs extends ApiInputArgs {
  mintName: string;
  mintSymbol: string;
  mintUri: string;
  creators: Array<NftCreator> | null;
  sellerBasisPoints: number;
  isMutable: boolean | null;
  isPrimarySaleHappened: boolean | null;
  mintAddress: PublicKey;
}

export interface UpdateMintCollectionNftArgs {
  mintMetadataBump: number;
  mintMasterEditionBump: number;
  mintName: string;
  mintSymbol: string;
  mintUri: string;
  oldNftCollectionMetadataBump: number;
  oldNftCollectionMasterEditionBump: number;
  newNftCollectionMetadataBump: number;
  newNftCollectionMasterEditionBump: number;
  creators: Array<Creator> | null;
  sellerBasisPoints: number;
  isMutable: boolean | null;
  isPrimarySaleHappened: boolean | null;
}

export interface UpdateCollectionNftApiArgs extends ApiInputArgs {
  mintName: string;
  mintSymbol: string;
  mintUri: string;
  isPrimarySaleHappened: boolean | null;
  sellerBasisPoints: number;
  isMutable: boolean | null;
  creators: Array<NftCreator> | null;
  parentNftAdminAddress: PublicKey;
  oldParentNftMintAddress: PublicKey;
  newParentNftMintAddress: PublicKey;
  collectionMintAddress: PublicKey;
}

export interface OldNftCollectionMintDetails {
  oldNftCollectionMint: PublicKey;
  oldNftCollectionMasterEdition: PublicKey;
  oldNftCollectionMetadata: PublicKey;
  oldNftCollectionMetadataBump: number;
  oldNftCollectionMasterEditionBump: number;
}

export interface NewNftCollectionMintDetails {
  newNftCollectionMint: PublicKey;
  newNftCollectionMasterEdition: PublicKey;
  newNftCollectionMetadata: PublicKey;
  newNftCollectionMetadataBump: number;
  newNftCollectionMasterEditionBump: number;
}
