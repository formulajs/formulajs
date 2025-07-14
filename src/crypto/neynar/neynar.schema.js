import { z } from 'zod'


export     const neynarParamsSchema = z.object({
      username: z.string().nonempty()
    })