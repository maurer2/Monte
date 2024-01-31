import z from 'zod';

const someObjectSchema = z.object({
  testString: z.string(),
  testNumber: z.number(),
})

type SomeObject = z.infer<typeof someObjectSchema>; // nonOptionalKey gets marked as optional

console.log(JSON.stringify(someObjectSchema.safeParse({
  testString: 'test',
  testNumber: 1,
}), null, 2));

function testFunction1(testString: unknown, testNumber: unknown) {
  const looselyTypedObject = {
    testString,
    testNumber
  }
  // type = {
  //   testString: unknown;
  //   testNumber: unknown;
  // }

  try {
    const properlyTypedObject = someObjectSchema.parse(looselyTypedObject);

    // type = {
    //   testString: string;
    //   testNumber: number;
    // }
  } catch (error) {
    throw new Error(error?.message)
  }
}

testFunction1('test', 1)

function testFunction2(testString: unknown, testNumber: unknown) {
  const looselyTypedObject = {
    testString,
    testNumber
  }
  // type = {
  //   testString: unknown;
  //   testNumber: unknown;
  // }

  const parseResult = someObjectSchema.safeParse(looselyTypedObject);

  if (!parseResult.success) {
    // parseResult.data is undefined here
    throw new Error(parseResult.error.message)
  }

  // type = {
  //   testString: string;
  //   testNumber: number;
  // }

  console.log(parseResult.data)
}

testFunction2('test', 1)

