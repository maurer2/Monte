import { NextResponse } from 'next/server';

import type { Schema } from '../../../schema/schema.types';

export async function GET(request: Request): Promise<NextResponse> {
  const payload: Schema = {
    title: 'Mr.',
    firstName: 'Cat',
    lastName: 'Stevens',
    hasCats: true,
    numberOfCats: 1,
  };
  return NextResponse.json(payload);
}
