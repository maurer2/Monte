---
layout: section
image: https://source.unsplash.com/collection/94734566/1920x1080
---

## Validation

---
layout: two-cols-header
layoutClass: gap-4 grid-cols-2 auto-rows-min
image: https://source.unsplash.com/collection/94734566/1920x1080
---

### Validate single fields with single types

::left::

Schema

```ts
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

console.log(someString.safeParse('surreptitious'));
```

::right::

Output

```json
{
  "success": false,
  "error": {
    "issues": [
      {
        "code": "too_big",
        "maximum": 9,
        "type": "string",
        "inclusive": true,
        "exact": false,
        "message": "Shouldn't be larger than
          9 characters",
      },
      {
        "code": "invalid_string",
        "validation": {
          "includes": "test",
          "position": 1
        },
        "message": "Must contain 'test' after
          first character",
      }
    ],
  }
}
```

---
layout: two-cols-header
layoutClass: gap-4 grid-cols-2 auto-rows-min
image: https://source.unsplash.com/collection/94734566/1920x1080
---

### Validate single fields with custom validation logic

::left::

Zod uses `refine` to apply custom validation logic to a field, for validation logic that can't be handled by the built-in validators.

```ts
const someString = z.string({
    invalid_type_error: 'Must be a string',
    required_error: 'Is required',
  })
  .trim()
  .toLowerCase()
  .min(1, `Shouldn't be empty`)
  .transform((value: string): string => value.replace(/\s/g, ''))
  .refine((value: string): boolean => {
      if (value.length === 1) return true;
      return value.split('').reverse().join('') !== value;
    },
    {
      message: `Must not be a palindrome`,
    },
);

console.log(someString.safeParse('TacoCat'), null, 2);
```

::right::

Output

```json
{
  "success": false,
  "error": {
    "issues": [
      {
        "code": "custom",
        "message": "Must not be a palindrome",
        "path": []
      }
    ],
    "name": "ZodError"
  }
}
```

---
layout: two-cols-header
layoutClass: gap-4 grid-cols-2 auto-rows-min
image: https://source.unsplash.com/collection/94734566/1920x1080
---

### Validate single fields with multiple types

::left::

Schema

```ts
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

console.log(someNumberOrArray.safeParse([1, -1]));
```

::right::

Output

```json
{
  "success": false,
  "error": {
    "issues": [
      {
        "code": "too_small",
        "minimum": 1,
        "type": "array",
        "inclusive": true,
        "exact": false,
        "message": "Must not be empty",
        "path": []
      }
    ],
    "name": "ZodError"
  }
}
```


---
layout: image-right
image: https://source.unsplash.com/collection/94734566/1920x1080
---

### Supported types - The usual ones

* string (`email`, `url`, `uuid`, `regex`, `includes`, `startsWith`, `endsWith`, `dateString` etc.)
* number (`integer`, `float`, `positive`, `negative`, `multipleOf` etc.)
* boolean
* object
* array (`min`, `max`, `length`, `nonempty`)
* undefined
* null
* date (`min`, `max`)
* bigInt

---
layout: image-right
image: https://source.unsplash.com/collection/94734566/1920x1080
---

### Example - String validation with default validators

Each built-in data type comes with a range of supported validators out of the box.
In this example `someString` must be defined, e.g. can't be optional or empty,
must be of type string with a length of 1 to 10.
Additionally `someString` must not contain the word "test".

```ts
const someString = z.string({
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

### Example - Validation of related fields

```ts
// todo
```

---
layout: image-right
image: https://source.unsplash.com/collection/94734566/1920x1080
---

## Supported types - The unusual ones

* Enums
* Union types
* Discriminated union types
* Tuples

---
layout: image-right
image: https://source.unsplash.com/collection/94734566/1920x1080
---

### Example - Discriminated union types

```ts
// todo
```

---
layout: image-right
image: https://source.unsplash.com/collection/94734566/1920x1080
---

### Common pain points

* Using `refine` on a schema wraps it in a `ZodEffects` class making it difficult to access `schema.shape` to retrieve the schema values
* `refine` on a schema is not executed, when the initial schema object is initialized with invalid values
