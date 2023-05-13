import { z } from 'zod';

import { schema } from './schema';
import { titles } from './schema.constants'

export type Schema = z.infer<typeof schema>;
export type Titles = typeof titles[number];
