
import { z } from 'zod'
import { MAX_PAGE_LIMIT } from '../../utils/constants.js'
import { dateOrTimestamp } from '../../utils/zod-helper.js'


const gasSchema = z.object({
  type:    z.literal('gas'),
  startDate: dateOrTimestamp.optional(),
  endDate:   dateOrTimestamp.optional(),
  page:      z.number().int().nonnegative().default(1),
  limit:     z.number().int().nonnegative().max(MAX_PAGE_LIMIT, {message: `"limit" must be less than or equal to ${MAX_PAGE_LIMIT}`}).default(10),
})

const txnSchema = z.object({
  type:      z.enum(['all-txns', 'token-txns', 'nft-txns']),
  address:   z.string().nonempty(),
  startDate: dateOrTimestamp.optional(),
  endDate:   dateOrTimestamp.optional(),
  page:      z.number().int().nonnegative().default(1),
  limit:     z.number().int().nonnegative().max(MAX_PAGE_LIMIT, {message: `"limit" must be less than or equal to ${MAX_PAGE_LIMIT}`}).default(10),
})

export const baseParamsSchema = z.discriminatedUnion('type', [gasSchema, txnSchema])