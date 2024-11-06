import z, { ZodError } from 'zod';

const getStringOrStringsAsStringList = z
  .function()
  .args(z.string().or(z.array(z.string()).min(1)))
  .returns(z.array(z.string()))
  .implement((stringOrStrings) => {
    if (typeof stringOrStrings === 'string') {
      return [stringOrStrings];
    }

    return stringOrStrings;
  });

const values1 = getStringOrStringsAsStringList('meow');
const values2 = getStringOrStringsAsStringList(['meow']);
// const values3 = getStringOrStringsAsStringList(true); // error ts

console.log(values1);
console.log(values2);
try {
  const values4 = getStringOrStringsAsStringList([]); // error zod
} catch (error) {
  if (error instanceof ZodError) {
    console.log(error.message);
  } else {
    console.log('Error');
  }
}

const validatorFunctionSchema = z
  .function()
  .args(
    z.object({
      validatorName: z.string().optional(),
      inputValue: z.number().positive(),
    }),
  )
  .returns(
    z.object({
      isValid: z.boolean(),
    }),
  );
type ValidatorFunctionSchema = z.input<typeof validatorFunctionSchema>;

const isDivisibleByFiveWithInputValidator = validatorFunctionSchema.implement((input) => {
  return {
    isValid: input.inputValue % 5 === 0,
  };
});

const result1a = isDivisibleByFiveWithInputValidator({
  inputValue: 5,
});
const result1b = isDivisibleByFiveWithInputValidator({
  inputValue: 9,
});

console.log(result1a);
console.log(result1b);
// const result1bc= isDivisibleByFiveWithInputValidator({
//   inputValue: 5n, // error ts
// });
try {
  const result1d = isDivisibleByFiveWithInputValidator({
    inputValue: -5, // error zod
  });
} catch (error) {
  if (error instanceof ZodError) {
    console.log(error.message);
  } else {
    console.log('Error');
  }
}
