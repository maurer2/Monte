import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { schema } from '../../../schema/schema';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const payload = await request.json();

    schema.parse(payload);
    return NextResponse.json(
      {
        message: 'OK',
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : 'Error',
      },
      {
        status: 400,
      },
    );
  }
}
