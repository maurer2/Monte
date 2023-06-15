import type { z } from 'zod';

import type { schema } from './schema';
import type { titles, daysOfWorkWeek } from './schema.constants';

export type Titles = typeof titles[number];
export type DaysOfWorkWeek = typeof daysOfWorkWeek[number];

export type Schema = z.infer<typeof schema>;
