import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<NextResponse> {
  const payload = {
    title: 'Dude',
    firstName: 'Cat',
    lastName: 'Stevens',
    hasCats: true,
    numberOfCats: 100,
  }
  return NextResponse.json(payload);
}
