
export const AAVE_metadata = {
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
      name: 'param1',
      detail: 'Token Contract Address for market category or Token symbol',
      example: `"USDT"`,
      require: 'm',
      type: 'string'
    }
  ]
}
