export const SERVICE_API_KEY = {
  Etherscan: "ETHERSCAN_API_KEY",
  Coingecko: "COINGECKO_API_KEY",
  Safe: "SAFE_API_KEY",
}

export const FUNCTION_LOCALE = [
  {
    LOGO: 'https://cdn.prod.website-files.com/65f94dfd53db8b337c808067/68485baa72714ae58f350ce2_bs-logo.png',
    BRAND_COLOR: '#f8f8fd',
    BRAND_SECONDARY_COLOR: '#5353D3',
    n: 'BLOCKSCOUT',
    t: 20,
    d: 'Returns the onchain information about an address on a provided blockchain. By default on Ethereum mainnet.',
    a: 'Returns the onchain information about an address on a provided blockchain. By default on Ethereum mainnet.',
    p: [
      {
        name: 'address',
        detail: 'The address string representing the addresses to check for balance',
        example: `"0x813399e5b08Bb50b038AA7dF6347b6AF2D161828"`,
        require: 'm',
        type: 'string'
      },
      {
        name: 'type',
        detail: 'The type of data to query.',
        example: `"txns"`,
        require: 'm',
        type: 'string'
      },
      {
        name: 'chain',
        detail: 'The blockchain to query. By default on Ethereum mainnet.',
        example: `"ethereum"`,
        require: 'o',
        type: 'string'
      },
      {
        name: 'startTimestamp',
        detail: 'The Unix timestamp marking the start of the transaction search range. Work with type === "txns"',
        example: '1680300000',
        require: 'o',
        type: 'rangenumber'
      },
      {
        name: 'endTimestamp',
        detail: 'The Unix timestamp marking the end of the transaction search range. Work with type === "txns"',
        example: '1680300000',
        require: 'o',
        type: 'rangenumber'
      },
      {
        name: 'page',
        detail: 'The page number to return. Work with type === "txns"',
        example: '1',
        require: 'o',
        repeat: 'n',
        type: 'rangenumber'
      },
      {
        name: 'offset',
        detail: 'The number of transactions to return per page. Work with type === "txns"',
        example: '100',
        require: 'o',
        repeat: 'n',
        type: 'rangenumber'
      }
    ]
  },
{
  API_KEY: SERVICE_API_KEY.Etherscan,
  LOGO: "https://raw.githubusercontent.com/mritunjayz/github-storage/refs/heads/main/1689874988430.jpeg",
  BRAND_COLOR: "#F6F7F8",
  BRAND_SECONDARY_COLOR: "#21325B",
  n: "ETHERSCAN",
  t: 20,
  d: "Fetches data from Etherscan including transactions, token transfers, NFT transfers, and gas tracker info.",
  a: "Retrieves blockchain data for a given chain and address from Etherscan, including txns, token/nft transfers, and gas metrics.",
  p: [
    {
      name: "type",
      detail: "The type of data to retrieve. Can be 'all-txns', 'token-txns', 'nft-txns', or 'gas'.",
      example: `"all-txns"`,
      require: "m",
      type: "string"
    },
    {
      name: "chain",
      detail: "The chain name (e.g. 'ethereum', 'base', 'gnosis').",
      example: `"ethereum"`,
      require: "m",
      type: "string"
    },
    {
      name: "address",
      detail: "The wallet address to fetch data for (not required for 'gas').",
      example: `"0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC"`,
      require: "o",
      type: "string"
    },
    {
      name: "startDate",
      detail: "Start timestamp in seconds (optional). Used to filter block range.",
      example: `"1704067200"`,
      require: "o",
      type: "rangenumber"
    },
    {
      name: "endDate",
      detail: "End timestamp in seconds (optional). Used to filter block range.",
      example: `"1706659200"`,
      require: "o",
      type: "rangenumber"
    }
  ]
},

  {
  API_KEY: SERVICE_API_KEY.Etherscan,
  LOGO: "https://raw.githubusercontent.com/mritunjayz/github-storage/refs/heads/main/1689874988430.jpeg",
  BRAND_COLOR: "#F6F7F8",
  BRAND_SECONDARY_COLOR: "#21325B",
  n: "EOA",
  t: 20,
  d: "Fetches address data like transactions, balances, or portfolio info from multiple supported chains.",
  a: "Dynamically queries blockchain data such as transactions, balances by resolving time ranges to block ranges.",
  p: [
    {
      name: "addresses",
      detail: "One or more Ethereum addresses (comma-separated) to query.",
      example: `"0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC,0x000000000000000000000000000000000000dead"`,
      require: "m",
      type: "string"
    },
    {
      name: "categories",
      detail: `Type of data to fetch. Supported values: "txns", "balance".`,
      example: `"txns"`,
      require: "m",
    },
    {
      name: "chain",
      detail: `Blockchain network to query. Supported values: "ethereum", "gnosis", "base".`,
      example: `"ethereum"`,
      require: "m",
    },
    {
      name: "startTime",
      detail: "Start time in UNIX timestamp (seconds). Will be converted to a starting block. Required for txns category",
      example: "1680300000",
      require: "m",
      type: "rangenumber",
    },
    {
      name: "endTime",
      detail: "End time in UNIX timestamp (seconds). Will be converted to an ending block. Required for txns category",
      example: "1680900000",
      require: "m",
      type: "rangenumber",
    },
  ],
},
  {
        LOGO: 'https://files.readme.io/06394e687778e238a6cd43de6e1d7d339043aa50054703f64606369352ef1864-VariantCG-Symbol-Color.png',
    BRAND_COLOR: '#f8fdf8',
    BRAND_SECONDARY_COLOR: '#4bc63d',
    n: "COINGECKO",
    t: 20,
    API_KEY: SERVICE_API_KEY.Coingecko,
    d: "Query the prices of one or more coins by using their unique Coin API IDs, symbols, or names.",
    a: "Query the prices of one or more coins by using their unique Coin API IDs, symbols, or names.",
    p: [
      {
        name: "token",
        detail:
          "coins' IDs, comma-separated if querying more than 1 coin.",
        example: `"bitcoin"`,
        require: "m",
      },
      {
        name: "vs_currency",
        detail: "target currency of coins, comma-separated if querying more than 1 currency",
        example: `"usd"`,
        require: "m",
      },
    ],
  },
  {
    n: "FLVURL",
    t: 20,
    d: "Query the prices of one or more coins by using their unique Coin API IDs, symbols, or names.",
    a: "Query the prices of one or more coins by using their unique Coin API IDs, symbols, or names.",
    p: [
      {
        name: "token",
        detail:
          "coins' IDs, comma-separated if querying more than 1 coin.",
        example: `"bitcoin"`,
        require: "m",
      },
      {
        name: "vs_currency",
        detail: "target currency of coins, comma-separated if querying more than 1 currency",
        example: `"usd"`,
        require: "m",
      },
    ],
  },
  {
    API_KEY: SERVICE_API_KEY.Safe,
    LOGO: "https://safe-transaction-mainnet.safe.global/static/safe/favicon.png",
    BRAND_COLOR: "#ebf9f3",
    BRAND_SECONDARY_COLOR: "#00B460",
    n: "SAFE",
    t: 20,
    d: "Query the list of transactions performed by a Safe address, with optional pagination.",
    a: "Query the list of transactions performed by a Safe address, with optional pagination.",
    p: [
      {
        name: "address",
        detail: "The address to query, in hexadecimal format.",
        example: `"0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC"`,
        require: "m",
      },
      {
        name: "utility",
        detail: "The utility to query, supported values: 'txns'.",
        example: `"txns"`,
        require: "m",
      },
      {
        name: "chain",
        detail: "The chain to query, supported values: 'ethereum', 'gnosis'.",
        example: `"ethereum"`,
        require: "m",
      },
      {
        name: "limit",
        detail: "The number of transactions to return, default is 100.",
        example: `100`,
        require: "o",
        repeat: "n",
      },
      {
        name: "offset",
        detail: "The number of transactions to skip, default is 0.",
        example: `0`,
        require: "o",
        repeat: "n",
      },
    ],
  },
  {
    n: "PNL",
    t: 20,
    d: "Subtract each element from A column from B column and return the total sum.",
    a: "Returns the total of A - B element-wise subtraction across two ranges.",
    p: [
      {
        name: "A",
        detail:
          "The column or array of values to subtract from B (e.g. cost).",
        example: "A1:A10",
        require: "m",
        repeat: "n",
        type: "range",
      },
      {
        name: "B",
        detail:
          "The column or array of values to subtract A from (e.g. revenue).",
        example: "B1:B10",
        require: "m",
        repeat: "n",
        type: "range",
      },
    ],
  },
{
  API_KEY: SERVICE_API_KEY.Etherscan,
  LOGO: "https://app.uniswap.org/favicon.png",
  BRAND_COLOR: "#fef5fc",
  BRAND_SECONDARY_COLOR: "#f50db4",
  n: "UNISWAP",
  t: 20,
  d: "Fetches data from Etherscan including transactions, token transfers, NFT transfers, and gas tracker info.",
  a: "Retrieves blockchain data for a given chain and address from Etherscan, including txns, token/nft transfers, and gas metrics.",
  p: [
    {
      name: "type",
      detail: "The type of data to retrieve. Can be 'all-txns', 'token-txns', 'nft-txns', or 'gas'.",
      example: `"all-txns"`,
      require: "m",
      type: "string"
    },
    {
      name: "chain",
      detail: "The chain name (e.g. 'ethereum', 'base', 'gnosis').",
      example: `"ethereum"`,
      require: "m",
      type: "string"
    },
    {
      name: "address",
      detail: "The wallet address to fetch data for (not required for 'gas').",
      example: `"0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC"`,
      require: "o",
      type: "string"
    },
    {
      name: "startDate",
      detail: "Start timestamp in seconds (optional). Used to filter block range.",
      example: `"1704067200"`,
      require: "o",
      type: "rangenumber"
    },
    {
      name: "endDate",
      detail: "End timestamp in seconds (optional). Used to filter block range.",
      example: `"1706659200"`,
      require: "o",
      type: "rangenumber"
    }
  ]
},
  
{
  API_KEY: SERVICE_API_KEY.Etherscan,
  LOGO: "https://avatars.githubusercontent.com/u/47617460?s=200&v=4",
  BRAND_COLOR: "#f7f7ff",
  BRAND_SECONDARY_COLOR: "#9896ff",
  n: "AAVE",
  t: 20,
  d: "Fetches data from Etherscan including transactions, token transfers, NFT transfers, and gas tracker info.",
  a: "Retrieves blockchain data for a given chain and address from Etherscan, including txns, token/nft transfers, and gas metrics.",
  p: [
    {
      name: "type",
      detail: "The type of data to retrieve. Can be 'all-txns', 'token-txns', 'nft-txns', or 'gas'.",
      example: `"all-txns"`,
      require: "m",
      type: "string"
    },
    {
      name: "chain",
      detail: "The chain name (e.g. 'ethereum', 'base', 'gnosis').",
      example: `"ethereum"`,
      require: "m",
      type: "string"
    },
    {
      name: "address",
      detail: "The wallet address to fetch data for (not required for 'gas').",
      example: `"0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC"`,
      require: "o",
      type: "string"
    },
    {
      name: "startDate",
      detail: "Start timestamp in seconds (optional). Used to filter block range.",
      example: `"1704067200"`,
      require: "o",
      type: "rangenumber"
    },
    {
      name: "endDate",
      detail: "End timestamp in seconds (optional). Used to filter block range.",
      example: `"1706659200"`,
      require: "o",
      type: "rangenumber"
    }
  ]
},
{
  API_KEY: SERVICE_API_KEY.Etherscan,
  LOGO: "https://www.pendle.finance/uploads/wp-content/uploads/2021/12/cropped-Pendle-Logo-quite-small.png",
  BRAND_COLOR: "#eafffb",
  BRAND_SECONDARY_COLOR: "#47e2c2",
  n: "PENDLE",
  t: 20,
  d: "Fetches data from Etherscan including transactions, token transfers, NFT transfers, and gas tracker info.",
  a: "Retrieves blockchain data for a given chain and address from Etherscan, including txns, token/nft transfers, and gas metrics.",
  p: [
    {
      name: "type",
      detail: "The type of data to retrieve. Can be 'all-txns', 'token-txns', 'nft-txns', or 'gas'.",
      example: `"all-txns"`,
      require: "m",
      type: "string"
    },
    {
      name: "chain",
      detail: "The chain name (e.g. 'ethereum', 'base', 'gnosis').",
      example: `"ethereum"`,
      require: "m",
      type: "string"
    },
    {
      name: "address",
      detail: "The wallet address to fetch data for (not required for 'gas').",
      example: `"0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC"`,
      require: "o",
      type: "string"
    },
    {
      name: "startDate",
      detail: "Start timestamp in seconds (optional). Used to filter block range.",
      example: `"1704067200"`,
      require: "o",
      type: "rangenumber"
    },
    {
      name: "endDate",
      detail: "End timestamp in seconds (optional). Used to filter block range.",
      example: `"1706659200"`,
      require: "o",
      type: "rangenumber"
    }
  ]
},


{
  API_KEY: SERVICE_API_KEY.Etherscan,
  LOGO: "https://aerodrome.finance/images/AERO/favicon.ico",
  BRAND_COLOR: "#edf3ff",
  BRAND_SECONDARY_COLOR: "#2966f0",
  n: "AERODROME",
  t: 20,
  d: "Fetches data from Etherscan including transactions, token transfers, NFT transfers, and gas tracker info.",
  a: "Retrieves blockchain data for a given chain and address from Etherscan, including txns, token/nft transfers, and gas metrics.",
  p: [
    {
      name: "type",
      detail: "The type of data to retrieve. Can be 'all-txns', 'token-txns', 'nft-txns', or 'gas'.",
      example: `"all-txns"`,
      require: "m",
      type: "string"
    },
    {
      name: "chain",
      detail: "The chain name (e.g. 'ethereum', 'base', 'gnosis').",
      example: `"ethereum"`,
      require: "m",
      type: "string"
    },
    {
      name: "address",
      detail: "The wallet address to fetch data for (not required for 'gas').",
      example: `"0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC"`,
      require: "o",
      type: "string"
    },
    {
      name: "startDate",
      detail: "Start timestamp in seconds (optional). Used to filter block range.",
      example: `"1704067200"`,
      require: "o",
      type: "rangenumber"
    },
    {
      name: "endDate",
      detail: "End timestamp in seconds (optional). Used to filter block range.",
      example: `"1706659200"`,
      require: "o",
      type: "rangenumber"
    }
  ]
},
{
  API_KEY: SERVICE_API_KEY.Etherscan,
  LOGO: "https://cdn.prod.website-files.com/6760e87b474d412dfa9a7a68/6760e8ebe8faad5fb985c89a_Frame%201321316795.png",
  BRAND_COLOR: "#f6f4ff",
  BRAND_SECONDARY_COLOR: "#684ff8",
  n: "ARTEMIS",
  t: 20,
  d: "Fetches data from Etherscan including transactions, token transfers, NFT transfers, and gas tracker info.",
  a: "Retrieves blockchain data for a given chain and address from Etherscan, including txns, token/nft transfers, and gas metrics.",
  p: [
    {
      name: "type",
      detail: "The type of data to retrieve. Can be 'all-txns', 'token-txns', 'nft-txns', or 'gas'.",
      example: `"all-txns"`,
      require: "m",
      type: "string"
    },
    {
      name: "chain",
      detail: "The chain name (e.g. 'ethereum', 'base', 'gnosis').",
      example: `"ethereum"`,
      require: "m",
      type: "string"
    },
    {
      name: "address",
      detail: "The wallet address to fetch data for (not required for 'gas').",
      example: `"0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC"`,
      require: "o",
      type: "string"
    },
    {
      name: "startDate",
      detail: "Start timestamp in seconds (optional). Used to filter block range.",
      example: `"1704067200"`,
      require: "o",
      type: "rangenumber"
    },
    {
      name: "endDate",
      detail: "End timestamp in seconds (optional). Used to filter block range.",
      example: `"1706659200"`,
      require: "o",
      type: "rangenumber"
    }
  ]
},
{
  API_KEY: SERVICE_API_KEY.Etherscan,
  LOGO: "https://aerodrome.finance/images/AERO/favicon.ico",
  BRAND_COLOR: "#effdfb",
  BRAND_SECONDARY_COLOR: "#5eead4",
  n: "KAITO",
  t: 20,
  d: "Fetches data from Etherscan including transactions, token transfers, NFT transfers, and gas tracker info.",
  a: "Retrieves blockchain data for a given chain and address from Etherscan, including txns, token/nft transfers, and gas metrics.",
  p: [
    {
      name: "type",
      detail: "The type of data to retrieve. Can be 'all-txns', 'token-txns', 'nft-txns', or 'gas'.",
      example: `"all-txns"`,
      require: "m",
      type: "string"
    },
    {
      name: "chain",
      detail: "The chain name (e.g. 'ethereum', 'base', 'gnosis').",
      example: `"ethereum"`,
      require: "m",
      type: "string"
    },
    {
      name: "address",
      detail: "The wallet address to fetch data for (not required for 'gas').",
      example: `"0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC"`,
      require: "o",
      type: "string"
    },
    {
      name: "startDate",
      detail: "Start timestamp in seconds (optional). Used to filter block range.",
      example: `"1704067200"`,
      require: "o",
      type: "rangenumber"
    },
    {
      name: "endDate",
      detail: "End timestamp in seconds (optional). Used to filter block range.",
      example: `"1706659200"`,
      require: "o",
      type: "rangenumber"
    }
  ]
},

{
  API_KEY: SERVICE_API_KEY.Etherscan,
  LOGO: "https://safe-transaction-mainnet.safe.global/static/safe/favicon.png",
  BRAND_COLOR: "#f6f7f6",
  BRAND_SECONDARY_COLOR: "#133629",
  n: "GNOSIS",
  t: 20,
  d: "Fetches data from Etherscan including transactions, token transfers, NFT transfers, and gas tracker info.",
  a: "Retrieves blockchain data for a given chain and address from Etherscan, including txns, token/nft transfers, and gas metrics.",
  p: [
    {
      name: "type",
      detail: "The type of data to retrieve. Can be 'all-txns', 'token-txns', 'nft-txns', or 'gas'.",
      example: `"all-txns"`,
      require: "m",
      type: "string"
    },
    {
      name: "chain",
      detail: "The chain name (e.g. 'ethereum', 'base', 'gnosis').",
      example: `"ethereum"`,
      require: "m",
      type: "string"
    },
    {
      name: "address",
      detail: "The wallet address to fetch data for (not required for 'gas').",
      example: `"0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC"`,
      require: "o",
      type: "string"
    },
    {
      name: "startDate",
      detail: "Start timestamp in seconds (optional). Used to filter block range.",
      example: `"1704067200"`,
      require: "o",
      type: "rangenumber"
    },
    {
      name: "endDate",
      detail: "End timestamp in seconds (optional). Used to filter block range.",
      example: `"1706659200"`,
      require: "o",
      type: "rangenumber"
    }
  ]
},
{
  API_KEY: SERVICE_API_KEY.Etherscan,
  LOGO: "https://avatars.githubusercontent.com/u/129790008?s=48&v=4",
  BRAND_COLOR: "#f1f7fc",
  BRAND_SECONDARY_COLOR: "#5098d6",
  n: "OTTERSCAN",
  t: 20,
  d: "Fetches data from Etherscan including transactions, token transfers, NFT transfers, and gas tracker info.",
  a: "Retrieves blockchain data for a given chain and address from Etherscan, including txns, token/nft transfers, and gas metrics.",
  p: [
    {
      name: "type",
      detail: "The type of data to retrieve. Can be 'all-txns', 'token-txns', 'nft-txns', or 'gas'.",
      example: `"all-txns"`,
      require: "m",
      type: "string"
    },
    {
      name: "chain",
      detail: "The chain name (e.g. 'ethereum', 'base', 'gnosis').",
      example: `"ethereum"`,
      require: "m",
      type: "string"
    },
    {
      name: "address",
      detail: "The wallet address to fetch data for (not required for 'gas').",
      example: `"0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC"`,
      require: "o",
      type: "string"
    },
    {
      name: "startDate",
      detail: "Start timestamp in seconds (optional). Used to filter block range.",
      example: `"1704067200"`,
      require: "o",
      type: "rangenumber"
    },
    {
      name: "endDate",
      detail: "End timestamp in seconds (optional). Used to filter block range.",
      example: `"1706659200"`,
      require: "o",
      type: "rangenumber"
    }
  ]
},
{
  API_KEY: SERVICE_API_KEY.Etherscan,
  LOGO: "https://avatars.githubusercontent.com/u/129790008?s=48&v=4",
  BRAND_COLOR: "#f9f8ff",
  BRAND_SECONDARY_COLOR: "#725bff",
  n: "TALLY",
  t: 20,
  d: "Fetches data from Etherscan including transactions, token transfers, NFT transfers, and gas tracker info.",
  a: "Retrieves blockchain data for a given chain and address from Etherscan, including txns, token/nft transfers, and gas metrics.",
  p: [
    {
      name: "type",
      detail: "The type of data to retrieve. Can be 'all-txns', 'token-txns', 'nft-txns', or 'gas'.",
      example: `"all-txns"`,
      require: "m",
      type: "string"
    },
    {
      name: "chain",
      detail: "The chain name (e.g. 'ethereum', 'base', 'gnosis').",
      example: `"ethereum"`,
      require: "m",
      type: "string"
    },
    {
      name: "address",
      detail: "The wallet address to fetch data for (not required for 'gas').",
      example: `"0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC"`,
      require: "o",
      type: "string"
    },
    {
      name: "startDate",
      detail: "Start timestamp in seconds (optional). Used to filter block range.",
      example: `"1704067200"`,
      require: "o",
      type: "rangenumber"
    },
    {
      name: "endDate",
      detail: "End timestamp in seconds (optional). Used to filter block range.",
      example: `"1706659200"`,
      require: "o",
      type: "rangenumber"
    }
  ]
},
    
]

export * from './utils/constants'