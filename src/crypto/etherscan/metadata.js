import { SERVICES_API_KEY } from '../../utils/constants.js'
export const ETHERSCAN_metadata = {
  API_KEY: SERVICES_API_KEY.Etherscan,
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
      require: 'm',
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
}
