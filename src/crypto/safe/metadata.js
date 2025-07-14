import { SERVICES_API_KEY } from '../../utils/constants.js'
export const SAFE_metadata = {
  API_KEY: SERVICES_API_KEY.Safe,
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
}
