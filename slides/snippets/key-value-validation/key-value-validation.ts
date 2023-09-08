import z from 'zod';

const someComplexDataType = z.record(
  // key
  z.string().datetime({ message: 'Key must be a valid date string' }),
  // value
  z.object({
    id: z.string().uuid({ message: 'ID must be a valid UUID' }),
    ip: z.string().ip({ version: 'v4', message: 'IP must be a valid IP v4 address' }),
  })
  .strict()
);

console.log(JSON.stringify(someComplexDataType.safeParse({
  '2023-09-08T00:38:44.706Z': {
    id: '222c29d4-9a34-4ea8-af80-8bcc0d0e1360',
    ip: '192.168.1.1',
  }
}), null, 2));
