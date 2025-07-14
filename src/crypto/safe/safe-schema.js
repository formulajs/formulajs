import { z } from 'zod'
import { MAX_PAGE_LIMIT } from '../../utils/constants.js'

export const safeParamsSchema = z.object({
  address: z.string().nonempty(),
  utility: z.literal('txns'),
  chain:   z.enum(['ethereum','gnosis']),
  limit:   z.number().int().nonnegative().max(MAX_PAGE_LIMIT, {message: `"limit" must be less than or equal to ${MAX_PAGE_LIMIT}`}).default(10),
  offset:  z.number().int().nonnegative().default(0),
})