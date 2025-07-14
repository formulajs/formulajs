import { SERVICES_API_KEY } from '../../utils/constants.js'
export const COINGECKO_metadata = {
  LOGO: 'https://files.readme.io/06394e687778e238a6cd43de6e1d7d339043aa50054703f64606369352ef1864-VariantCG-Symbol-Color.png',
  BRAND_COLOR: '#f8fdf8',
  BRAND_SECONDARY_COLOR: '#4bc63d',
  n: 'COINGECKO',
  t: 20,
  API_KEY: SERVICES_API_KEY.Coingecko,
  d: 'Query crypto prices, ecosystem market data, stablecoins, or derivatives from CoinGecko.',
  a: 'Supports querying: "price" for specific tokens "market" for ecosystem categories (ETH, BASE, SOL, GNOSIS, HYPERLIQUID, BITCOIN, PUMP)\n- "stablecoins" for stablecoin categories like "crypto-backed-stablecoin"\n- "derivatives" globally or per exchange.\nPagination is supported for all except single-exchange derivatives.',
  p: [
    {
      name: 'category',
      detail: 'Query type: "price", "market", "stablecoins", or "derivatives".',
      example: `"stablecoins"`,
      require: 'm'
    },
    {
      name: 'param1',
      detail: `If "price" then - eg. "BTC", "ETH", OR any token on coingecko\nIf "market": one of "all", "base", "meme", "aiagents", "bitcoin", "ethereum", "hyperliquid", "pump", "solana".\nIf "stablecoins": one of "all", "yield-bearing-stablecoins", "crypto-backed-stablecoin".\nIf "derivatives": exchange name (e.g., "binance_futures", "hyperliquid", "weex-futures", "bybit" ).`,
      example: `"yield-bearing-stablecoins"`,
      require: 'm'
    },
    {
      name: 'param2',
      detail: `If "market" and "stablecoins" then eg. "1h", "24h", "7d", "14d", "30d", "200d", "1y".`,
      example: `"1h,24h,7d"`,
      require: 'o'
    }
  ]
}
