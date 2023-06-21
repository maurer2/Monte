'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

// eslint-disable-next-line import/extensions
import BackButton from '@/components/BackButton';

// import { schema } from '../../schema/schema';
import type { Schema } from '../../schema/schema.types';
import { daysOfWorkWeek } from '../../schema/schema.constants';

type SuccessPayload = {
  status: 'success',
  message: string
};

type ErrorPayload = {
  status: 'error',
  data?: string,
  message: string
};

type Payload = SuccessPayload | ErrorPayload;

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
      throw new Error(payload?.data ?? payload?.message);
    }
  }

  return payload;
};

const dataValid: Schema = {
  title: 'Mr.',
  firstName: 'Cat',
  lastName: 'Stevens',
  hasCats: true,
  numberOfCats: 100,
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
    (async () => {
      try {
        const response = await setApiData('/api/set-data', dataInvalid);
        setInvalidDataResponse(response);
        console.log(response);
      } catch (error) {
        if (error instanceof Error) {
          if (typeof error.message === 'string') {
            setInvalidDataResponse(error.message);
          }
        }
        // console.log(error instanceof Error ? error.message : 'Error');
      }
    })();
  }, []);

  return (
    <main className="min-h-screen p-24 font-sans">
      <div className="grid grid-cols-2  w-full max-w-5xl">
        <h1 className="mb-4 col-span-full">Validate incoming data on the server</h1>

        <section>
          <Image src="/under-construction.gif" alt="" className="" width={133} height={133} priority />

        </section>

        <section>
          <h2 className="mb-4">Payload 2</h2>
          <code className="mb-4 block font-mono">
            <pre className="whitespace-pre-wrap">{JSON.stringify(dataInvalid, undefined, 2)}</pre>
          </code>
          <h2 className="mb-4">Response 2</h2>
          <code className="mb-4 block font-mono">
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(JSON.parse(invalidDataResponse), undefined, 2)}
            </pre>
          </code>
        </section>
      </div>
      <BackButton cssClass="mt-4" />
    </main>
  );
}
