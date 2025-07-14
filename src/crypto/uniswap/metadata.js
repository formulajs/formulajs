export const UNISWAP_metadata = {
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
}
