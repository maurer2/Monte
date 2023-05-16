'use client';

import { fromZodError } from 'zod-validation-error';
import Image from 'next/image';

// import { schema } from '../../schema/schema';
// import type { Schema } from '../../schema/schema.types';

export default function ValidateFormData() {
  return (
    <main className="flex min-h-screen p-24">
      <div className="z-10 w-full max-w-5xl font-mono text-sm">
        <h1 className="mb-4">Validate form data</h1>

        <Image src="/under-construction.gif" alt="" className="" width={133} height={133} />
      </div>
    </main>
  );
}
