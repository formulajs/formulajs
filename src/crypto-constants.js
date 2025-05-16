export const SERVICE_API_KEY = {
    Etherscan: "ETHERSCAN_API_KEY"
}

export const FUNCTION_LOCALE = [
    {
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
            name: "value2",
            detail: "Page number.",
            example: "1",
            require: "o",
            repeat: "n",
            type: "rangenumber",
          },
          {
            name: "value3",
            detail: "Page size(offset).",
            example: "100",
            require: "o",
            repeat: "n",
            type: "rangenumber",
          },
        ],
      }
]