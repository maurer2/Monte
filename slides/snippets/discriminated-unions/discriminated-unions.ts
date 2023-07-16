import z from 'zod';

export const someSuccessOrFailObject = z.discriminatedUnion('status', [
  z.object({
    status: z.literal('success'),
    data: z.object({
      message: z.string().optional(),
    })
  }),
  z.object({
    status: z.literal('fail'),
    data: z.object({
      errorCode: z.union([
        z.number().int().nonnegative(), // not the same as .positive()
        z.string().nonempty(),
      ]),
      message: z.string().nonempty(),
    })
  }),
]);

console.log(JSON.stringify(someSuccessOrFailObject.safeParse({
  status: 'success',
  data: {
    message: 'OK',
  }
}), null, 2));
