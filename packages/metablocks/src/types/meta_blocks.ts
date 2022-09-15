export type MetaBlocks = {
  "version": "1.0.1",
  "name": "meta_blocks",
  "instructions": [
    {
      "name": "createUniverseV1",
      "accounts": [
        {
          "name": "universe",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "CreateUniverseArgs"
          }
        }
      ]
    },
    {
      "name": "updateUniverseV1",
      "accounts": [
        {
          "name": "universe",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "UpdateUniverseArgs"
          }
        }
      ]
    },
    {
      "name": "initReceiptMintV1",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "receiptMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "universe",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metaTreasuryProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "treasuryAuthority",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "InitReceiptMintArgs"
          }
        }
      ]
    },
    {
      "name": "depositNftV1",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "wrappedUserNft",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiptMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vaultReceiptAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userReceiptAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "universe",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metaNftProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metaNft",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metaTreasuryProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "treasuryAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metaBlocksAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userNftMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "receiptMasterEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "receiptMetadata",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "DepositNftArgs"
          }
        }
      ]
    },
    {
      "name": "withdrawNftV1",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "wrappedUserNft",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "universe",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userReceiptAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultReceiptAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiptMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metaBlocksAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metaNftProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metaNft",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metaNftMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userMetaNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metaTreasuryProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "treasuryAuthority",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "WithdrawNftArgs"
          }
        }
      ]
    },
    {
      "name": "initMetaBlocksAuthorityV1",
      "accounts": [
        {
          "name": "metaBlocksAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "universe",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "InitMetaBlocksAuthorityArgs"
          }
        }
      ]
    },
    {
      "name": "initCpiMetaNftV1",
      "accounts": [
        {
          "name": "metaBlocksAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metaNft",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metaNftMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metaNftProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "universe",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metaTreasuryProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "treasuryAuthority",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "InitMetaNftCpiArgs"
          }
        }
      ]
    },
    {
      "name": "createCpiMetaNftV1",
      "accounts": [
        {
          "name": "metaBlocksAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metaNft",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metaNftMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userMetaNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metaNftProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metaNftMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metaNftMasterEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "CreateMetaNftCpiArgs"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "createMetaNftCpiArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "creators",
            "type": {
              "vec": {
                "defined": "Creator"
              }
            }
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "sellerFeeBasisPoints",
            "type": "u16"
          },
          {
            "name": "isMutable",
            "type": "bool"
          },
          {
            "name": "isMetaNftMasterEdition",
            "type": {
              "option": "bool"
            }
          },
          {
            "name": "isMetaDataInitialized",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "depositNftArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "creators",
            "type": {
              "vec": {
                "defined": "Creator"
              }
            }
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "sellerFeeBasisPoints",
            "type": "u16"
          },
          {
            "name": "isMutable",
            "type": "bool"
          },
          {
            "name": "isReceiptMasterEdition",
            "type": {
              "option": "bool"
            }
          },
          {
            "name": "isMetaDataInitialized",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "initMetaNftCpiArgs",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "initMetaBlocksAuthorityArgs",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "initReceiptMintArgs",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "createUniverseArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "websiteUrl",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "updateUniverseArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "websiteUrl",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "withdrawNftArgs",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "metaBlocksAuthority",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "payer",
            "type": "publicKey"
          },
          {
            "name": "universe",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "universe",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "lastUpdateTs",
            "type": "i64"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "config",
            "type": {
              "defined": "Config"
            }
          },
          {
            "name": "totalNfts",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "vault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vaultBump",
            "type": "u8"
          },
          {
            "name": "receiptMintBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "wrappedUserNft",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "userNftBump",
            "type": "u8"
          },
          {
            "name": "nftAuthority",
            "type": "publicKey"
          },
          {
            "name": "universe",
            "type": "publicKey"
          },
          {
            "name": "vaultAuthority",
            "type": "publicKey"
          },
          {
            "name": "userReceiptAtaBump",
            "type": "u8"
          },
          {
            "name": "receiptMint",
            "type": "publicKey"
          },
          {
            "name": "userReceiptAta",
            "type": "publicKey"
          },
          {
            "name": "vaultReceiptAta",
            "type": "publicKey"
          },
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "receiptMasterEdition",
            "type": "publicKey"
          },
          {
            "name": "isReceiptMasterEdition",
            "type": "bool"
          },
          {
            "name": "isUserNftVerified",
            "type": "bool"
          },
          {
            "name": "isUserNftMetaplex",
            "type": "bool"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Creator",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "publicKey"
          },
          {
            "name": "verified",
            "type": "bool"
          },
          {
            "name": "share",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "Config",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "websiteUrl",
            "type": "string"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "UniverseEvent",
      "fields": [
        {
          "name": "status",
          "type": "string",
          "index": false
        },
        {
          "name": "universeKey",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "NftEvent",
      "fields": [
        {
          "name": "status",
          "type": "string",
          "index": false
        },
        {
          "name": "message",
          "type": "string",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "IndexAdditionError",
      "msg": "Could not add index"
    },
    {
      "code": 6001,
      "name": "InvalidUniverseAuthority",
      "msg": "Universe authority does not match"
    },
    {
      "code": 6002,
      "name": "InvalidSigner",
      "msg": "Account is not a signer"
    },
    {
      "code": 6003,
      "name": "Unauthorized",
      "msg": "Unauthorized to access this instruction"
    },
    {
      "code": 6004,
      "name": "NoMetadata",
      "msg": "No Metadata provided for the nft"
    },
    {
      "code": 6005,
      "name": "InvalidTreasury",
      "msg": "Invalid treasury account"
    }
  ]
};

export const IDL: MetaBlocks = {
  "version": "1.0.1",
  "name": "meta_blocks",
  "instructions": [
    {
      "name": "createUniverseV1",
      "accounts": [
        {
          "name": "universe",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "CreateUniverseArgs"
          }
        }
      ]
    },
    {
      "name": "updateUniverseV1",
      "accounts": [
        {
          "name": "universe",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "UpdateUniverseArgs"
          }
        }
      ]
    },
    {
      "name": "initReceiptMintV1",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "receiptMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "universe",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metaTreasuryProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "treasuryAuthority",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "InitReceiptMintArgs"
          }
        }
      ]
    },
    {
      "name": "depositNftV1",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "wrappedUserNft",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiptMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vaultReceiptAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userReceiptAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "universe",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metaNftProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metaNft",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metaTreasuryProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "treasuryAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metaBlocksAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userNftMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "receiptMasterEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "receiptMetadata",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "DepositNftArgs"
          }
        }
      ]
    },
    {
      "name": "withdrawNftV1",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "wrappedUserNft",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "universe",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userReceiptAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultReceiptAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiptMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metaBlocksAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metaNftProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metaNft",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metaNftMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userMetaNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metaTreasuryProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "treasuryAuthority",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "WithdrawNftArgs"
          }
        }
      ]
    },
    {
      "name": "initMetaBlocksAuthorityV1",
      "accounts": [
        {
          "name": "metaBlocksAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "universe",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "InitMetaBlocksAuthorityArgs"
          }
        }
      ]
    },
    {
      "name": "initCpiMetaNftV1",
      "accounts": [
        {
          "name": "metaBlocksAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metaNft",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metaNftMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metaNftProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "universe",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metaTreasuryProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "treasuryAuthority",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "InitMetaNftCpiArgs"
          }
        }
      ]
    },
    {
      "name": "createCpiMetaNftV1",
      "accounts": [
        {
          "name": "metaBlocksAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metaNft",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metaNftMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userMetaNftAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metaNftProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metaNftMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metaNftMasterEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "CreateMetaNftCpiArgs"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "createMetaNftCpiArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "creators",
            "type": {
              "vec": {
                "defined": "Creator"
              }
            }
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "sellerFeeBasisPoints",
            "type": "u16"
          },
          {
            "name": "isMutable",
            "type": "bool"
          },
          {
            "name": "isMetaNftMasterEdition",
            "type": {
              "option": "bool"
            }
          },
          {
            "name": "isMetaDataInitialized",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "depositNftArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "creators",
            "type": {
              "vec": {
                "defined": "Creator"
              }
            }
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "sellerFeeBasisPoints",
            "type": "u16"
          },
          {
            "name": "isMutable",
            "type": "bool"
          },
          {
            "name": "isReceiptMasterEdition",
            "type": {
              "option": "bool"
            }
          },
          {
            "name": "isMetaDataInitialized",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "initMetaNftCpiArgs",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "initMetaBlocksAuthorityArgs",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "initReceiptMintArgs",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "createUniverseArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "websiteUrl",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "updateUniverseArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "websiteUrl",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "withdrawNftArgs",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "metaBlocksAuthority",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "payer",
            "type": "publicKey"
          },
          {
            "name": "universe",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "universe",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "lastUpdateTs",
            "type": "i64"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "config",
            "type": {
              "defined": "Config"
            }
          },
          {
            "name": "totalNfts",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "vault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vaultBump",
            "type": "u8"
          },
          {
            "name": "receiptMintBump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "wrappedUserNft",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "userNftBump",
            "type": "u8"
          },
          {
            "name": "nftAuthority",
            "type": "publicKey"
          },
          {
            "name": "universe",
            "type": "publicKey"
          },
          {
            "name": "vaultAuthority",
            "type": "publicKey"
          },
          {
            "name": "userReceiptAtaBump",
            "type": "u8"
          },
          {
            "name": "receiptMint",
            "type": "publicKey"
          },
          {
            "name": "userReceiptAta",
            "type": "publicKey"
          },
          {
            "name": "vaultReceiptAta",
            "type": "publicKey"
          },
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "receiptMasterEdition",
            "type": "publicKey"
          },
          {
            "name": "isReceiptMasterEdition",
            "type": "bool"
          },
          {
            "name": "isUserNftVerified",
            "type": "bool"
          },
          {
            "name": "isUserNftMetaplex",
            "type": "bool"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Creator",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": "publicKey"
          },
          {
            "name": "verified",
            "type": "bool"
          },
          {
            "name": "share",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "Config",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "websiteUrl",
            "type": "string"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "UniverseEvent",
      "fields": [
        {
          "name": "status",
          "type": "string",
          "index": false
        },
        {
          "name": "universeKey",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "NftEvent",
      "fields": [
        {
          "name": "status",
          "type": "string",
          "index": false
        },
        {
          "name": "message",
          "type": "string",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "IndexAdditionError",
      "msg": "Could not add index"
    },
    {
      "code": 6001,
      "name": "InvalidUniverseAuthority",
      "msg": "Universe authority does not match"
    },
    {
      "code": 6002,
      "name": "InvalidSigner",
      "msg": "Account is not a signer"
    },
    {
      "code": 6003,
      "name": "Unauthorized",
      "msg": "Unauthorized to access this instruction"
    },
    {
      "code": 6004,
      "name": "NoMetadata",
      "msg": "No Metadata provided for the nft"
    },
    {
      "code": 6005,
      "name": "InvalidTreasury",
      "msg": "Invalid treasury account"
    }
  ]
};
