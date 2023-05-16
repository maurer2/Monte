import Link from 'next/link';

export default function Home() {

  return (
    <main className="flex min-h-screen p-24">
      <div className="z-10 w-full max-w-5xl font-mono text-sm">
        <h1 className='mb-4'>Example pages</h1>

        <ul className='list-inside'>
          <li className="list-disc">
            <Link href='/validate-incoming-data'>Validate incoming data</Link>
          </li>
          <li className="list-disc">
            <Link href='/validate-form-data'>Validate form data</Link>
          </li>
          <li className="list-disc">
            <Link href='/validate-incoming-data-server'>Validate incoming data server</Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
