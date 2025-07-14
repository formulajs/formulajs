 export   const CHAIN_ID_MAP = {
    ethereum: 1,
    gnosis: 100,
    base: 8453,
  };

  export const BLOCKSCOUT_CHAINS_MAP = {
  ethereum: 'https://eth.blockscout.com',
  gnosis: 'https://gnosis.blockscout.com',
  arbitrum: 'https://arbitrum.blockscout.com',
  optimism: 'https://optimism.blockscout.com',
  soneium: 'https://soneium.blockscout.com',
  unichain: 'https://unichain.blockscout.com'
}

export const SAFE_CHAIN_MAP = {
  ethereum: 'eth',
  gnosis: 'gno',
};

export const ERROR_MESSAGES_FLAG = {
  INVALID_API_KEY: 'INVALID_API_KEY',
  RATE_LIMIT: 'RATE_LIMIT',
  DEFAULT: 'DEFAULT',
  MISSING_KEY: 'MISSING_KEY',
  INVALID_PARAM: 'INVALID_PARAM',
  NETWORK_ERROR: 'NETWORK_ERROR',
  ENS: 'ENS',
}

export const UTILITY = {
  ALCHEMY_API_KEY: 'ALCHEMY_API_KEY'
}
export const MAX_PAGE_LIMIT = 250

export const SERVICES_API_KEY = {
  Etherscan: 'Etherscan',
  Coingecko: 'Coingecko',
  Safe: 'Safe',
  Basescan: 'Basescan',
  Gnosisscan: 'Gnosisscan',
  Firefly: 'Firefly',
  GnosisPay: 'GnosisPay',
  Neynar: 'Neynar',
  Defillama: 'Defillama'
}