import { SERVICES_API_KEY } from '../../utils/constants.js'
export const BASE_metadata = {
  API_KEY: SERVICES_API_KEY.Basescan,
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
}
