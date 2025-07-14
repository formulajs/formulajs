import { z } from 'zod'

const categories = ['protocols','yields','dex','fees']
export const defillamaParamsSchema = z.object({
  category: z.enum(categories)
})

export const CATEGORY_URLS = {
  protocols: 'https://api.llama.fi/protocols',
  yields:    'https://yields.llama.fi/pools',
  dex:       'https://api.llama.fi/overview/dexs?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true',
  fees:      'https://api.llama.fi/overview/fees?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true&dataType=dailyFees'
}