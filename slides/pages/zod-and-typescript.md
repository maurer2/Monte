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
  role: "User" | "Admin";
  timestamp: Date;
}
```

---
layout: image-right
image: https://source.unsplash.com/collection/94734566/1920x1080
hideInToc: true
---

### When to use what

- Schema validation ideally happens whenever dynamic data is ingested, for example when:
  - Loading data via Ajax
  - Reading FormData from web forms
  - Restoring data from local or session storage
  <!-- - Receive BroadcastChannel data -->
- Once the inbound data has been verified to meet the schema, TypeScript types/interfaces can safely be used on dynamic data (especially when those types are generated from Zod schemas)
- Static data, e.g. data that is imported at build time, doesn't need to be validated, unless additional validation logic should be applied
