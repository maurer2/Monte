import type { ZodIssue } from 'zod';

export type SuccessPayload = {
  status: 'success',
  message: string,
};

export type ErrorPayload = {
  status: 'error',
  message: string,
  data?: ZodIssue[],
};

export type Payload = SuccessPayload | ErrorPayload;
