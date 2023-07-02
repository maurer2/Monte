/* eslint-disable max-len, comma-style, function-paren-newline, @typescript-eslint/indent */
import { z } from 'zod';

// might get removed: https://github.com/colinhacks/zod/issues/2106
export const responseSchema = z.discriminatedUnion('status', [
  z.object({
    status: z.literal('success'),
    data: z.object({
      message: z.string(),
    })
  }),
  z.object({
    status: z.literal('error'),
    data: z.object({
      message: z.string(),
      issues: z.unknown().optional(),
    })
  }),
]);
