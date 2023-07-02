import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

import { schema } from '../../../schema/schema';
import type { SuccessResponse, ErrorResponse } from './types';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const payload = await request.json();
    schema.parse(payload); // triggers catch when invalid

    return NextResponse.json(
      {
        status: 'success',
        data: {
          message: 'Validation successful. Payload valid.',
        },
      } satisfies SuccessResponse,
      {
        status: 200,
      },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          status: 'error',
          data: {
            message: 'Validation failed. Payload invalid.',
            issues: fromZodError(error).details,
          }
        } satisfies ErrorResponse,
        {
          status: 400,
        },
      );
    }
    return NextResponse.json(
      {
        status: 'error',
        data: {
          message: error instanceof Error ? error.message : 'Unknown error.',
        }
      } satisfies ErrorResponse,
      {
        status: 400,
      },
    );
  }
}
