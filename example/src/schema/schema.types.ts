import { z } from 'zod';

import { schema } from './schema';
import { titles } from './schema.constants'

export type Schema = z.infer<typeof schema>;
export type Titles = typeof titles[number];

// Needed for empty select field -> empty fields won't validate successfully with regular Schema
export type SchemaWithEmptyValues = Omit<Schema, 'title'> & {
  title: Titles | '',
}
