---
layout: section
image: https://source.unsplash.com/collection/94734566/1920x1080
---

## Validation

---
layout: image-right
image: https://source.unsplash.com/collection/94734566/1920x1080
hideInToc: true
---

### Built-in validators

Zod comes with a range of built-in validators. Each validator supports a custom error message,
that is displayed alongside other error data.

Most commonly used validators are:

* string (`email`, `url`, `uuid`, `regex`, `startsWith`, `endsWith` etc.)
* number (`integer`, `float`, `positive`, `negative`, `multipleOf` etc.)
* array (`min`, `max`, `length`, `nonempty`)
* object
* boolean
* undefined/null
* enum
* date (`min`, `max`)

---
layout: two-cols-header
layoutClass: gap-4 grid-cols-2 auto-rows-min
image: https://source.unsplash.com/collection/94734566/1920x1080
hideInToc: true
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
hideInToc: true
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
hideInToc: true
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
        "minimum": 0,
        "type": "number",
        "inclusive": false,
        "exact": false,
        "message": "Must be positive",
        "path": [1]
      }
    ],
  }
}
```

---
layout: two-cols-header
layoutClass: gap-4 grid-cols-2 auto-rows-min
image: https://source.unsplash.com/collection/94734566/1920x1080
hideInToc: true
---

### Validate related fields with custom validation logic

::left::

```ts
const someComplexDataType = z.object({
  numberOfEntries: z.number({
    invalid_type_error: 'Must be a number',
    required_error: 'Is required',
  }).int('Must be an integer').positive('Must be a positive number'),
  entries: z.array(
    z.string({
      invalid_type_error: 'Must be a string',
      required_error: 'Is required',
    }).min(1, 'Must not be empty')
  ),
})
.refine(
  ({ numberOfEntries, entries }) => entries.length === numberOfEntries,
  ({ numberOfEntries }) => ({
    message: `entries must contain ${numberOfEntries} values`,
    path: ['entries'],
  })
);

console.log(someComplexDataType.safeParse({
  numberOfEntries: 3,
  entries: [ 'test value 1', '',]
}), null, 2);
```

::right::

```json
{
  "success": false,
  "error": {
    "issues": [
      {
        "code": "too_small",
        "minimum": 1,
        "type": "string",
        "inclusive": true,
        "exact": false,
        "message": "Must not be empty",
        "path": ["entries", 1]
      },
      {
        "code": "custom",
        "message": "entries must contain 3 values",
        "path": ["entries"]
      }
    ],
  }
}
```

---
layout: two-cols-header
layoutClass: gap-4 grid-cols-2 auto-rows-min
image: https://source.unsplash.com/collection/94734566/1920x1080
hideInToc: true
---

### Validate multiple object shapes with common field, e.g. discriminated unions

::left::

```ts
const someSuccessOrFailObject = z.discriminatedUnion('status', [
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
        z.number().int().nonnegative(),
        z.string().nonempty(),
      ]),
      message: z.string().nonempty(),
    })
  }),
]);
console.log(someSuccessOrFailObject.safeParse({
  status: 'success',
  data: {
    message: 'OK',
  }
}));
```

::right::

```json
{
  "success": true,
  "data": {
    "status": "success",
    "data": {
      "message": "OK"
    }
  }
}
```

---
layout: image-right
image: https://source.unsplash.com/collection/94734566/1920x1080
hideInToc: true
---

### Common pain points

* Using `refine` on a schema wraps it in a `ZodEffects` type, making it difficult to access `shape` to retrieve the schema values ([link to issue](https://github.com/colinhacks/zod/issues/2474))
* `refine` on a schema is not executed, when the initial schema object is initialized with invalid values ([link to issue](https://github.com/colinhacks/zod/issues/2524))
* It is currently not possible to define a non-optional object keys that can be `undefined`, without using a workaround ([link to issue](https://github.com/colinhacks/zod/issues/539)
