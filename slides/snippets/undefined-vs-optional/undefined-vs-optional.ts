// https://github.com/colinhacks/zod/issues/2464
import z from 'zod';

const test = z.object({
  nonOptionalKey: z.string().or(z.undefined()),
});
type Test = z.infer<typeof test>; // nonOptionalKey gets marked as optional

const test1 = z.object({
  nonOptionalKey: z.union([z.string(), z.undefined()]), // nonOptionalKey gets marked as optional
});
type Test1 = z.infer<typeof test1>

type Test2 = {
  nonOptionalKey: string | undefined
}

// Test
console.log(JSON.stringify(test.safeParse({
  nonOptionalKey: undefined
} satisfies Test), null, 2));

console.log(JSON.stringify(test.safeParse({} satisfies Test), null, 2));

// Test2
console.log(JSON.stringify(test.safeParse({
  nonOptionalKey: undefined
} satisfies Test2), null, 2));

// @ts-expect-error
console.log(JSON.stringify(test.safeParse({} satisfies Test2), null, 2));
