import { z } from 'zod';

import { titles } from './schema.constants';

// not available in Firefox
const stringSplitter = new Intl.Segmenter('en', {
  granularity: 'grapheme'
});

export const schema = z
  .object({
    // title
    title: z
      .enum(titles, {
        required_error: 'title must be set',
        invalid_type_error: 'title must be a string',
      })
    ,

    // firstName
    firstName: z
      .string({
        invalid_type_error: 'firstName must be a string',
        required_error: 'firstName must be set',
      })
      .trim()
      .min(1, 'firstName mustn\'t be empty')
    ,

    // lastName
    lastName: z
      .string({
        invalid_type_error: 'lastName must be a string',
        required_error: 'lastName must be set',
      })
      .trim()
      .min(1, 'lastName mustn\'t be empty')
    ,

    // middleName - optional, if set then it mustn't be empty and it mustn't be a palindrome
    middleName: z
      .string({
        invalid_type_error: 'middleName must be a string',
        required_error: 'middleName must be set',
      })
      .trim()
      .min(1,'middleName mustn\'t be empty')
      // trim inside
      .transform((value) =>  value.replace(/\s/g, ''))
      .refine(
        (value): boolean => {
          const stringAsArray: string[] = Array.from(stringSplitter.segment(value), ({ segment }) => segment);

          // don't treat one letter words as palindromes
          if (stringAsArray.length === 1) {
            return true;
          }

          return stringAsArray.reverse().join('') !== value;
        },
        {
          message: `middleName mustn't be a palindrome`,
        },
      )
      .optional()
      // https://stackoverflow.com/questions/73582246/zod-schema-how-to-make-a-field-optional-or-have-a-minimum-string-contraint
      .transform((value) => value === '' ? undefined : value)
      // https://stackoverflow.com/questions/73715295/react-hook-form-with-zod-resolver-optional-field
      // .or(z.literal(''))
    ,

    // hasCats - makes numberOfCats field available or unavailable
    hasCats: z
      .boolean({
        invalid_type_error: 'hasCats must be a boolean',
      })
      .default(false)
    ,

    // numberOfCats - optional (depends on hasCats) and is coerced to number
    numberOfCats: z
      .coerce
      .number({
        invalid_type_error: 'numberOfCats must be number-ish', // triggered if coercion fails
      })
      .int('numberOfCats must be an integer')
      .min(1, 'numberOfCats must be more than 0')
      .max(50, 'numberOfCats must be less than or equal 50')
      .optional()
    ,
  })
  .strict()

  // numberOfCats shouldn't be set if hasCats is false
  .refine(
    (schemaValues): boolean => {
      if (!schemaValues.hasCats && typeof schemaValues?.numberOfCats !== 'undefined') {
        return false;
      }
      return true;
    },
    {
      message: `numberOfCats mustn't be set if hasCats is false`,
      path: ['numberOfCats'],
    },
  )

  // numberOfCats should be set if hasCats is true
  .refine(
    (schemaValues): boolean => {
      if (schemaValues.hasCats && typeof schemaValues?.numberOfCats === 'undefined') {
        return false;
      }
      return true;
    },
    {
      message: `numberOfCats must be set if hasCats is true`,
      path: ['numberOfCats'],
    },
  );
