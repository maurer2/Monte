import z from 'zod';

const someNumberOrArray = z.union([
  z.number({
    invalid_type_error: 'Must be a number',
    required_error: 'Is required',
  }).positive('Must be positive'),
  z.array(
    z.number().positive('Must be positive')
  ).nonempty('Must not be empty'),
]);

const someNumberOrArrayAlternative = z.number({
  invalid_type_error: 'Must be a number',
  required_error: 'Is required',
}).positive('Must be positive')
.or(z.array(
  z.number().positive('Must be positive')
).nonempty('Must not be empty'));

console.log(JSON.stringify(someNumberOrArray.safeParse([1, -1]), null, 2));
console.log(JSON.stringify(someNumberOrArrayAlternative.safeParse([1, -1]), null, 2));
