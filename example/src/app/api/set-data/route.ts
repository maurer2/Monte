import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

import { schema } from '../../../schema/schema';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const payload = await request.json();

    schema.parse(payload);
    return NextResponse.json(
      {
        message: 'Schema valid',
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          status: 'error',
          data: JSON.stringify(fromZodError(error).details),
          message: 'Validation error'
        },
        {
          status: 400,
        },
      );
    }

    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Error',
      },
      {
        status: 400,
      },
    );
  }
}
