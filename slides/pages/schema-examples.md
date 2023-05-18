---
layout: section
image: https://source.unsplash.com/collection/94734566/1920x1080
---

## Schema examples

---
layout: image-right
image: https://source.unsplash.com/collection/94734566/1920x1080
---

## Built in validators

Example using string

```ts
const someString = z
  .string({
    invalid_type_error: 'Must be a string',
    required_error: 'Is required',
  })
  .trim()
  .min(1, `Shouldn't be empty`)
  .max(9, `Shouldn't be larger than 9 characters`)
  .includes('test', {
    message: `Must contain 'test'`
  });
```

---
layout: image-right
image: https://source.unsplash.com/collection/94734566/1920x1080
---
## Custom validator

String shouldn't be a palindrome

```ts
const someString = z
   .string({
    invalid_type_error: 'Must be a string',
    required_error: 'Is required',
  })
  .trim()
  .min(1, `Shouldn't be empty`)
  // trim inside
  .transform((value: string): string =>
    value.replace(/\s/g, ''))
  // check palindrome
  .refine(
    (value: string): boolean => {
      return split('').reverse().join('')
        !== value;
    },
    {
      message: `Must not be a palindrome`,
    },
  );
```

---
layout: image-right
image: https://source.unsplash.com/collection/94734566/1920x1080
---
## Related field validator


```ts
// todo
```
