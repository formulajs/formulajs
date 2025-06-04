export const SERVICE_API_KEY = {
  Etherscan: "ETHERSCAN_API_KEY",
  Coingecko: "COINGECKO_API_KEY"
}

export const FUNCTION_LOCALE = [
  {
    API_KEY: SERVICE_API_KEY.Etherscan,
    n: "GETTXLIST",
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
    n: "GETPRICE",
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
  }
]