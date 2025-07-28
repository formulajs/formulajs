import { z } from 'zod';

export const smartContractSchema = z
  .array(z.any())
  .refine(
    (args) => args.length >= 2 && typeof args[0] === 'string' && typeof args[1] === 'string',
    {
      message: 'First two arguments must be strings: contractName and functionName',
    }
  );