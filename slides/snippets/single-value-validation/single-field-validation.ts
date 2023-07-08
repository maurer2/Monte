import z from 'zod';

const someString = z.string({
  invalid_type_error: 'Must be a string',
  required_error: 'Is required',
})
.trim()
.min(1, `Shouldn't be empty`)
.max(9, `Shouldn't be larger than 9 characters`)
.includes('test', {
  position: 1,
  message: `Must contain 'test' after first character`
})

console.log(JSON.stringify(someString.safeParse('surreptitious'), null, 2));
