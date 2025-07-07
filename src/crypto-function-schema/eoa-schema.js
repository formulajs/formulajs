
import { MAX_PAGE_LIMIT } from "../crypto-constants.js"
import { dateOrTimestamp } from "../utils/zod-helper.js"
import { z } from 'zod'

const baseSchema = z.object({
  addresses: z.string().nonempty(),
  category:  z.enum(['balance','txns']),
  chains:    z.preprocess(
    (val) => typeof val === 'string'
      ? val.split(',').map(s => s.trim()).filter(Boolean)
      : val,
    z.array(
      z.enum(['ethereum','gnosis','base'])
    ).nonempty()
  ),
  startTime: dateOrTimestamp.optional(),
  endTime:   dateOrTimestamp.optional(),
  page:      z.number().int().nonnegative().default(1),
  offset:    z.number().int().nonnegative().max(MAX_PAGE_LIMIT, {message: `"offset" must be less than or equal to ${MAX_PAGE_LIMIT}`}).default(10),
})

export const eoaParamsSchema = z.preprocess(
  (val) => {
    const obj = { ...(val || {}) }
    // if balance, ignore startTime/endTime
    if (obj.category === 'balance') {
      delete obj.startTime
      delete obj.endTime
    }
    return obj
  },
  baseSchema.refine(data => {
    // for txns, startTime and endTime are required
    if (data.category === 'txns') {
      return data.startTime !== undefined && data.endTime !== undefined
    }
    return true
  }, {
    message: 'startTime and endTime required for txns',
    path: ['startTime'],
  })
)