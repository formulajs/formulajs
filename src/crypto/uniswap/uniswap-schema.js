import { z } from 'zod'

export const uniswapParamsSchema = z.object({
  graphType: z.enum(['v3','v3-raw']),
  category:  z.enum(['tokens','markets']),
  param1:    z.string().nonempty(),
  param2:    z.string().optional(),
})