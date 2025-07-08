import { z } from 'zod'
import { MAX_PAGE_LIMIT } from '../utils/constants.js'

const farcasterSchema = z.object({
  platform:    z.literal('farcaster'),
  contentType: z.enum(['posts', 'replies', 'channels']),
  identifier:  z.string().nonempty(),
  start:       z.number().int().nonnegative().default(0),
  end:         z.number().int().nonnegative().max(MAX_PAGE_LIMIT, {message: `"end" must be less than or equal to ${MAX_PAGE_LIMIT}`}).default(10),
})

const lensSchema = z.object({
  platform:    z.literal('lens'),
  contentType: z.enum(['posts', 'replies']),
  identifier:  z.string().nonempty(),
  start:       z.number().int().nonnegative().default(0),
  end:         z.number().int().nonnegative().max(MAX_PAGE_LIMIT, {message: `"end" must be less than or equal to ${MAX_PAGE_LIMIT}`}).default(10),
})

export const fireflyParamsSchema = z.discriminatedUnion('platform', [
  farcasterSchema,
  lensSchema,
])
export const fireFlyPlaformType = {
    farcaster: {
      posts: 'farcasterid',
      replies: 'farcasterpostid',
      channels: 'farcasterchannels'
    },
    lens: {
      posts: 'lensid',
      replies: 'lenspostid'
    }
  }