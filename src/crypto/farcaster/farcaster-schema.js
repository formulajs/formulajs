import { z } from 'zod'
import { MAX_PAGE_LIMIT } from '../../utils/constants.js'



export const farcasterParamsSchema = z.object({
  contentType: z.enum(['posts', 'replies', 'channels']),
  identifier:  z.string().nonempty(),
  start:       z.number().int().nonnegative().default(0),
  end:         z.number().int().nonnegative().max(MAX_PAGE_LIMIT, {message: `"end" must be less than or equal to ${MAX_PAGE_LIMIT}`}).default(10),
})
