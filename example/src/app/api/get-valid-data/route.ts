import { NextResponse } from 'next/server';

import type { Schema } from '../../../schema/schema.types';
import { daysOfWorkWeek } from '../../../schema/schema.constants';

export async function GET(): Promise<NextResponse> {
  const payload: Schema = {
    title: 'Mr.',
    firstName: 'Cat',
    lastName: 'Stevens',
    hasCats: true,
    numberOfCats: 1,
    daysInTheOffice: [...daysOfWorkWeek]
  };
  return NextResponse.json(payload);
}
