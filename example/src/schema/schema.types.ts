import type { z } from 'zod';

import type { schema } from './schema';
import type { titles } from './schema.constants';

export type Schema = z.infer<typeof schema>;
export type Titles = typeof titles[number];
