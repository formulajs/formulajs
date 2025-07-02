export const SERVICE_API_KEY = {
  Etherscan: 'ETHERSCAN_API_KEY',
  Coingecko: 'COINGECKO_API_KEY',
  Safe: 'SAFE_API_KEY',
  Basescan: 'BASESCAN_API_KEY',
  Gnosisscan: 'GNOSIS_API_KEY',
  Firefly: 'FIRE_FLY_API_KEY',
  GnosisPay: 'GNOSIS_API_KEY',
  Neynar: 'NEYNAR_API_KEY',
  Defillama: 'DEFILLAMA_API_KEY'
}

export const FUNCTION_LOCALE = [
  {
    API_KEY: SERVICE_API_KEY.Etherscan,
    LOGO: 'https://raw.githubusercontent.com/ethereum/ethereum-org/master/dist/favicon.ico',
    BRAND_COLOR: '#F6F7F8',
    BRAND_SECONDARY_COLOR: '#21325B',
    n: 'EOA',
    t: 20,
    d: 'Fetches address data like transactions, balances, or portfolio info from multiple supported chains.',
    a: 'Dynamically queries blockchain data such as transactions and balances by resolving time ranges to block ranges and supporting pagination.',
    p: [
      {
        name: 'addresses',
        detail: 'One or more addresses (comma-separated) to query.',
        example: `"vitalik.eth"`,
        require: 'm',
        type: 'string'
      },
      {
        name: 'categories',
        detail: `Type of data to fetch. Supported values: "txns", "balance".`,
        example: `"txns"`,
        require: 'm',
        type: 'string'
      },
      {
        name: 'chain',
        detail: `Blockchain network(s) to query. Supported values: "ethereum", "gnosis", "base". Accepts comma-separated values.`,
        example: `"ethereum"`,
        require: 'm',
        type: 'string'
      },
      {
        name: 'startTime',
        detail: 'Used to calculate starting block for transaction queries.',
        example: `"01/01/2024"`,
        require: 'm',
        type: 'string'
      },
      {
        name: 'endTime',
        detail: 'Used to calculate ending block for transaction queries.',
        example: `"01/06/2024"`,
        require: 'm',
        type: 'string'
      },
      {
        name: 'page',
        detail: "The page number for paginated transaction results. Only used when category is 'txns'. Default is 1",
        example: '1',
        require: 'o',
        type: 'number'
      },
      {
        name: 'offset',
        detail: "The number of results to return per page (limit). Only used when category is 'txns'. Default is 10",
        example: '10',
        require: 'o',
        type: 'number'
      }
    ]
  },
  {
    LOGO: 'https://app.uniswap.org/favicon.png',
    BRAND_COLOR: '#fef5fc',
    BRAND_SECONDARY_COLOR: '#f50db4',
    n: 'UNISWAP',
    t: 20,
    d: 'Returns Uniswap pools and tokens data',
    a: 'Retrieves Uniswap data for a given chain and address from Uniswap',
    p: [
      {
        name: 'graphType',
        detail: "Graph type to Query. Can be 'v3', 'v3-raw'",
        example: `"v3"`,
        require: 'm',
        type: 'string'
      },
      {
        name: 'category',
        detail: "Query type for the data. Can be 'tokens', 'markets'",
        example: `"tokens"`,
        require: 'm',
        type: 'string'
      },
      {
        name: 'param1',
        detail: 'Token Contract Address for market or Token symbol ',
        example: `"eth"`,
        require: 'm',
        type: 'string'
      }
    ]
  },
  {
    LOGO: 'https://files.readme.io/06394e687778e238a6cd43de6e1d7d339043aa50054703f64606369352ef1864-VariantCG-Symbol-Color.png',
    BRAND_COLOR: '#f8fdf8',
    BRAND_SECONDARY_COLOR: '#4bc63d',
    n: 'COINGECKO',
    t: 20,
    API_KEY: SERVICE_API_KEY.Coingecko,
    d: 'Query crypto prices, ecosystem market data, stablecoins, or derivatives from CoinGecko.',
    a: 'Supports querying: "price" for specific tokens "market" for ecosystem categories (ETH, BASE, SOL, GNOSIS, HYPERLIQUID, BITCOIN, PUMP)\n- "stablecoins" for stablecoin categories like "crypto-backed-stablecoin"\n- "derivatives" globally or per exchange.\nPagination is supported for all except single-exchange derivatives.',
    p: [
      {
        name: 'category',
        detail: 'Query type: "price", "market", "stablecoins", or "derivatives".',
        example: `"stablecoins"`,
        require: 'm'
      },
      {
        name: 'param1',
        detail: `If "price" then - eg. "BTC", "ETH", OR any token on coingecko\n
If "market": one of "all", "base", "meme", "aiagents", "bitcoin", "ethereum", "hyperliquid", "pump", "solana".\n
If "stablecoins": one of "all", "yield-bearing-stablecoins", "crypto-backed-stablecoin".\n
If "derivatives": exchange name (e.g., "binance_futures", "hyperliquid", "weex-futures", "bybit" ).`,
        example: `"yield-bearing-stablecoins"`,
        require: 'm'
      },
      {
        name: 'param2',
        detail: `If "market" and "stablecoins" then eg. "1h", "24h", "7d".`,
        example: `"1h,24h,7d"`,
        require: 'o'
      }
    ]
  },

  {
    API_KEY: SERVICE_API_KEY.Defillama,
    LOGO: 'https://defillama.com/favicon-32x32.png',
    BRAND_COLOR: '#f8f5fc',
    BRAND_SECONDARY_COLOR: '#855dcd',
    n: 'DEFILLAMA',
    t: 20,
    d: 'Fetches content from Defillama.',
    a: 'Retrieves data from Defillama.',
    p: [
      {
        name: 'category',
        detail: "Type of content to fetch. Supports 'protocols', 'yields', 'dex', or 'fees'.",
        example: `"protocols"`,
        require: 'm',
        type: 'string'
      }
    ]
  },
  {
    API_KEY: SERVICE_API_KEY.Basescan,
    LOGO: 'https://2064089921-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FevP3L0cUvP9xmRefuzCm%2Fuploads%2F2K1pvFsE7JAfcI3LAxYl%2Fbase-logo-in-blue.webp?alt=media&token=32c80439-dbdc-432a-b199-220e012efc3c',
    BRAND_COLOR: '#f1f5ff',
    BRAND_SECONDARY_COLOR: '#2752ff',
    n: 'BASE',
    t: 20,
    d: 'Fetches Base network data via Basescan: native txns, ERC-20 transfers, ERC-721 transfers, and gas metrics.',
    a: 'Pulls on-chain activity for Base (chainid 8453) using Basescan’s API — supports full tx history, token/NFT transfers, gas prices, and pagination.',
    p: [
      {
        name: 'type',
        detail: "Data category: 'all-txns' | 'token-txns' | 'nft-txns' | 'gas'.",
        example: `"token-txns"`,
        require: 'm',
        type: 'string'
      },
      {
        name: 'chain',
        detail: "Must be 'base'.",
        example: `"base"`,
        require: 'm',
        type: 'string'
      },
      {
        name: 'address',
        detail: "Target wallet address (only required for txns, token, and nft queries). Not needed for 'gas'.",
        example: `"0x7FD624f3f97A7dd36195E8379F28dB6147C270ff"`,
        require: 'o',
        type: 'string'
      },
      {
        name: 'startDate',
        detail: 'Start date (used to resolve block range). Optional, only applies to txns.',
        example: `"01/01/2024"`,
        require: 'o',
        type: 'string'
      },
      {
        name: 'endDate',
        detail: 'End date (used to resolve block range). Optional, only applies to txns.',
        example: `"07/07/2024"`,
        require: 'o',
        type: 'string'
      },
      {
        name: 'page',
        detail: 'Page number for paginated results. Only applies to txns/token/nft queries.',
        example: `1`,
        require: 'o',
        type: 'number'
      },
      {
        name: 'offset',
        detail: 'Number of items per page (limit). Only applies to txns/token/nft queries.',
        example: `2`,
        require: 'o',
        type: 'number'
      }
    ]
  },
  {
    API_KEY: SERVICE_API_KEY.Gnosisscan,
    LOGO: 'https://gnosisscan.io/assets/generic/html/favicon-light.ico',
    BRAND_COLOR: '#f6f7f6',
    BRAND_SECONDARY_COLOR: '#133629',
    n: 'GNOSIS',
    t: 20,
    d: 'Fetches Gnosis Chain data via Gnosisscan: native transactions, ERC-20 token transfers, ERC-721 NFT transfers, and gas metrics.',
    a: 'Queries Gnosis Chain (chainid 100) through Gnosisscan’s API to return transaction history, token/NFT transfers, or gas price information. Supports pagination and time-based filtering for transaction types.',
    p: [
      {
        name: 'type',
        detail: "Data category to fetch. Options: 'all-txns', 'token-txns', 'nft-txns', or 'gas'.",
        example: `"nft-txns"`,
        require: 'm',
        type: 'string'
      },
      {
        name: 'chain',
        detail: "Must be 'gnosis'.",
        example: `"gnosis"`,
        require: 'm',
        type: 'string'
      },
      {
        name: 'address',
        detail: "Wallet address to query. Required for all types except 'gas'.",
        example: `"0x90830Ed558f12D826370DC52E9D87947A7F18De9"`,
        require: 'o',
        type: 'string'
      },
      {
        name: 'startDate',
        detail: 'Used to resolve starting block for txns.',
        example: `"01/01/2024"`,
        require: 'o',
        type: 'string'
      },
      {
        name: 'endDate',
        detail: 'Used to resolve ending block for txns.',
        example: `"14/06/2025"`,
        require: 'o',
        type: 'string'
      },
      {
        name: 'page',
        detail: "Page number for paginated transaction results. Applies only to 'txns', 'token-txns', and 'nft-txns'.",
        example: `"1"`,
        require: 'o',
        type: 'number'
      },
      {
        name: 'offset',
        detail: "Number of results per page (limit). Applies only to 'txns', 'token-txns', and 'nft-txns'.",
        example: `"50"`,
        require: 'o',
        type: 'number'
      }
    ]
  },

  {
    API_KEY: SERVICE_API_KEY.Etherscan,
    LOGO: 'https://etherscan.io/images/favicon3.ico',
    BRAND_COLOR: '#F6F7F8',
    BRAND_SECONDARY_COLOR: '#21325B',
    n: 'ETHERSCAN',
    t: 20,
    d: 'Returns blockchain transaction history for the given address',
    a: 'Retrieves blockchain data for a given chain and address from Etherscan, including txns, token/nft transfers, and gas metrics.',
    p: [
      {
        name: 'type',
        detail: "The type of data to retrieve. Can be 'all-txns', 'token-txns', 'nft-txns', or 'gas'.",
        example: `"all-txns"`,
        require: 'm',
        type: 'string'
      },
      {
        name: 'chain',
        detail: "The chain name (e.g. 'ethereum', 'base', 'gnosis').",
        example: `"ethereum"`,
        require: 'm',
        type: 'string'
      },
      {
        name: 'address',
        detail: 'Wallet address / Ens name to query',
        example: `"vitalik.eth"`,
        require: 'o',
        type: 'string'
      },
      {
        name: 'startDate',
        detail: 'Used to filter block range.',
        example: `"01/01/2024"`,
        require: 'o',
        type: 'string'
      },
      {
        name: 'endDate',
        detail: 'Used to filter block range.',
        example: `"01/07/2025"`,
        require: 'o',
        type: 'string'
      }
    ]
  },

  {
    n: 'PNL',
    t: 20,
    d: 'Subtract each element from A column from B column and return the total sum.',
    a: 'Returns the total of A - B element-wise subtraction across two ranges.',
    p: [
      {
        name: 'A',
        detail: 'The column or array of values to subtract from B (e.g. cost).',
        example: 'A1:A10',
        require: 'm',
        repeat: 'n',
        type: 'range'
      },
      {
        name: 'B',
        detail: 'The column or array of values to subtract A from (e.g. revenue).',
        example: 'B1:B10',
        require: 'm',
        repeat: 'n',
        type: 'range'
      }
    ]
  },

  {
    API_KEY: SERVICE_API_KEY.Safe,
    LOGO: 'https://safe-transaction-mainnet.safe.global/static/safe/favicon.png',
    BRAND_COLOR: '#ebf9f3',
    BRAND_SECONDARY_COLOR: '#00B460',
    n: 'SAFE',
    t: 20,
    d: 'Query the list of transactions performed by a Safe address, with optional pagination.',
    a: 'Query the list of transactions performed by a Safe address, with optional pagination.',
    p: [
      {
        name: 'address',
        detail: 'The address to query, in hexadecimal format.',
        example: `"0xe9A6378d8FD4983C2999DB0735f258397E8C2253"`,
        require: 'm'
      },
      {
        name: 'utility',
        detail: "The utility to query, supported values: 'txns'.",
        example: `"txns"`,
        require: 'm'
      },
      {
        name: 'chain',
        detail: "The chain to query, supported values: 'ethereum', 'gnosis'.",
        example: `"gnosis"`,
        require: 'm'
      },
      {
        name: 'limit',
        detail: 'The number of transactions to return, default is 100.',
        example: `10`,
        require: 'o',
        repeat: 'n'
      },
      {
        name: 'offset',
        detail: 'The number of transactions to skip, default is 0.',
        example: `0`,
        require: 'o',
        repeat: 'n'
      }
    ]
  },

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
        example: `"vitalik.eth"`,
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
        detail: 'Start date marking the start of the transaction search range. Work with type === "txns"',
        example: `"01/01/2023"`,
        require: 'o',
        type: 'string'
      },
      {
        name: 'endTimestamp',
        detail: 'End date marking the end of the transaction search range. Work with type === "txns"',
        example: `"01/05/2024"`,
        require: 'o',
        type: 'string'
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
        example: '2',
        require: 'o',
        repeat: 'n',
        type: 'rangenumber'
      }
    ]
  },
  {
    LOGO: 'https://avatars.githubusercontent.com/u/47617460?s=200&v=4',
    BRAND_COLOR: '#f7f7ff',
    BRAND_SECONDARY_COLOR: '#9896ff',
    n: 'AAVE',
    t: 20,
    d: 'Returns Aave pools and tokens data',
    a: 'Retrieves Aave data for a given chain and address from Aave',
    p: [
      {
        name: 'graphType',
        detail: "Graph type to Query. Can be 'v2', 'v2-raw'",
        example: `"v2"`,
        require: 'm',
        type: 'string'
      },
      {
        name: 'category',
        detail: "Query type for the data. Can be 'tokens', 'markets'",
        example: `"tokens"`,
        require: 'm',
        type: 'string'
      },
      {
        name: 'param2',
        detail: 'Token Contract Address for market category or Token symbol',
        example: `"USDT"`,
        require: 'm',
        type: 'string'
      }
    ]
  },

  {
    API_KEY: SERVICE_API_KEY.Firefly,
    LOGO: 'https://tse3.mm.bing.net/th?id=OIP.1TANdvYNcEadCk6CO1bCcgAAAA&r=0&w=440&h=440&c=7',
    SECONDARY_LOGO: 'https://firefly.social/android-chrome-192x192.png',
    BRAND_COLOR: '#f8f5fc',
    BRAND_SECONDARY_COLOR: '#855dcd',
    n: 'LENS',
    t: 20,
    d: 'Fetches content from Lens.',
    a: 'Retrieves posts or replies from Lens by usernames, IDs, or hashes.',
    p: [
      {
        name: 'contentType',
        detail: "Type of content to fetch. Supports 'posts' or 'replies'.",
        example: `"posts"`,
        require: 'm',
        type: 'string'
      },
      {
        name: 'identifier',
        detail: 'Comma-separated usernames, IDs, or post hashes depending on platform and contentType.',
        example: `"toka,miroyato"`,
        require: 'm',
        type: 'string'
      },
      {
        name: 'start',
        detail: 'Pagination start index (default is 0).',
        example: `0`,
        require: 'o',
        type: 'number'
      },
      {
        name: 'end',
        detail: 'Pagination end index (default is 10).',
        example: `10`,
        require: 'o',
        type: 'number'
      }
    ]
  },

  {
    API_KEY: SERVICE_API_KEY.Firefly,
    LOGO: 'https://farcaster.xyz/favicon.ico',
    SECONDARY_LOGO: 'https://firefly.social/android-chrome-192x192.png',
    BRAND_COLOR: '#f8f5fc',
    BRAND_SECONDARY_COLOR: '#855dcd',
    n: 'FARCASTER',
    t: 20,
    d: 'Fetches content from Farcaster.',
    a: 'Retrieves posts, replies, or channels from Farcaster by usernames, IDs, or hashes.',
    p: [
      {
        name: 'contentType',
        detail: "Type of content to fetch. Supports 'posts', 'replies', and 'channels'.",
        example: `"posts"`,
        require: 'm',
        type: 'string'
      },
      {
        name: 'identifier',
        detail: 'Comma-separated usernames, IDs, or post hashes depending on contentType.',
        example: `"miroyato"`,
        require: 'm',
        type: 'string'
      },
      {
        name: 'start',
        detail: 'Pagination start index (default is 0).',
        example: `0`,
        require: 'o',
        type: 'number'
      },
      {
        name: 'end',
        detail: 'Pagination end index (default is 10).',
        example: `10`,
        require: 'o',
        type: 'number'
      }
    ]
  },

  {
    API_KEY: SERVICE_API_KEY.Firefly,
    LOGO: 'https://firefly.social/android-chrome-192x192.png',
    BRAND_COLOR: '#f8f5fc',
    BRAND_SECONDARY_COLOR: '#855dcd',
    n: 'FIREFLY',
    t: 20,
    d: 'Fetches content from Farcaster or Lens.',
    a: 'Retrieves posts, replies, or channels from Farcaster and Lens by usernames, IDs, or hashes.',
    p: [
      {
        name: 'platform',
        detail: "The social platform to query. Supports 'farcaster' or 'lens'.",
        example: `"farcaster"`,
        require: 'm',
        type: 'string'
      },
      {
        name: 'contentType',
        detail:
          "Type of content to fetch. Supports 'posts', 'replies', and 'channels' (channels only for 'farcaster').",
        example: `"posts"`,
        require: 'm',
        type: 'string'
      },
      {
        name: 'identifier',
        detail: 'Comma-separated usernames, IDs, or post hashes depending on platform and contentType.',
        example: `"toka,miroyato"`,
        require: 'm',
        type: 'string'
      },
      {
        name: 'start',
        detail: 'Pagination start index (default is 0).',
        example: `0`,
        require: 'o',
        type: 'number'
      },
      {
        name: 'end',
        detail: 'Pagination end index (default is 10).',
        example: `10`,
        require: 'o',
        type: 'number'
      }
    ]
  },

  {
    API_KEY: SERVICE_API_KEY.Neynar,
    LOGO: 'https://framerusercontent.com/images/OS5YeZ2Y7DmszAxL6Zf06pXtKzc.svg',
    BRAND_COLOR: '#e8e6ff',
    BRAND_SECONDARY_COLOR: '#28204A',
    n: 'NEYNAR',
    t: 20,
    d: "Fetches followers for a given Farcaster username using Neynar's API.",
    a: 'Retrieves followers of a Farcaster user, with support for sorting, pagination, and optional viewer context.',
    p: [
      {
        name: 'username',
        detail: 'The Farcaster username whose followers should be fetched.',
        example: `"miroyato"`,
        require: 'm',
        type: 'number'
      }
    ]
  },

  // {
  //   n: "FLVURL",
  //   t: 20,
  //   d: "Query the prices of one or more coins by using their unique Coin API IDs, symbols, or names.",
  //   a: "Query the prices of one or more coins by using their unique Coin API IDs, symbols, or names.",
  //   p: [
  //     {
  //       name: "token",
  //       detail:
  //         "coins' IDs, comma-separated if querying more than 1 coin.",
  //       example: `"bitcoin"`,
  //       require: "m",
  //     },
  //     {
  //       name: "vs_currency",
  //       detail: "target currency of coins, comma-separated if querying more than 1 currency",
  //       example: `"usd"`,
  //       require: "m",
  //     },
  //   ],
  // },

  // {
  //   API_KEY: SERVICE_API_KEY.Etherscan,
  //   LOGO: "https://www.pendle.finance/uploads/wp-content/uploads/2021/12/cropped-Pendle-Logo-quite-small.png",
  //   BRAND_COLOR: "#eafffb",
  //   BRAND_SECONDARY_COLOR: "#47e2c2",
  //   n: "PENDLE",
  //   t: 20,
  //   d: "Returns blockchain transaction history for the given address",
  //   a: "Retrieves blockchain data for a given chain and address from Etherscan, including txns, token/nft transfers, and gas metrics.",
  //   p: [
  //     {
  //       name: "type",
  //       detail: "The type of data to retrieve. Can be 'all-txns', 'token-txns', 'nft-txns', or 'gas'.",
  //       example: `"all-txns"`,
  //       require: "m",
  //       type: "string"
  //     },
  //     {
  //       name: "chain",
  //       detail: "The chain name (e.g. 'ethereum', 'base', 'gnosis').",
  //       example: `"ethereum"`,
  //       require: "m",
  //       type: "string"
  //     },
  //     {
  //       name: "address",
  //       detail: "Wallet address to query",
  //       example: `"0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC"`,
  //       require: "o",
  //       type: "string"
  //     },
  //     {
  //       name: "startDate",
  //       detail: "Used to filter block range.",
  //       example: `"01/01/2024"`,
  //       require: "o",
  //       type: "string"
  //     },
  //     {
  //       name: "endDate",
  //       detail: "Used to filter block range.",
  //       example: `"01/07/2025"`,
  //       require: "o",
  //       type: "string"
  //     }
  //   ]
  // },

  // {
  //   API_KEY: SERVICE_API_KEY.Etherscan,
  //   LOGO: "https://cdn.prod.website-files.com/6760e87b474d412dfa9a7a68/6760e8ebe8faad5fb985c89a_Frame%201321316795.png",
  //   BRAND_COLOR: "#f6f4ff",
  //   BRAND_SECONDARY_COLOR: "#684ff8",
  //   n: "ARTEMIS",
  //   t: 20,
  //   d: "Returns blockchain transaction history for the given address",
  //   a: "Retrieves blockchain data for a given chain and address from Etherscan, including txns, token/nft transfers, and gas metrics.",
  //   p: [
  //     {
  //       name: "type",
  //       detail: "The type of data to retrieve. Can be 'all-txns', 'token-txns', 'nft-txns', or 'gas'.",
  //       example: `"all-txns"`,
  //       require: "m",
  //       type: "string"
  //     },
  //     {
  //       name: "chain",
  //       detail: "The chain name (e.g. 'ethereum', 'base', 'gnosis').",
  //       example: `"ethereum"`,
  //       require: "m",
  //       type: "string"
  //     },
  //     {
  //       name: "address",
  //       detail: "Wallet address to query",
  //       example: `"0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC"`,
  //       require: "o",
  //       type: "string"
  //     },
  //     {
  //       name: "startDate",
  //       detail: "Used to filter block range.",
  //       example: `"01/01/2024"`,
  //       require: "o",
  //       type: "string"
  //     },
  //     {
  //       name: "endDate",
  //       detail: "Used to filter block range.",
  //       example: `"01/07/2025"`,
  //       require: "o",
  //       type: "string"
  //     }
  //   ]
  // },
  // {
  //   API_KEY: SERVICE_API_KEY.GnosisPay,
  //   LOGO: "https://gnosisscan.io/assets/generic/html/favicon-light.ico",
  //   BRAND_COLOR: "#f6f7f6",
  //   BRAND_SECONDARY_COLOR: "#133629",
  //   n: "GNOSISPAY",
  //   t: 20,
  //   d: "Fetches Gnosis Pay card transaction history, including merchant, amount, and currency info.",
  //   a: "Retrieves card transactions from Gnosis Pay’s API for a specific card ID, filtered by date range and paginated via limit/offset.",
  //   p: [
  //     {
  //       name: "cardId",
  //       detail: "The Gnosis Pay card ID to fetch transactions for.",
  //       example: `"card_9f8f8b3a56"`,
  //       require: "m",
  //       type: "string"
  //     },
  //     {
  //       name: "startDate",
  //       detail: "Filters transactions created after this date.",
  //       example: `"01/01/2024"`,
  //       require: "o",
  //       type: "string"
  //     },
  //     {
  //       name: "endDate",
  //       detail: "Filters transactions created before this date.",
  //       example: `"01/07/2025"`,
  //       require: "o",
  //       type: "string"
  //     },
  //     {
  //       name: "limit",
  //       detail: "Number of transactions to return per page.",
  //       example: `"20"`,
  //       require: "o",
  //       type: "number"
  //     },
  //     {
  //       name: "offset",
  //       detail: "Offset for pagination (i.e., how many records to skip).",
  //       example: `"0"`,
  //       require: "o",
  //       type: "number"
  //     }
  //   ]
  // },
  // {
  //   API_KEY: SERVICE_API_KEY.Etherscan,
  //   LOGO: "https://www.tally.xyz/favicon.ico",
  //   BRAND_COLOR: "#f9f8ff",
  //   BRAND_SECONDARY_COLOR: "#725bff",
  //   n: "TALLY",
  //   t: 20,
  //   d: "Returns blockchain transaction history for the given address",
  //   a: "Retrieves blockchain data for a given chain and address from Etherscan, including txns, token/nft transfers, and gas metrics.",
  //   p: [
  //     {
  //       name: "type",
  //       detail: "The type of data to retrieve. Can be 'all-txns', 'token-txns', 'nft-txns', or 'gas'.",
  //       example: `"all-txns"`,
  //       require: "m",
  //       type: "string"
  //     },
  //     {
  //       name: "chain",
  //       detail: "The chain name (e.g. 'ethereum', 'base', 'gnosis').",
  //       example: `"ethereum"`,
  //       require: "m",
  //       type: "string"
  //     },
  //     {
  //       name: "address",
  //       detail: "Wallet address to query",
  //       example: `"0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC"`,
  //       require: "o",
  //       type: "string"
  //     },
  //     {
  //       name: "startDate",
  //       detail: "Used to filter block range.",
  //       example: `"01/01/2024"`,
  //       require: "o",
  //       type: "string"
  //     },
  //     {
  //       name: "endDate",
  //       detail: "Used to filter block range.",
  //       example: `"01/07/2025"`,
  //       require: "o",
  //       type: "string"
  //     }
  //   ]
  // },

  {
    LOGO: 'https://raw.githubusercontent.com/mritunjayz/github-storage/refs/heads/main/ploymarket.png',
    n: 'POLYMARKET',
    t: 20,
    d: 'Query prediction market positions, shares, and odds for future event outcomes on Polymarket. (Comming soon)',
    a: 'Query prediction market positions, shares, and odds for future event outcomes on Polymarket. (Comming soon)',
    p: []
  },
  {
    LOGO: 'https://raw.githubusercontent.com/mritunjayz/github-storage/refs/heads/main/privacy.png',
    n: 'PRIVACYPOOL',
    t: 20,
    d: 'Access deposit/withdraw stats and compliance-safe anonymized transfers using zk-based Privacy Pools. (Comming soon)',
    a: 'Access deposit/withdraw stats and compliance-safe anonymized transfers using zk-based Privacy Pools. (Comming soon)',
    p: []
  },
  {
    LOGO: 'https://raw.githubusercontent.com/mritunjayz/github-storage/refs/heads/main/rotki.png',
    n: 'ROTKI',
    t: 20,
    d: 'Pull portfolio, asset, and tax-related data from Rotki for crypto accounting and reporting. (Comming soon)',
    a: 'Pull portfolio, asset, and tax-related data from Rotki for crypto accounting and reporting. (Comming soon)',
    p: []
  },
  {
    LOGO: 'https://raw.githubusercontent.com/mritunjayz/github-storage/refs/heads/main/meerkat.png',
    n: 'MEERKAT',
    t: 20,
    d: 'Query onchain proofs for tickets, attendance, speaker roles, and reactions. (Comming soon)',
    a: 'Query onchain proofs for tickets, attendance, speaker roles, and reactions. (Comming soon)',
    p: []
  },
  {
    LOGO: 'https://raw.githubusercontent.com/mritunjayz/github-storage/refs/heads/main/artemis.png',
    n: 'ARTEMIS',
    t: 20,
    d: 'Query onchain financial metrics, developer activity, and market insights across protocols and sectors. (Comming soon)',
    a: 'Query onchain financial metrics, developer activity, and market insights across protocols and sectors. (Comming soon)',
    p: []
  },
  {
    LOGO: 'https://www.tally.xyz/favicon.ico',
    n: 'TALLY',
    t: 20,
    d: 'Track token launches, governance participation, staking activity, and contract usage. (Comming soon)',
    a: 'Track token launches, governance participation, staking activity, and contract usage. (Comming soon)',
    p: []
  },
  {
    LOGO: 'https://raw.githubusercontent.com/mritunjayz/github-storage/refs/heads/main/MYANIMELIST.png',
    n: 'MYANIMELIST',
    t: 20,
    d: 'Kawaiii, comming soon. Hello Keith! (Comming soon)',
    a: 'Kawaiii, comming soon. Hello Keith! (Comming soon)',
    p: []
  }
]

export * from './utils/constants'
