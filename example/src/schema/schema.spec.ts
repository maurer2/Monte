import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';

import { schema } from './schema';
import type { Schema } from './schema';

describe('schema', () => {
  describe('general', () => {
    it('should parse via toThrow', () => {
      expect(() => schema.parse({})).toThrow();
    });

    it('should parse via safeParse', () => {
      expect(schema.safeParse({}).success).toBeFalsy();
    });
  });

  describe('firstName', () => {
    it('should fail parsing when firstName is missing', () => {
      const schemaValue = {
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

    it('should fail parsing when firstName is empty', () => {
      const schemaValue: Schema = {
        firstName: '',
        lastName: faker.person.lastName(),
        middleName: 'Charles'
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

    it('should fail parsing when lastName is empty', () => {
      const schemaValue: Schema = {
        firstName: faker.person.lastName(),
        lastName: '',
        middleName: 'Charles'
      }
      expect(schema.safeParse(schemaValue).success).toBeFalsy();

      const result = schema.safeParse(schemaValue);
      if (!result.success) {
        const error = result.error.format();
        expect(error.lastName?._errors).toContain('lastName mustn\'t be empty')
      }
    });
  })

  describe('middle name', () => {
    it('should parse successfully when all values are set including middleName', () => {
      const schemaValue: Schema = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: 'Charles'
      }
      expect(schema.safeParse(schemaValue).success).toBeTruthy();
    });

    it('should parse successfully when all values are set excluding middleName', () => {
      const schemaValue: Schema = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
      }
      expect(schema.safeParse(schemaValue).success).toBeTruthy();
    });

    it('should fail parsing when middleName is empty', () => {
      const schemaValue: Schema = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: ''
      }
      expect(schema.safeParse(schemaValue).success).toBeFalsy();

      const result = schema.safeParse(schemaValue);
      if (!result.success) {
        const error = result.error.format();
        expect(error.middleName?._errors).toContain('middleName mustn\'t be empty')
      }
    });

    it('should fail parsing when middleName is a palindrome', () => {
      const schemaValue: Schema = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: 'taco cat'
      }
      expect(schema.safeParse(schemaValue).success).toBeFalsy();

      const result = schema.safeParse(schemaValue);
      if (!result.success) {
        const error = result.error.format();
        expect(error.middleName?._errors).toContain('middleName mustn\'t be a palindrome')
      }
    });
  })
});
