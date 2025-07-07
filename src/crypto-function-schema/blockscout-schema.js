import { z } from 'zod'
import { MAX_PAGE_LIMIT } from '../utils/constants.js'
import { dateOrTimestamp } from '../utils/zod-helper.js'


export const blockscoutParamsSchema = z.object({
  address:        z.string().nonempty(),
  type:           z.enum(['stat', 'txns', 'tokens']),
  chain:          z.enum(['ethereum', 'gnosis', 'arbitrum', 'optimism', 'soneium', 'unichain']).default('ethereum'),
  startTimestamp: dateOrTimestamp.optional(),
  endTimestamp:  dateOrTimestamp.optional(),
  page:           z.number().int().nonnegative().default(1),
  offset:         z.number().int().nonnegative().max(MAX_PAGE_LIMIT, {message: `"offset" must be less than or equal to ${MAX_PAGE_LIMIT}`}).default(10),
})