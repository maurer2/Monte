'use client';

import { useEffect, useState } from 'react';
import { fromZodError } from 'zod-validation-error';

// eslint-disable-next-line import/extensions
import BackButton from '@/components/BackButton';
import { schema } from '../../schema/schema';
import type { Schema } from '../../schema/schema.types';

const fetchApiData = async <T,>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const json = await response.json() as T;

  return json;
};

export default function ValidateIncomingData() {
  const [validData, setValidData] = useState<Schema | null>(null);
  const [invalidData, setInvalidData] = useState<unknown | null>(null);

  useEffect(() => {
    // TS not lying
    (async () => {
      try {
        const data = await fetchApiData<Schema>('/api/get-valid-data');
        setValidData(data);
      } catch (error) {
        setValidData(null);
        console.log(error instanceof Error ? error.message : 'Error');
      }
    })();

    // TS lying
    (async () => {
      try {
        const data = await fetchApiData<Schema>('/api/get-invalid-data');
        setInvalidData(data);
      } catch (error) {
        setInvalidData(null);
        console.log(error instanceof Error ? error.message : 'Error');
      }
    })();
  }, []);

  const errorData = schema.safeParse(invalidData);

  return (
    <main className="min-h-screen p-24 font-sans">
      <div className="grid grid-cols-2 w-full max-w-5xl">
        <h1 className="mb-4 col-span-full">Validate incoming data</h1>

        <section className="mb-8">
          <h2 className="mb-4">Payload 1</h2>
          {validData !== null && (
            <code className="mb-4 block font-mono">
              <pre className="whitespace-pre-wrap">{JSON.stringify(validData, undefined, 2)}</pre>
            </code>
          )}
          <p className="mb-4">
            Is valid:
            {' '}
            {String(schema.safeParse(validData).success)}
          </p>
        </section>

        <section>
          <h2 className="mb-4">Payload 2</h2>
          {invalidData !== null && (
            <code className="mb-4 block font-mono">
              <pre className="whitespace-pre-wrap">{JSON.stringify(invalidData, undefined, 2)}</pre>
            </code>
          )}
          <p className="mb-4">
            Is valid:
            {' '}
            {String(schema.safeParse(invalidData).success)}
          </p>
          <p>Errors:</p>
          {invalidData !== null && !errorData.success && (
            <ul>
              {fromZodError(errorData.error).details.map((currentError) => (
                <li key={currentError.message}>
                  <code className="font-mono">
                    <pre className="whitespace-pre-wrap">{JSON.stringify(currentError, undefined, 2)}</pre>
                  </code>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
      <BackButton cssClass="mt-4" />
    </main>
  );
}
