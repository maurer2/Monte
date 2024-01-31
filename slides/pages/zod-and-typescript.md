---
layout: section
image: https://source.unsplash.com/collection/94734566/1920x1080
---

## Zod and TypeScript

---
layout: image-right
image: https://source.unsplash.com/collection/94734566/1920x1080
hideInToc: true
---

### Generating TypeScript types from Zod schemas

TypeScript types can be generated from Zod schemas via helpers like `z.infer<T>`.
As Zod schemas support detailed constraints and error messages compared to TypeScript,
those additional data will be lost when generating TypeScript types.

Some examples for constraints, that will be lost:

* `integer` and `float` will just become `number`
* string formats like `email`, `url` or `uuid` will just become `string`
* `array` with specific length will just become `array`

---
layout: two-cols-header
layoutClass: gap-4 grid-cols-2 auto-rows-min
hideInToc: true
---

### Comparison of a Zod schema and the generated TypeScript type

::left::

```ts
const someComplexDataType = z.object({
  numberOfEntries: z.number({
    invalid_type_error: 'Must be a number',
    required_error: 'Is required',
  }).int('Must be an integer'),
  entries: z.array(
    z.string({
      invalid_type_error: 'Must be a string',
      required_error: 'Is required',
    }).min(1, 'Must not be empty')
  ).max(10, 'Must not contain more than 10 entries'),
  urls: z.record(
    z.string({
      invalid_type_error: 'Must be a string',
      required_error: 'Is required',
    }).url('Invalid URL'),
    z.boolean({
      invalid_type_error: 'Must be a boolean',
      required_error: 'Is required',
    }).default(true)
  ).optional(),
  role: z.union([z.literal('User'), z.literal('Admin')]),
  timestamp: z.date(),
});
```

::right::

```ts
type SomeComplexDataType = {
  numberOfEntries: number;
  entries: string[];
  urls?: Record<string, boolean> | undefined; *
  role: "User" | "Admin";
  timestamp: Date;
}
```

\* ([More information](https://github.com/colinhacks/zod/issues/539)) why optional is added as type in union type

---
layout: image-right
image: https://source.unsplash.com/collection/94734566/1920x1080
hideInToc: true
---

### When to use what

- Schema validation ideally happens whenever dynamic data is ingested, for example when:
  - Loading data via Ajax
  - Reading FormData from web forms
  - Restoring data from local storage
  - Accessing url query params and path segments
  <!-- - Receive BroadcastChannel data -->
- Once the inbound data has been verified to meet the schema, TypeScript types/interfaces can safely be used on dynamic data <!-- (especially when those types are generated from Zod schemas) -->
- Static data, e.g. data that is imported at build time, doesn't need to be validated, unless additional validation logic should be applied

---
layout: two-cols-header
layoutClass: gap-4 grid-cols-2 auto-rows-min
hideInToc: true
---

### Type assignment/narrowing via Zod 1

::left::

Every parse method of Zod returns a clone of the parsed input data in case of valid input data or error information in case of an error during parsing. Successfully parsed input data contains all necessary type information.

`parse()` returns the cloned data and type information directly unless an error is triggered.

`safeParse` returns a discriminated union, where the `success` field is used to distinguish between the error case and the happy case. The nested `error` field can only be accessed after checking that the `success` field is false.

The nested `data` field, that contains the parsed and cloned input data can only be accessed after checking that the `success` field is true.

::right::

```ts
const someObjectSchema = z.object({
  testString: z.string(),
  testNumber: z.number(),
})

function testFunction(
  testString: unknown, testNumber: unknown
) {
  const untypedObject = {
    testString,
    testNumber
  }
  // untypedObject.testString is "unknown" here
  // untypedObject.testNumber is "unknown" here
  try {
    const typedObject =
      someObjectSchema.parse(untypedObject);
    // typedObject.testString is "string" now
    // typedObject.testNumber is "number" now
    ...
  } catch (error) {
    throw new Error(error?.message);
  }
}
````

---
layout: image-right
image: https://source.unsplash.com/collection/94734566/1920x1080
hideInToc: true
---

### Type assignment/narrowing via Zod 2

```ts
function testFunction(
  testString: unknown, testNumber: unknown
){
  const untypedObject = {
    testString,
    testNumber
  }
  // untypedObject.testString is "unknown" here
  // untypedObject.testNumber is "unknown" here

  const parseResult = someObjectSchema
    .safeParse(untypedObject);

  if (!parseResult.success) {
    // parseResult.data is undefined here
    throw new Error(parseResult.error.message)
  }

  // parseResult.error is undefined here
  // parseResult.data.testString is "string" now
  // parseResult.data.testNumber is "number" now
  ...
}
````
