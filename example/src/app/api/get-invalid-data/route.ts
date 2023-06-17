import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  const payload = {
    title: 'Dude',
    firstName: 'Cat',
    lastName: 'Stevens',
    hasCats: true,
    numberOfCats: 100,
    daysInTheOffice: [],
  };
  return NextResponse.json(payload);
}
