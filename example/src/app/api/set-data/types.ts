import type { z } from 'zod';
import type { responseSchema } from './schema';

export type ResponseTypes = z.infer<typeof responseSchema>;

// extract unnamed union type members to named types for improved readability
export type SuccessResponse = Extract<ResponseTypes, { status: 'success' }>;
export type ErrorResponse = Extract<ResponseTypes, { status: 'error' }>;

type Test = Extract<ResponseTypes, { status: 'meouw' }>; // no error, but returns never
