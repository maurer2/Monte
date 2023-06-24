import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

import { schema } from '../../../schema/schema';
import type { SuccessPayload, ErrorPayload } from './types';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const payload = await request.json();
    schema.parse(payload); // triggers catch when invalid

    return NextResponse.json(
      {
        status: 'success',
        message: 'Schema valid',
      } satisfies SuccessPayload,
      {
        status: 200,
      },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Validation error',
          data: fromZodError(error).details,
        } satisfies ErrorPayload,
        {
          status: 400,
        },
      );
    }
    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
      } satisfies ErrorPayload,
      {
        status: 400,
      },
    );
  }
}
