/* eslint-disable no-underscore-dangle */
import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';

import { schema } from './schema';
import { daysOfWorkWeek } from './schema.constants';
import type { Schema } from './schema.types';

describe('schema', () => {
  const validDataForSchema: Schema = {
    title: 'Mr.',
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    middleName: 'Charles',
    hasCats: true,
    numberOfCats: 50,
    daysInTheOffice: [...daysOfWorkWeek],
  };

  describe('schema parsing is working', () => {
    it('should parse via parse', () => {
      expect(() => schema.parse({})).toThrow();
    });

    it('should parse via safeParse', () => {
      expect(schema.safeParse({}).success).toBeFalsy();
    });
  });

  describe('correct data doesn\'t fail parsing', () => {
    it('should work', () => {
      const data = {
        ...validDataForSchema,
      };

      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeTruthy();
    });
  });

  describe('title', () => {
    it('should fail parsing when title is missing', () => {
      const { title, ...data } = { ...validDataForSchema };

      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeFalsy();

      if (!parseResult.success) {
        expect(parseResult.error.format().title?._errors).toContain('title must be set');
      }
    });

    it('should fail parsing when title is null', () => {
      const data = {
        ...validDataForSchema,
        title: null,
      };

      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeFalsy();

      if (!parseResult.success) {
        expect(parseResult.error.format().title?._errors).toContain('title must either be Mr., Ms., Mrs., Dr. or Prof.');
      }
    });

    it('should fail parsing when title has the wrong data type', () => {
      const data = {
        ...validDataForSchema,
        title: faker.number.int(),
      };

      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeFalsy();

      if (!parseResult.success) {
        expect(parseResult.error.format().title?._errors).toContain('title must be a string');
      }
    });

    it('should fail parsing when title does not contain one of the predefined values', () => {
      const data = {
        ...validDataForSchema,
        title: 'Dude',
      };

      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeFalsy();

      if (!parseResult.success) {
        expect(parseResult.error.format().title?._errors).toContain("Invalid enum value. Expected 'Mr.' | 'Ms.' | 'Mrs.' | 'Dr.' | 'Prof.', received 'Dude'");
      }
    });
  });

  describe('firstName', () => {
    it('should fail parsing when firstName is missing', () => {
      const { firstName, ...data } = { ...validDataForSchema };

      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeFalsy();

      if (!parseResult.success) {
        expect(parseResult.error.format().firstName?._errors).toContain('firstName must be set');
      }
    });

    it('should fail parsing when firstName has the wrong datatype', () => {
      const data = {
        ...validDataForSchema,
        firstName: faker.number.int(),
      };

      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeFalsy();

      if (!parseResult.success) {
        expect(parseResult.error.format().firstName?._errors).toContain('firstName must be a string');
      }
    });

    it('should fail parsing when firstName is empty', () => {
      const data = {
        ...validDataForSchema,
        firstName: '',
      };

      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeFalsy();

      if (!parseResult.success) {
        expect(parseResult.error.format().firstName?._errors).toContain('firstName mustn\'t be empty');
      }
    });
  });

  describe('lastName', () => {
    it('should fail parsing when lastName is missing', () => {
      const { lastName, ...data } = { ...validDataForSchema };

      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeFalsy();

      if (!parseResult.success) {
        expect(parseResult.error.format().lastName?._errors).toContain('lastName must be set');
      }
    });

    it('should fail parsing when lastName has the wrong datatype', () => {
      const data = {
        ...validDataForSchema,
        lastName: faker.number.int(),
      };

      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeFalsy();

      if (!parseResult.success) {
        expect(parseResult.error.format().lastName?._errors).toContain('lastName must be a string');
      }
    });

    it('should fail parsing when lastName is empty', () => {
      const data = {
        ...validDataForSchema,
        lastName: '',
      };

      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeFalsy();

      if (!parseResult.success) {
        expect(parseResult.error.format().lastName?._errors).toContain('lastName mustn\'t be empty');
      }
    });
  });

  describe('middleName', () => {
    it('should parse successfully when all values are set excluding middleName', () => {
      const { middleName, ...data } = { ...validDataForSchema };

      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeTruthy();
    });

    it('should fail parsing when middleName is empty', () => {
      const data = {
        ...validDataForSchema,
        middleName: '',
      };

      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeFalsy();

      if (!parseResult.success) {
        expect(parseResult.error.format().middleName?._errors).toContain('middleName mustn\'t be empty');
      }
    });

    it('should fail parsing when middleName has the wrong data type', () => {
      const data = {
        ...validDataForSchema,
        middleName: faker.number.int(),
      };

      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeFalsy();

      if (!parseResult.success) {
        expect(parseResult.error.format().middleName?._errors).toContain('middleName must be a string');
      }
    });

    it('should not fail parsing when middleName is a single letter', () => {
      const data = {
        ...validDataForSchema,
        middleName: 'a',
      };

      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeTruthy();
    });

    it('should fail parsing when middleName is a palindrome', () => {
      const data = {
        ...validDataForSchema,
        middleName: 'tacocat',
      };

      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeFalsy();

      if (!parseResult.success) {
        expect(parseResult.error.format().middleName?._errors).toContain('middleName mustn\'t be a palindrome');
      }
    });

    it('should fail parsing when middleName is a palindrome with spaces', () => {
      const data = {
        ...validDataForSchema,
        middleName: 'taco cat',
      };

      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeFalsy();

      if (!parseResult.success) {
        expect(parseResult.error.format().middleName?._errors).toContain('middleName mustn\'t be a palindrome');
      }
    });

    it('should fail parsing when middleName is a palindrome that contains complex emojis', () => {
      const data = {
        ...validDataForSchema,
        middleName: '🐈‍⬛wow🐈‍⬛', // each emoji contains 4 characters
      };

      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeFalsy();

      if (!parseResult.success) {
        expect(parseResult.error.format().middleName?._errors).toContain('middleName mustn\'t be a palindrome');
      }
    });
  });

  describe('hasCats', () => {
    it('should fail parsing when hasCats is missing', () => {
      const { hasCats, ...data } = { ...validDataForSchema };

      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeFalsy();

      if (!parseResult.success) {
        expect(parseResult.error.format().hasCats?._errors).toContain('hasCats must be set');
      }
    });

    it('should fail parsing when hasCats is the wrong datatype', () => {
      const data = {
        ...validDataForSchema,
        hasCats: 'false',
      };

      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeFalsy();

      if (!parseResult.success) {
        expect(parseResult.error.format().hasCats?._errors).toContain('hasCats must be a boolean');
      }
    });
  });

  describe('numberOfCats', () => {
    it('should parse successfully when numberOfCats is already a number', () => {
      const data = {
        ...validDataForSchema,
        numberOfCats: 50,
      };

      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeTruthy();
    });

    it('should parse successfully when numberOfCats can be converted to a number', () => {
      const data = {
        ...validDataForSchema,
        numberOfCats: '50',
      };

      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeTruthy();
    });

    it('should fail parsing when numberOfCats can\'t be converted to a number', () => {
      const data = {
        ...validDataForSchema,
        numberOfCats: 'notParseable50',
      };

      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeFalsy();

      if (!parseResult.success) {
        expect(parseResult.error.format().numberOfCats?._errors).toContain('numberOfCats must be number-ish');
      }
    });

    it('should fail parsing when numberOfCats is a number but not an an int', () => {
      const data = {
        ...validDataForSchema,
        numberOfCats: faker.number.float(),
      };

      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeFalsy();

      if (!parseResult.success) {
        expect(parseResult.error.format().numberOfCats?._errors).toContain('numberOfCats must be an integer');
      }
    });

    it('should parse successfully when numberOfCats is between 1 and 50', () => {
      const data = { ...validDataForSchema };
      Array.from(Array(50).keys()).forEach((testValue) => {
        expect(schema.safeParse({
          ...data,
          numberOfCats: testValue + 1,
        }).success).toBeTruthy();
      });
    });

    it('should fail parsing when numberOfCats is less than 1', () => {
      const data = {
        ...validDataForSchema,
        numberOfCats: 0,
      };

      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeFalsy();

      if (!parseResult.success) {
        expect(parseResult.error.format().numberOfCats?._errors).toContain('numberOfCats must be more than 0');
      }
    });

    it('should fail parsing when numberOfCats is larger than 50', () => {
      const data = {
        ...validDataForSchema,
        numberOfCats: 51,
      };

      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeFalsy();

      if (!parseResult.success) {
        expect(parseResult.error.format().numberOfCats?._errors).toContain('numberOfCats must be less than or equal 50');
      }
    });
  });

  describe('hasCats & numberOfCats', () => {
    it('should fail parsing when numberOfCats is set but hasCats is false', () => {
      const data = {
        ...validDataForSchema,
        numberOfCats: 50,
        hasCats: false,
      };

      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeFalsy();

      if (!parseResult.success) {
        expect(parseResult.error.format().numberOfCats?._errors).toContain('numberOfCats mustn\'t be set if hasCats is false');
      }
    });

    it('should fail parsing when numberOfCats is missing but hasCats is true', () => {
      const { numberOfCats, ...data } = { ...validDataForSchema };

      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeFalsy();

      if (!parseResult.success) {
        expect(parseResult.error.format().numberOfCats?._errors).toContain('numberOfCats must be set if hasCats is true');
      }
    });
  });

  describe('daysInTheOffice', () => {
    it('should fail parsing when daysInTheOffice is missing', () => {
      const { daysInTheOffice, ...data } = { ...validDataForSchema };

      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeFalsy();

      if (!parseResult.success) {
        expect(parseResult.error.format().daysInTheOffice?._errors).toContain('daysInTheOffice must be set');
      }
    });

    it('should fail parsing when daysInTheOffice is empty', () => {
      const data = {
        ...validDataForSchema,
        daysInTheOffice: [],
      };
      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeFalsy();

      if (!parseResult.success) {
        expect(parseResult.error.format().daysInTheOffice?._errors).toContain('daysInTheOffice must contain at least 3 days');
      }
    });

    it('should fail parsing when daysInTheOffice contains less than 3 days', () => {
      const data = {
        ...validDataForSchema,
        daysInTheOffice: ['Mo', 'Th'],
      };
      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeFalsy();

      if (!parseResult.success) {
        expect(parseResult.error.format().daysInTheOffice?._errors).toContain('daysInTheOffice must contain at least 3 days');
      }
    });

    it('should fail parsing when daysInTheOffice contains more than 5 days', () => {
      const data = {
        ...validDataForSchema,
        daysInTheOffice: [...daysOfWorkWeek, 'Sa'],
      };
      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeFalsy();

      if (!parseResult.success) {
        expect(parseResult.error.format().daysInTheOffice?._errors).toContain('daysInTheOffice mustn\'t contain more than 5 days');
      }
    });

    it('should fail parsing when daysInTheOffice contains non workdays', () => {
      const data = {
        ...validDataForSchema,
        daysInTheOffice: ['Mo', 'Tu', 'We', 'Sa'],
      };
      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeFalsy();

      if (!parseResult.success) {
        expect(parseResult.error.format().daysInTheOffice?._errors).toContain('daysInTheOffice mustn\'t contain values other than Mo, Tu, We, Th or Fr');
      }
    });

    it('should fail parsing when daysInTheOffice contains duplicates', () => {
      const data = {
        ...validDataForSchema,
        daysInTheOffice: ['Mo', 'Tu', 'We', 'We'],
      };
      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeFalsy();

      if (!parseResult.success) {
        expect(parseResult.error.format().daysInTheOffice?._errors).toContain('daysInTheOffice mustn\'t contain duplicate values');
      }
    });

    it('should parse successfully when daysInTheOffice contains three days', () => {
      const data = {
        ...validDataForSchema,
        daysInTheOffice: ['Mo', 'Th', 'We'],
      };

      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeTruthy();
    });

    it('should parse successfully when daysInTheOffice contains five days', () => {
      const data = {
        ...validDataForSchema,
        daysInTheOffice: [...daysOfWorkWeek],
      };

      const parseResult = schema.safeParse(data);
      expect(parseResult.success).toBeTruthy();
    });
  });
});
