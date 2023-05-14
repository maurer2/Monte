'use client';

import { useEffect, useState } from 'react';
import { fromZodError } from 'zod-validation-error';

import { schema } from '../schema/schema';
import type { Schema } from '../schema/schema.types';

export default function Home() {
  const [validData, setValidData] = useState<Schema | null>(null);
  const [invalidData, setInvalidData] = useState<unknown | null>(null);

  useEffect(() => {
    const fetchApiData = async <T,>(url: string): Promise<T> => {
      const data = await fetch(url);
      const json = await data.json();

      return json;
    };

    fetchApiData<Schema>('/api/get-valid-data')
      .then((data) => setValidData(data))
      .catch((error: unknown) => {
        setValidData(null);
        console.log(error);
      });

    fetchApiData<unknown>('/api/get-invalid-data')
      .then((data) => setInvalidData(data))
      .catch((error: unknown) => {
        setInvalidData(null);
        console.log(error);
      });
  }, []);

  const errorData = schema.safeParse(invalidData);

  return (
    <main className="flex min-h-screen p-24">
      <div className="z-10 w-full max-w-5xl font-mono text-sm">
        <h1 className="mb-4">Validating incoming data</h1>

        <section>
          <h1>Payload 1</h1>
          <code>
            <pre>{JSON.stringify(validData, undefined, 4)}</pre>
          </code>
          <p className="mb-4">Is valid: {String(schema.safeParse(validData).success)}</p>
        </section>

        <section>
          <h1>Payload 2</h1>
          <code>
            <pre>{JSON.stringify(invalidData, undefined, 4)}</pre>
          </code>
          <p>Is valid: {String(schema.safeParse(invalidData).success)}</p>
          {!errorData.success && (
            <ul>
              {fromZodError(errorData.error).details.map((currentError) => (
                <li key={currentError.message}>
                  <code>
                    <pre>{JSON.stringify(currentError, undefined, 4)}</pre>
                  </code>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
