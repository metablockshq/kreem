import { Program } from '@project-serum/anchor';
import { Connection, PublicKey, Signer, Transaction } from '@solana/web3.js';
import { MetaBlocks } from './meta_blocks';
import * as borsh from '@project-serum/borsh';
import { PdaKeys } from '../pda';

export interface UniverseApiArgs {
  connection: Connection;
  wallet: any;
  name: string;
  description: string;
  websiteUrl: string;
}

interface ApiInputArgs {
  connection: Connection;
  wallet: any;
  mintKey: PublicKey;
  universeKey: PublicKey;
}
export interface InitReceiptMintApiArgs extends ApiInputArgs {}

export interface InitDepositNftApiArgs extends ApiInputArgs {}

export interface DepositNftApiArgs extends ApiInputArgs {}

export interface TransferReceiptNftApiArgs extends ApiInputArgs {
  url: string;
  isReceiptMasterEdition: boolean;
}

export interface GroupedDepositNftApiArgs extends ApiInputArgs {
  receiptUrl: string;
  receiptName: string;
  isReceiptMasterEdition: boolean;
  metaNftUrl: string;
  metaNftName: string;
  isMetaNftMasterEdition: boolean;
}

export interface WithdrawNftApiArgs extends ApiInputArgs {}

export interface WithdrawNftWithReceiptApiArgs {
  receiptMint: PublicKey;
  connection: Connection;
  wallet: any;
  universeKey: PublicKey;
}

export interface WrappedUserNftArgs {
  connection: Connection;
  receiptMint: PublicKey;
  wallet: any;
  authority: PublicKey;
}

// instructions.ts file

export interface UniverseArgs {
  usersKey: PublicKey;
  name: string;
  description: string;
  websiteUrl: string;
  program: Program<MetaBlocks>;
}

export type SendTxRequest = {
  tx: Transaction;
  signers: Signer[];
};

// Account API interfaces
export interface Universe {
  publicKey: string;
  authority: string;
  name: string;
  websiteUrl: string;
  description: string;
  lastUpdateTs: number;
  totalNfts: number;
  slot: number | undefined | null;
  signature: string | undefined | null;
  blockTime: number | undefined | null;
}

export interface BlockMetadata {
  slot: number | undefined | null;
  signature: string | undefined | null;
  blockTime: number | undefined | null;
}

export interface UserNft {
  publicKey: string;
  userNftBump: number;
  vaultBump: number;
  associatedVaultBump: number;
  nftAuthority: string;
  universe: string;
  vaultAuthority: string;
  receiptMintBump: number;
  userReceiptAtaBump: number;
  receiptMint: string;
  userReceiptAta: string;
  vaultReceiptAta: string;
  tokenMint: string;
  receiptMasterEdition: string;
  isReceiptMasterEdition: boolean;
  isUserNftVerified: boolean;
  isUserNftMetaplex: boolean;
  index: number;
  slot: number | undefined | null;
  signature: string | undefined | null;
  blockTime: number | undefined | null;
}

export interface FetchAccountArgs {
  connection: Connection;
  wallet: any;
}

export const USER_NFT_ACCOUNT_DATA_LAYOUT_V1 = borsh.struct([
  borsh.u8('userNftBump'),
  borsh.u64('index'),
  borsh.u8('vaultBump'),
  borsh.u8('associatedVaultBump'),
  borsh.publicKey('nftAuthority'),
  borsh.publicKey('universe'),
  borsh.publicKey('vaultAuthority'),
]);

export const USER_NFT_ACCOUNT_DATA_LAYOUT_V2 = borsh.struct([
  borsh.u8('userNftBump'),
  borsh.u64('index'),
  borsh.u8('vaultBump'),
  borsh.u8('associatedVaultBump'),
  borsh.publicKey('nftAuthority'),
  borsh.publicKey('universe'),
  borsh.publicKey('vaultAuthority'),
  borsh.u8('receiptMintBump'),
  borsh.u8('userReceiptAtaBump'),
  borsh.publicKey('receiptMint'),
  borsh.publicKey('userReceiptAta'),
  borsh.publicKey('vaultReceiptAta'),
  borsh.publicKey('tokenMint'),
  borsh.publicKey('receiptMasterEdition'),
  borsh.u8('isReceiptMasterEdition'),
  borsh.u8('isUserNftVerified'),
  borsh.u8('isUserNftMetaplex'),
]);

export interface UserNftAccount {
  publicKey: PublicKey;
  account: UserNft;
}

export interface UserNftFilterArgs {
  universes: Array<string>;
  vaultAuthorities: Array<string>;
  authorities: Array<string>;
}

export interface Metadata {
  info: Info;
  pubkey: string;
}

export interface Info {
  data: Uint8Array;
  executable: boolean;
  lamports: number;
  owner: PublicKey;
  rentEpoch: number;
}
export interface MetadataData {
  data: MetadataDataData;
  editionNonce: number;
  isMutable: boolean;
  key: number;
  mint: string;
  primarySaleHappened: boolean;
  tokenStandard: string;
  updateAuthority: string;
  uses?: string;
}

export interface MetadataDataData {
  creators: Array<Creator>;
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: string;
}

export interface Creator {
  share: number;
  verified: boolean;
  address: string;
}

export interface WrappedUserNft {
  publicKey: string;
  userNftBump: number;
  nftAuthority: PublicKey;
  universe: PublicKey;
  vaultAuthority: PublicKey;
  userReceiptAtaBump: number;
  receiptMint: PublicKey;
  userReceiptAta: PublicKey;
  vaultReceiptAta: PublicKey;
  tokenMint: PublicKey;
  receiptMasterEdition: PublicKey;
  isReceiptMasterEdition: boolean | null;
  isUserNftVerified: boolean;
  isUserNftMetaplex: boolean;
  slot: number | undefined | null;
  signature: string | undefined | null;
  blockTime: number | undefined | null;
}

interface BasicInstructionArgs {
  pdaKeys: PdaKeys;
  usersKey: PublicKey;
  program: Program<MetaBlocks>;
}

export interface TransferReceiptNftArgs extends BasicInstructionArgs {}

export interface UpdateReceiptMetadataArgs extends BasicInstructionArgs {
  uri: string;
  name: string;
  isReceiptMasterEdition: boolean;
}
export interface DepositArgs extends BasicInstructionArgs {}

export interface InitDepositNftArgs extends BasicInstructionArgs {}

export interface InitReceiptMintArgs extends BasicInstructionArgs {}

export interface CreateMetaNftArgs extends BasicInstructionArgs {
  uri: string;
  name: string;
}

export interface InitMetaNftArgs extends BasicInstructionArgs {}

export interface InitMetaBlocksAuthorityArgs extends BasicInstructionArgs {}

export interface WithdrawNftArgs extends BasicInstructionArgs {}
