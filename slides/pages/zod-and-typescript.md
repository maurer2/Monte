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

TypeScript types can be generated from Zod schemas via the `z.infer<T>` helper.
As Zod schemas support detailed constraints compared to TypeScript,
those constraints will be lost when generating TypeScript types.

Some examples for constraints, that will be lost:

* `integer` and `float` will just become `number`
* string formats like `email`, `url` or `uuid` will just become `string`
* `array` with specific length will just become `array`

---
layout: two-cols-header
layoutClass: gap-4 grid-cols-2 auto-rows-min
image: https://source.unsplash.com/collection/94734566/1920x1080
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
  urls?: Record<string, boolean> | undefined;
  role: "User" | "Editor" | "Admin";
  timestamp: Date;
}
```

<!-- ---

# TypeScript vs Zod

* TypeScript handles static data, e.g. data that is known at compile time, well
* Dynamic data, e.g. data that is dynamic and only known at run time, is handled well by Zod
* TypeScript can also be used to model dynamic data, but there might be inconsistencies between expected types and actual data, that can't be detected at runtime, since TypeScript types are removed during compilation (type erasure)
* Zod can detected invalid types at runtime
* Zod can create TypeScript from a schema to simplify working with the rest of the TypeScript ecosystem, but schema data are lost in the process for example Zod's `int` type becomes `number` in TypeScript etc. -->
