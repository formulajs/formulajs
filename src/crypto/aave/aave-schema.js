import { z } from 'zod'

export const aaveParamsSchema = z.object({
  graphType: z.enum(['v2','v2-raw']),
  category:  z.enum(['tokens','markets']),
  param1:    z.string().nonempty(),
  param2:    z.string().optional(),
})