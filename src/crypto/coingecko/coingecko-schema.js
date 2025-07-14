import { z } from 'zod'

const allowedValues = ['1h', '24h', '7d', '14d', '30d', '200d', '1y'];
const param2Schema = z
  .string()
  .refine((val) => {
    const tokens = val.split(',').map((t) => t.trim().toLowerCase());
    return tokens.some((token) =>
      allowedValues.some((allowed) => token.includes(allowed))
    );
  }, {
    message: "param2 must contain at least one of: '1h', '24h', '7d', '14d', '30d', '200d', '1y'",
  }).optional()
const priceSchema = z.object({
  category: z.literal('price'),
  param1:   z.string().nonempty(),
  param2:   z.string().nonempty().optional(),
})
const marketEcosystems = ['all','base','meme','aiagents','bitcoin','ethereum','hyperliquid','pump','solana']
const marketSchema = z.object({
  category: z.literal('market'),
  param1:   z.enum(marketEcosystems),
  param2:   param2Schema,
})
const stablecoinsTypes = ['all','yield-bearing-stablecoins','crypto-backed-stablecoin']
const stablecoinsSchema = z.object({
  category: z.literal('stablecoins'),
  param1:   z.enum(stablecoinsTypes),
  param2:   param2Schema,
})
const derivativesSchema = z.object({
  category: z.literal('derivatives'),
  param1:   z.string().nonempty(),
  param2:   z.any().optional(),
})
export const coingeckoParamsSchema = z.discriminatedUnion('category', [
  priceSchema,
  marketSchema,
  stablecoinsSchema,
  derivativesSchema,
])