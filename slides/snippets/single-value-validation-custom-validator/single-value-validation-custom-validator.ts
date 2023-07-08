import z from 'zod';

const someString = z.string({
  invalid_type_error: 'Must be a string',
  required_error: 'Is required',
})
.trim()
.toLowerCase()
.min(1, `Shouldn't be empty`)
.transform((value: string): string =>
  value.replace(/\s/g, ''))
.refine(
  (value: string): boolean => {
    if (value.length === 1) {
      return true;
    }
    return value
      .split('')
      .reverse()
      .join('')
      !== value;
  },
  {
    message: `Must not be a palindrome`,
  },
);

console.log(JSON.stringify(someString.safeParse('TacoCat'), null, 2));
