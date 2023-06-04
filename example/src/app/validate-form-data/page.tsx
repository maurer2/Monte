'use client';

import { useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';

import BackButton from '@/components/BackButton';

import { schema } from '../../schema/schema';
import { titles } from '../../schema/schema.constants';
import type { Schema, SchemaWithEmptyValues } from '../../schema/schema.types';

// https://stackoverflow.com/questions/73582246/zod-schema-how-to-make-a-field-optional-or-have-a-minimum-string-contraint

const initialFormState: SchemaWithEmptyValues = {
  title: '',
  firstName: '',
  middleName: undefined,
  lastName: '',
  hasCats: false,
  numberOfCats: undefined,
};

export default function ValidateFormData() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    getValues,
    setValue,
    watch,
    trigger,
  } = useForm<SchemaWithEmptyValues>({
    defaultValues: initialFormState,
    resolver: zodResolver(schema),
  });

  const hasCats = watch('hasCats');

  // trigger numberOfCats validation, when has cats is toggled
  useEffect(() => {
    trigger('numberOfCats');
  }, [hasCats, trigger]);

  function onSubmit(value: unknown): void {
    console.log('submit', value);
  }

  function onError(error: unknown): void {
    console.log('error', error);
  }

  function onReset(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    reset();
  }

  console.log(errors);

  return (
    <main className="flex min-h-screen p-24">
      <div className="z-10 w-full max-w-5xl font-mono text-sm">
        <h1 className="mb-4">Validate form data</h1>

        <form onSubmit={handleSubmit(onSubmit, onError)} onReset={onReset}>
          <fieldset className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-4 mb-4 items-center">
            <legend className="col-span-2 mb-4">Fields</legend>

            {/* title */}
            <label htmlFor="title">
              Title
            </label>
            <select
              {...register('title')}
              className='text-black'
              defaultValue='' // required to fixes flash of 'MR.' option
            >
              {/* default value */}
              {['', ...titles].map((title) => (
                <option key={title} value={title} disabled={title === ''}>
                  {title === '' ? 'Please select a title' : title}
                </option>
              ))}
            </select>
            {errors.title && <p className="col-start-2">{errors.title.message}</p>}

            {/* firstName */}
            <label htmlFor="firstName">First name</label>
            <input
              {...register('firstName')}
              className='text-black'
              id="firstName"
              type="text"
            />
            {errors.firstName && <p className="col-start-2">{errors.firstName.message}</p>}

            {/* lastName */}
            <label htmlFor="lastName">Last name</label>
            <input
              {...register('lastName')}
              className='text-black'
              id="lastName"
              type="text"
            />
            {errors.lastName && <p className="col-start-2">{errors.lastName.message}</p>}

            {/* middleName */}
            <label htmlFor="middleName">Last name</label>
            <input
              {...register('middleName')}
              className='text-black'
              id="middleName"
              type="text"
              // onChange={(event: ChangeEvent<HTMLInputElement>) => {
              //   const inputValue = event.target.value;
              //   const newValue = inputValue !== '' ? inputValue : undefined;
              //   setValue('middleName', newValue);
              // }}
            />
            {errors.middleName && <p className="col-start-2">{errors.middleName.message}</p>}

            {/* has cats */}
            <label htmlFor="hasCats">Has cats</label>
            <input
              {...register('hasCats')}
              className='text-black'
              id="hasCats"
              type="checkbox"
            />
            {errors.hasCats && <p className="col-start-2">{errors.hasCats.message}</p>}

            {/* numberOfCats */}
            <label htmlFor="numberOfCats">Last name</label>
            <input
              {...register('numberOfCats')}
              className='text-black'
              id="numberOfCats"
              type="text"
              // onChange={(event: ChangeEvent<HTMLInputElement>) => {
              //   const inputValue = event.target.value;
              //   const newValue = inputValue !== '' ? parseInt(inputValue, 10) : undefined;
              //   setValue('numberOfCats', newValue);
              // }}
            />
            {errors.numberOfCats && <p className="col-start-2">{errors.numberOfCats.message}</p>}
          </fieldset>

          {isDirty && !isValid && <p className="mb-4">Form contains errors.</p>}

          <div className="flex gap-4 mb-4">
            <button type="reset" className="p-2 border border-white">
              Reset
            </button>
            <button type="submit" className="p-2 border border-white">
              Submit
            </button>
          </div>
        </form>

        <BackButton cssClass="mt-4" />
      </div>
    </main>
  );
}
