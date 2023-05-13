import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';

import { schema } from './schema';
import type { Schema } from './schema.types';

describe('schema', () => {
  describe('general', () => {
    it('should parse via toThrow', () => {
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
        title: 'Mr.',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: 'Charles'
      }
      expect(schema.safeParse(schemaValue).success).toBeTruthy();
    });

    it('should parse successfully when all values are set excluding middleName', () => {
      const schemaValue: Schema = {
        title: 'Mr.',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
      }
      expect(schema.safeParse(schemaValue).success).toBeTruthy();
    });

    it('should fail parsing when middleName is empty', () => {
      const schemaValue: Schema = {
        title: 'Mr.',
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
        middleName: 'taco cat'
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
        middleName: '🐈‍⬛wow🐈‍⬛' // each emoji contains 4 characters
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
