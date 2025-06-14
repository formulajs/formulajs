export const SERVICE_API_KEY = {
  Etherscan: "ETHERSCAN_API_KEY",
  Coingecko: "COINGECKO_API_KEY",
  Safe: "SAFE_API_KEY",
  Basescan: "BASESCAN_API_KEY",
  Gnosisscan: "GNOSIS_API_KEY",
  Firefly: "FIRE_FLY_API_KEY"
}

export const FUNCTION_LOCALE = [
  {
  API_KEY: SERVICE_API_KEY.Firefly,
  LOGO: "https://firefly.social/android-chrome-192x192.png",
  BRAND_COLOR: "#f8f5fc",
  BRAND_SECONDARY_COLOR: "#855dcd",
  n: "FIREFLY",
  t: 20,
  d: "Fetches posts or replies from Farcaster or Lens using Firefly's OpenAPI and returns simplified text content.",
  a: "Retrieves posts or replies from Firefly OpenAPI by username, user ID, or post ID/hash for Farcaster and Lens platforms. Returns a flattened array of content with id, author, text, createdAt, and platform.",
  p: [
    {
      name: "platform",
      detail: "The social platform to query. Supports 'farcaster' or 'lens'.",
      example: `"farcaster"`,
      require: "m",
      type: "string"
    },
    {
      name: "contentType",
      detail: "The type of content to fetch. Can be 'posts' or 'replies'.",
      example: `"posts"`,
      require: "m",
      type: "string"
    },
    {
      name: "identifier",
      detail: "The username, user ID, or post ID/hash depending on platform and contentType.",
      example: `"toka" or "0xcb6cab2048..."`,
      require: "m",
      type: "string"
    }
  ]
},

  {
  API_KEY: SERVICE_API_KEY.Neynar,
  LOGO: "https://framerusercontent.com/images/OS5YeZ2Y7DmszAxL6Zf06pXtKzc.svg",
  BRAND_COLOR: "##e8e6ff",
  BRAND_SECONDARY_COLOR: "#28204A",
  n: "NEYNAR",
  t: 20,
  d: "Fetches followers for a given Farcaster FID using Neynar's API.",
  a: "Retrieves followers of a Farcaster user, with support for sorting, pagination, and optional viewer context.",
  p: [
    {
      name: "fid",
      detail: "The Farcaster FID of the user whose followers should be fetched.",
      example: `123`,
      require: "m",
      type: "number"
    },
    {
      name: "viewerFid",
      detail: "FID of the viewer, to include contextual info like mutual follows (optional).",
      example: `456`,
      require: "o",
      type: "number"
    },
    {
      name: "sortType",
      detail: "Sorting type: either 'desc_chron' (default) or 'algorithmic'.",
      example: `"desc_chron"`,
      require: "o",
      type: "string"
    },
    {
      name: "limit",
      detail: "Number of followers to return (max 100).",
      example: `20`,
      require: "o",
      type: "number"
    },
    {
      name: "cursor",
      detail: "Cursor string for paginating the result set.",
      example: `"eyJvZmZzZXQiOjIwLCJsYXN0SWQiOjEyMzQ1Nn0="`,
      require: "o",
      type: "string"
    }
  ]
},
{
  API_KEY: SERVICE_API_KEY.Basescan,
  LOGO: "https://raw.githubusercontent.com/mritunjayz/github-storage/refs/heads/main/1689874988430.jpeg",
  BRAND_COLOR: "#f1f5ff",
  BRAND_SECONDARY_COLOR: "#2752ff",
  n: "BASESCAN",
  t: 20,
  d: "Fetches Base network data via Basescan: native txns, ERC-20 transfers, ERC-721 transfers, and gas metrics.",
  a: "Pulls on-chain activity for Base (chainid 8453) using Basescan’s API — supports full tx history, token/NFT transfers, gas prices, and pagination.",
  p: [
    {
      name: "type",
      detail: "Data category: 'all-txns' | 'token-txns' | 'nft-txns' | 'gas'.",
      example: `"token-txns"`,
      require: "m",
      type: "string"
    },
    {
      name: "chain",
      detail: "Must be 'base'.",
      example: `"base"`,
      require: "m",
      type: "string"
    },
    {
      name: "address",
      detail: "Target wallet address (only required for txns, token, and nft queries). Not needed for 'gas'.",
      example: `"0x7FD624f3f97A7dd36195E8379F28dB6147C270ff"`,
      require: "o",
      type: "string"
    },
    {
      name: "startDate",
      detail: "Start UNIX timestamp in seconds (used to resolve block range). Optional, only applies to txns.",
      example: `"1704067200"`,
      require: "o",
      type: "rangenumber"
    },
    {
      name: "endDate",
      detail: "End UNIX timestamp in seconds (used to resolve block range). Optional, only applies to txns.",
      example: `"20250614"`,
      require: "o",
      type: "rangenumber"
    },
    {
      name: "page",
      detail: "Page number for paginated results. Only applies to txns/token/nft queries.",
      example: `"1"`,
      require: "o",
      type: "number"
    },
    {
      name: "offset",
      detail: "Number of items per page (limit). Only applies to txns/token/nft queries.",
      example: `"25"`,
      require: "o",
      type: "number"
    }
  ]
}
,
{
  API_KEY: SERVICE_API_KEY.Gnosisscan,
  LOGO: "https://raw.githubusercontent.com/mritunjayz/github-storage/refs/heads/main/1689874988430.jpeg",
  BRAND_COLOR: "#f6f7f6",
  BRAND_SECONDARY_COLOR: "#133629",
  n: "GNOSISSCAN",
  t: 20,
  d: "Fetches Gnosis Chain data via Gnosisscan: native transactions, ERC-20 token transfers, ERC-721 NFT transfers, and gas metrics.",
  a: "Queries Gnosis Chain (chainid 100) through Gnosisscan’s API to return transaction history, token/NFT transfers, or gas price information. Supports pagination and time-based filtering for transaction types.",
  p: [
    {
      name: "type",
      detail: "Data category to fetch. Options: 'all-txns', 'token-txns', 'nft-txns', or 'gas'.",
      example: `"nft-txns"`,
      require: "m",
      type: "string"
    },
    {
      name: "chain",
      detail: "Must be 'gnosis'.",
      example: `"gnosis"`,
      require: "m",
      type: "string"
    },
    {
      name: "address",
      detail: "Wallet address to query. Required for all types except 'gas'.",
      example: `"0x90830Ed558f12D826370DC52E9D87947A7F18De9"`,
      require: "o",
      type: "string"
    },
    {
      name: "startDate",
      detail: "Start timestamp in UNIX seconds. Used to resolve starting block for txns.",
      example: `"1704067200"`,
      require: "o",
      type: "rangenumber"
    },
    {
      name: "endDate",
      detail: "End timestamp in UNIX seconds. Used to resolve ending block for txns.",
      example: `"20250614"`,
      require: "o",
      type: "rangenumber"
    },
    {
      name: "page",
      detail: "Page number for paginated transaction results. Applies only to 'txns', 'token-txns', and 'nft-txns'.",
      example: `"1"`,
      require: "o",
      type: "number"
    },
    {
      name: "offset",
      detail: "Number of results per page (limit). Applies only to 'txns', 'token-txns', and 'nft-txns'.",
      example: `"50"`,
      require: "o",
      type: "number"
    }
  ]
}
,
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
        example: `"0xe9A6378d8FD4983C2999DB0735f258397E8C2253"`,
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
        example: `"gnosis"`,
        require: 'o',
        type: 'string'
      },
      {
        name: 'startTimestamp',
        detail: 'The Unix timestamp marking the start of the transaction search range. Work with type === "txns"',
        example: '1721174400',
        require: 'o',
        type: 'rangenumber'
      },
      {
        name: 'endTimestamp',
        detail: 'The Unix timestamp marking the end of the transaction search range. Work with type === "txns"',
        example: '20250614',
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
  a: "Dynamically queries blockchain data such as transactions and balances by resolving time ranges to block ranges and supporting pagination.",
  p: [
    {
      name: "addresses",
      detail: "One or more addresses (comma-separated) to query.",
      example: `"0xe9A6378d8FD4983C2999DB0735f258397E8C2253, 0x50Aa3435E310d5a2d15a989Bc353ce7f5682E1d4"`,
      require: "m",
      type: "string"
    },
    {
      name: "categories",
      detail: `Type of data to fetch. Supported values: "txns", "balance".`,
      example: `"txns"`,
      require: "m",
      type: "string"
    },
    {
      name: "chain",
      detail: `Blockchain network(s) to query. Supported values: "ethereum", "gnosis", "base". Accepts comma-separated values.`,
      example: `"ethereum, gnosis"`,
      require: "m",
      type: "string"
    },
    {
      name: "startTime",
      detail: "Start time in UNIX timestamp (seconds). Used to calculate starting block for transaction queries.",
      example: "1721174400",
      require: "m",
      type: "rangenumber"
    },
    {
      name: "endTime",
      detail: "End time in UNIX timestamp (seconds). Used to calculate ending block for transaction queries.",
      example: "1722988800",
      require: "m",
      type: "rangenumber"
    },
    {
      name: "page",
      detail: "The page number for paginated transaction results. Only used when category is 'txns'.",
      example: "1",
      require: "o",
      type: "number"
    },
    {
      name: "offset",
      detail: "The number of results to return per page (limit). Only used when category is 'txns'.",
      example: "25",
      require: "o",
      type: "number"
    }
  ],
}
,
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
        example: `"0xe9A6378d8FD4983C2999DB0735f258397E8C2253"`,
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
        example: `"gnosis"`,
        require: "m",
      },
      {
        name: "limit",
        detail: "The number of transactions to return, default is 100.",
        example: `10`,
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
  API_KEY: SERVICE_API_KEY.GnosisPay,
  LOGO: "https://gnosispay.com/favicon.ico",
  BRAND_COLOR: "#f6f7f6",
  BRAND_SECONDARY_COLOR: "#133629",
  n: "GNOSIS",
  t: 20,
  d: "Fetches Gnosis Pay card transaction history, including merchant, amount, and currency info.",
  a: "Retrieves card transactions from Gnosis Pay’s API for a specific card ID, filtered by date range and paginated via limit/offset.",
  p: [
    {
      name: "cardId",
      detail: "The Gnosis Pay card ID to fetch transactions for.",
      example: `"card_9f8f8b3a56"`,
      require: "m",
      type: "string"
    },
    {
      name: "startDate",
      detail: "Start timestamp in seconds (UNIX). Filters transactions created after this date.",
      example: `"1704067200"`,
      require: "o",
      type: "rangenumber"
    },
    {
      name: "endDate",
      detail: "End timestamp in seconds (UNIX). Filters transactions created before this date.",
      example: `"1706659200"`,
      require: "o",
      type: "rangenumber"
    },
    {
      name: "limit",
      detail: "Number of transactions to return per page.",
      example: `"20"`,
      require: "o",
      type: "number"
    },
    {
      name: "offset",
      detail: "Offset for pagination (i.e., how many records to skip).",
      example: `"0"`,
      require: "o",
      type: "number"
    }
  ]
}
,
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