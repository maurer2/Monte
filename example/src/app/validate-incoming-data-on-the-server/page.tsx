'use client';

import { useEffect } from 'react';

import Image from 'next/image';

// eslint-disable-next-line import/extensions
import BackButton from '@/components/BackButton';

// import { schema } from '../../schema/schema';
// import type { Schema } from '../../schema/schema.types';

const setApiData = async <T,>(url: string, data: T) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response;
};

export default function ValidateIncomingDataServer() {
  useEffect(() => {
    (async () => {
      try {
        // invalid
        const response = await setApiData('/api/set-valid-data', {
          title: 'Dude',
          firstName: 'Cat',
          lastName: 'Stevens',
          hasCats: true,
          numberOfCats: 100,
          daysInTheOffice: [],
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <main className="min-h-screen p-24 font-sans">
      <div className="w-full max-w-5xl">
        <h1 className="mb-4">Validate incoming data on the server</h1>

        <Image src="/under-construction.gif" alt="" className="" width={133} height={133} priority />
      </div>
      <BackButton cssClass="mt-4" />
    </main>
  );
}
