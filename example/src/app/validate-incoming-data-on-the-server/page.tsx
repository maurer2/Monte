'use client';

import { useEffect, useState } from 'react';

// eslint-disable-next-line import/extensions
import BackButton from '@/components/BackButton';

import type { Schema } from '../../schema/schema.types';
import { daysOfWorkWeek } from '../../schema/schema.constants';
import type { SuccessPayload, Payload } from '../api/set-data/types';

const setApiData = async <T,>(url: string, data: T) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const payload: Payload = await response.json() as Payload;

  if (!response.ok) {
    if (payload.status === 'error') {
      throw new Error(payload.message, { cause: payload.data });
    }
    throw new Error('Response error');
  }

  return payload as SuccessPayload;
};

const dataValid: Schema = {
  title: 'Mr.',
  firstName: 'Cat',
  lastName: 'Stevens',
  hasCats: true,
  numberOfCats: 1,
  daysInTheOffice: [...daysOfWorkWeek],
};

const dataInvalid = {
  title: 'Dude',
  firstName: 'Cat',
  lastName: 'Stevens',
  hasCats: true,
  numberOfCats: 100,
  daysInTheOffice: [],
};

export default function ValidateIncomingDataServer() {
  const [validDataResponse, setValidDataResponse] = useState<any>(null);
  const [invalidDataResponse, setInvalidDataResponse] = useState<any>(null);

  useEffect(() => {
    // valid data
    (async () => {
      try {
        const response = await setApiData('/api/set-data', dataValid);
        setValidDataResponse(response);
      } catch (error) {
        if (error instanceof Error) {
          setInvalidDataResponse(error.cause);
        }
      }
    })();

    // invalid data
    (async () => {
      try {
        const response = await setApiData('/api/set-data', dataInvalid);
        setInvalidDataResponse(response);
      } catch (error) {
        if (error instanceof Error) {
          setInvalidDataResponse(error.cause);
        }
      }
    })();
  }, []);

  return (
    <main className="min-h-screen p-24 font-sans">
      <div className="grid grid-cols-2  w-full max-w-5xl">
        <h1 className="mb-4 col-span-full">Validate incoming data on the server</h1>

        <section>
          <h2 className="mb-4">Payload</h2>
          <code className="mb-4 block font-mono">
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(dataValid, undefined, 2)}
            </pre>
          </code>
          <h2 className="mb-4">Response</h2>
          {validDataResponse !== null && (
            <code className="mb-4 block font-mono">
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(validDataResponse, undefined, 2)}
              </pre>
            </code>
          )}
        </section>

        <section>
          <h2 className="mb-4">Payload</h2>
          <code className="mb-4 block font-mono">
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(dataInvalid, undefined, 2)}
            </pre>
          </code>
          <h2 className="mb-4">Response</h2>
          {invalidDataResponse !== null && (
            <code className="mb-4 block font-mono">
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(invalidDataResponse, undefined, 2)}
              </pre>
            </code>
          )}
        </section>
      </div>
      <BackButton cssClass="mt-4" />
    </main>
  );
}
