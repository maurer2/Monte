import z from 'zod';

const someComplexDataType = z.object({
  numberOfEntries: z.number({
    invalid_type_error: 'Must be a number',
    required_error: 'Is required',
  }).int('Must be an integer'), // .positive('Must be a positive number'),
  entries: z.array(
    z.string({
      invalid_type_error: 'Must be a string',
      required_error: 'Is required',
    }).min(1, 'Must not be empty')
  ).max(10, 'Must not contain more than 10 entries'),
  urls: z.record(
    z.string({
      invalid_type_error: 'Must be a string',
      required_error: 'Is required',
    }).url('Invalid URL'),
    z.boolean({
      invalid_type_error: 'Must be a boolean',
      required_error: 'Is required',
    }).default(true)
  ).optional(),
  role: z.union([
    z.literal('User'),
    // z.literal('Editor'),
    z.literal('Admin'),
  ]),
  timestamp: z.date(),
})
.strict();

type SomeComplexDataType = z.infer<typeof someComplexDataType>;
// interface SomeComplexDataType2 = z.infer<typeof someComplexDataType>;
