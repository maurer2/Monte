# TypeScript vs Zod

* TypeScript handles static data, e.g. data that is known at compile time, well
* Dynamic data, e.g. data that is dynamic and only known at run time, is handled well by Zod
* TypeScript can also be used to model dynamic data, but there might be inconsistencies between expected types and actual data, that can't be detected at runtime, since TypeScript types are removed during compilation (type erasure)
* Zod can detected invalid types at runtime
* Zod can create TypeScript from a schema to simplify working with the rest of the TypeScript ecosystem, but schema data are lost in the process for example Zod's `int` type becomes `number` in TypeScript etc.
