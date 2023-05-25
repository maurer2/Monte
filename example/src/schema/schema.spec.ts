import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';

import { schema } from './schema';
import type { Schema } from './schema.types';

describe('schema', () => {
  describe('general', () => {
    it('should parse via parse', () => {
      expect(() => schema.parse({})).toThrow();
    });

    it('should parse via safeParse', () => {
      expect(schema.safeParse({}).success).toBeFalsy();
    });
  });

  describe('title', () => {
    it('should fail parsing when title is missing', () => {
      const schemaValue = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: 'Charles'
      }
      expect(schema.safeParse(schemaValue).success).toBeFalsy();

      const result = schema.safeParse(schemaValue);
      if (!result.success) {
        const error = result.error.format();
        expect(error.title?._errors).toContain('title must be set')
      }
    });

    it('should fail parsing when title is wrong data type', () => {
      const schemaValue = {
        title: faker.number.int(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: 'Charles'
      }
      expect(schema.safeParse(schemaValue).success).toBeFalsy();

      const result = schema.safeParse(schemaValue);
      if (!result.success) {
        const error = result.error.format();
        expect(error.title?._errors).toContain('title must be a string')
      }
    });

    it('should fail parsing when title does not contain one of the predefined values', () => {
      const schemaValue = {
        title: 'Dude',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: 'Charles'
      }
      expect(schema.safeParse(schemaValue).success).toBeFalsy();

      const result = schema.safeParse(schemaValue);
      if (!result.success) {
        const error = result.error.format();
        expect(error.title?._errors).toContain("Invalid enum value. Expected 'Mr.' | 'Ms.' | 'Mrs.' | 'Dr.' | 'Prof.', received 'Dude'")
      }
    });
  })

  describe('firstName', () => {
    it('should fail parsing when firstName is missing', () => {
      const schemaValue = {
        title: 'Mr.',
        lastName: faker.person.lastName(),
        middleName: 'Charles'
      }
      expect(schema.safeParse(schemaValue).success).toBeFalsy();

      const result = schema.safeParse(schemaValue);
      if (!result.success) {
        const error = result.error.format();
        expect(error.firstName?._errors).toContain('firstName must be set')
      }
    });

    it('should fail parsing when firstName is wrong datatype', () => {
      const schemaValue = {
        title: 'Mr.',
        firstName: faker.number.int(),
        lastName: faker.person.lastName(),
        middleName: 'Charles'
      }
      expect(schema.safeParse(schemaValue).success).toBeFalsy();

      const result = schema.safeParse(schemaValue);
      if (!result.success) {
        const error = result.error.format();
        expect(error.firstName?._errors).toContain('firstName must be a string')
      }
    });

    it('should fail parsing when firstName is empty', () => {
      const schemaValue: Schema = {
        title: 'Mr.',
        firstName: '',
        lastName: faker.person.lastName(),
        middleName: 'Charles',
        hasCats: false,
      }
      expect(schema.safeParse(schemaValue).success).toBeFalsy();

      const result = schema.safeParse(schemaValue);
      if (!result.success) {
        const error = result.error.format();
        expect(error.firstName?._errors).toContain('firstName mustn\'t be empty')
      }
    });
  })

  describe('lastName', () => {
    it('should fail parsing when lastName is missing', () => {
      const schemaValue = {
        firstName: faker.person.lastName(),
        middleName: 'Charles'
      }
      expect(schema.safeParse(schemaValue).success).toBeFalsy();

      const result = schema.safeParse(schemaValue);
      if (!result.success) {
        const error = result.error.format();
        expect(error.lastName?._errors).toContain('lastName must be set')
      }
    });

    it('should fail parsing when lastName is the wrong datatype', () => {
      const schemaValue = {
        title: 'Mr.',
        firstName: faker.person.firstName(),
        lastName: faker.number.int(),
        middleName: 'Charles'
      }
      expect(schema.safeParse(schemaValue).success).toBeFalsy();

      const result = schema.safeParse(schemaValue);
      if (!result.success) {
        const error = result.error.format();
        expect(error.lastName?._errors).toContain('lastName must be a string')
      }
    });

    it('should fail parsing when lastName is empty', () => {
      const schemaValue: Schema = {
        title: 'Mr.',
        firstName: faker.person.firstName(),
        lastName: '',
        middleName: 'Charles',
        hasCats: false,
      }
      expect(schema.safeParse(schemaValue).success).toBeFalsy();

      const result = schema.safeParse(schemaValue);
      if (!result.success) {
        const error = result.error.format();
        expect(error.lastName?._errors).toContain('lastName mustn\'t be empty')
      }
    });
  })

  describe('middleName', () => {
    it('should parse successfully when all values are set including middleName', () => {
      const schemaValue: Schema = {
        title: 'Mr.',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: 'Charles',
        hasCats: false,
      }
      expect(schema.safeParse(schemaValue).success).toBeTruthy();
    });

    it('should parse successfully when all values are set excluding middleName', () => {
      const schemaValue: Schema = {
        title: 'Mr.',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        hasCats: false,
      }
      expect(schema.safeParse(schemaValue).success).toBeTruthy();
    });

    it('should fail parsing when middleName is empty', () => {
      const schemaValue: Schema = {
        title: 'Mr.',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: '',
        hasCats: false,
      }
      expect(schema.safeParse(schemaValue).success).toBeFalsy();

      const result = schema.safeParse(schemaValue);
      if (!result.success) {
        const error = result.error.format();
        expect(error.middleName?._errors).toContain('middleName mustn\'t be empty')
      }
    });

    it('should fail parsing when middleName is wrong data type', () => {
      const schemaValue = {
        title: 'Mr.',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: faker.number.int(),
      }
      expect(schema.safeParse(schemaValue).success).toBeFalsy();

      const result = schema.safeParse(schemaValue);
      if (!result.success) {
        const error = result.error.format();
        expect(error.middleName?._errors).toContain('middleName must be a string')
      }
    });

    it('should fail parsing when middleName is a palindrome', () => {
      const schemaValue: Schema = {
        title: 'Mr.',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: 'taco cat',
        hasCats: false,
      }
      expect(schema.safeParse(schemaValue).success).toBeFalsy();

      const result = schema.safeParse(schemaValue);
      if (!result.success) {
        const error = result.error.format();
        expect(error.middleName?._errors).toContain('middleName mustn\'t be a palindrome')
      }
    });

    it('should fail parsing when middleName is a single letter palindrome', () => {
      const schemaValue: Schema = {
        title: 'Mr.',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: 'a',
        hasCats: false,
      }
      expect(schema.safeParse(schemaValue).success).toBeFalsy();

      const result = schema.safeParse(schemaValue);
      if (!result.success) {
        const error = result.error.format();
        expect(error.middleName?._errors).toContain('middleName mustn\'t be a palindrome')
      }
    });

    it('should fail parsing when middleName is a palindrome that contains complex emojis', () => {
      const schemaValue: Schema = {
        title: 'Mr.',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: '🐈‍⬛wow🐈‍⬛', // each emoji contains 4 characters
        hasCats: false,
      }
      expect(schema.safeParse(schemaValue).success).toBeFalsy();

      const result = schema.safeParse(schemaValue);
      if (!result.success) {
        const error = result.error.format();
        expect(error.middleName?._errors).toContain('middleName mustn\'t be a palindrome')
      }
    });
  })

  describe('hasCats', () => {
    it('should fail parsing when hasCats is the wrong datatype', () => {
      const schemaValue = {
        title: 'Mr.',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: 'Charles',
        hasCats: 'false',
      }
      expect(schema.safeParse(schemaValue).success).toBeFalsy();

      const result = schema.safeParse(schemaValue);
      if (!result.success) {
        const error = result.error.format();
        expect(error.hasCats?._errors).toContain('hasCats must be a boolean')
      }
    });
  })

  describe('numberOfCats', () => {
    it('should parse successfully when numberOfCats is already a number', () => {
      const schemaValue: Schema = {
        title: 'Mr.',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: 'Charles',
        hasCats: true,
        numberOfCats: 50,
      }
      expect(schema.safeParse(schemaValue).success).toBeTruthy();
    });

    it('should parse successfully when numberOfCats can be converted to a number', () => {
      const schemaValue = {
        title: 'Mr.',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: 'Charles',
        hasCats: true,
        numberOfCats: '50'
      }
      expect(schema.safeParse(schemaValue).success).toBeTruthy();
    });

    it('should fail parsing when numberOfCats can\'t be converted to a number', () => {
      const schemaValue = {
        title: 'Mr.',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: 'Charles',
        hasCats: true,
        numberOfCats: 'notParseable50'
      }
      expect(schema.safeParse(schemaValue).success).toBeFalsy();

      const result = schema.safeParse(schemaValue);
      if (!result.success) {
        const error = result.error.format();
        expect(error.numberOfCats?._errors).toContain('numberOfCats must be number-ish')
      }
    })

    it('should fail parsing when numberOfCats isn\'t an int', () => {
      const schemaValue: Schema = {
        title: 'Mr.',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: 'Charles',
        hasCats: true,
        numberOfCats: faker.number.float(),
      }
      expect(schema.safeParse(schemaValue).success).toBeFalsy();

      const result = schema.safeParse(schemaValue);
      if (!result.success) {
        const error = result.error.format();
        expect(error.numberOfCats?._errors).toContain('numberOfCats must be an integer')
      }
    })

    it('should parse successfully when numberOfCats is between 1 and 50', () => {
      const schemaValue: Schema = {
        title: 'Mr.',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: 'Charles',
        hasCats: true,
        numberOfCats: 1,
      };

      Array.from(Array(50).keys()).forEach((testValue) => {
        expect(schema.safeParse({
          ...schemaValue,
          numberOfCats: testValue + 1,
        }).success).toBeTruthy();
      });
    })

    it('should fail parsing when numberOfCats is less than 1', () => {
      const schemaValue: Schema = {
        title: 'Mr.',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: 'Charles',
        hasCats: true,
        numberOfCats: 0,
      }
      expect(schema.safeParse(schemaValue).success).toBeFalsy();

      const result = schema.safeParse(schemaValue);
      if (!result.success) {
        const error = result.error.format();
        expect(error.numberOfCats?._errors).toContain('numberOfCats must be more than 0')
      }
    })

    it('should fail parsing when numberOfCats is larger than 50', () => {
      const schemaValue: Schema = {
        title: 'Mr.',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: 'Charles',
        hasCats: true,
        numberOfCats: 51,
      }
      expect(schema.safeParse(schemaValue).success).toBeFalsy();

      const result = schema.safeParse(schemaValue);
      if (!result.success) {
        const error = result.error.format();
        expect(error.numberOfCats?._errors).toContain('numberOfCats must be less than or equal 50')
      }
    })
  })

  describe('hasCats & numberOfCats', () => {
    it('should fail parsing when numberOfCats is set but hasCats is false', () => {
      const schemaValue = {
        title: 'Mr.',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: 'Charles',
        hasCats: false,
        numberOfCats: 50
      }
      expect(schema.safeParse(schemaValue).success).toBeFalsy();

      const result = schema.safeParse(schemaValue);
      if (!result.success) {
        const error = result.error.format();
        expect(error.numberOfCats?._errors).toContain('numberOfCats mustn\'t be set if hasCats is false')
      }
    });

    it('should fail parsing when numberOfCats is missing but hasCats is true', () => {
      const schemaValue = {
        title: 'Mr.',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: 'Charles',
        hasCats: true,
      }
      expect(schema.safeParse(schemaValue).success).toBeFalsy();

      const result = schema.safeParse(schemaValue);
      if (!result.success) {
        const error = result.error.format();
        expect(error.numberOfCats?._errors).toContain('numberOfCats must be set if hasCats is true')
      }
    });
  })
});
