import z from 'zod';

const someComplexDataType = z.object({
  numberOfEntries: z.number({
    invalid_type_error: 'Must be a number',
    required_error: 'Is required',
  }).int('Must be an integer').positive('Must be a positive number'),
  entries: z.array(
    z.string({
      invalid_type_error: 'Must be a string',
      required_error: 'Is required',
    }).min(1, 'Must not be empty')
  ),
})
.strict()
.refine(
  ({ numberOfEntries, entries }) => entries.length === numberOfEntries,
  ({ numberOfEntries }) => ({
    message: `entries must contain ${numberOfEntries} values`,
    path: ['entries'],
  })
);

console.log(JSON.stringify(someComplexDataType.safeParse({
  numberOfEntries: 3,
  entries: [
    'test value 1',
    '',
  ]
}), null, 2));
