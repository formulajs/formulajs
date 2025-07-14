import { SERVICES_API_KEY } from '../../utils/constants.js'
export const GNOSIS_metadata = {
  API_KEY: SERVICES_API_KEY.Gnosisscan,
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
      example: `1`,
      require: 'o',
      type: 'number'
    },
    {
      name: 'offset',
      detail: "Number of results per page (limit). Applies only to 'txns', 'token-txns', and 'nft-txns'.",
      example: `50`,
      require: 'o',
      type: 'number'
    }
  ]
}
