export const SERVICE_API_KEY = {
  Etherscan: "ETHERSCAN_API_KEY",
  Coingecko: "COINGECKO_API_KEY",
}

export const FUNCTION_LOCALE = [
  {
    API_KEY: SERVICE_API_KEY.Etherscan,
    LOGO: "https://raw.githubusercontent.com/mritunjayz/github-storage/refs/heads/main/1689874988430.jpeg",
    BRAND_COLOR: "#F6F7F8",
    BRAND_SECONDARY_COLOR: "#21325B",
    n: "ETHERSCAN",
    t: 20,
    d: "Returns the list of transactions performed by an address, with optional pagination.",
    a: "Returns the list of transactions performed by an address, with optional pagination.",
    p: [
      {
        name: "value1",
        detail:
          "The address string representing the addresses to check for balance",
        example: `"0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC"`,
        require: "m",
      },
      {
        name: "page",
        detail: "Page number.",
        example: "1",
        require: "o",
        repeat: "n",
        type: "rangenumber",
      },
      {
        name: "size",
        detail: "Page size(offset).",
        example: "100",
        require: "o",
        repeat: "n",
        type: "rangenumber",
      },
    ],
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
      name: "address",
      detail: "The address to query, in hexadecimal format.",
      example: `"0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC"`,
      require: "m",
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
    n: "GETPRICE",
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
]