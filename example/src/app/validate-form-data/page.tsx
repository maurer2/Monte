'use client';

import { useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { DefaultValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import { DevTool } from '@hookform/devtools';

import BackButton from '@/components/BackButton';

import { schema } from '../../schema/schema';
import { titles, daysOfWorkWeek, minimumDaysInTheOffice } from '../../schema/schema.constants';
import type { Schema } from '../../schema/schema.types';

// https://stackoverflow.com/questions/73582246/zod-schema-how-to-make-a-field-optional-or-have-a-minimum-string-contraint

const initialFormState: DefaultValues<Schema> = {
  title: null,
  firstName: '',
  middleName: undefined,
  lastName: '',
  hasCats: false,
  numberOfCats: undefined,
  daysInTheOffice: [],
};
const titlesWithDefaultValue = ['', ...titles];

export default function ValidateFormData() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    trigger,
    control,
  } = useForm<Schema>({
    defaultValues: initialFormState,
    resolver: zodResolver(schema),
  });
  const [hasCats, daysInTheOffice] = watch(['hasCats', 'daysInTheOffice']);

  // trigger numberOfCats validation, when hasCats is toggled
  useEffect(() => {
    trigger('numberOfCats');
    // todo only trigger when other errors are also shown
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

  // console.log(errors);
  // console.log(watch());

  return (
    <main className="flex min-h-screen p-24">
      <div className="z-10 w-full max-w-5xl font-mono text-sm">
        <h1 className="mb-4">Validate form data</h1>

        {/* <DevTool control={control} placement="top-right" /> */}

        <form onSubmit={handleSubmit(onSubmit, onError)} onReset={onReset}>
          <fieldset className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-4 mb-4 items-center">
            <legend className="col-span-2 mb-4">Fields</legend>

            {/* title */}
            <Controller
              control={control}
              name="title"
              render={({
                field: {
                  onChange, onBlur, value, name, ref,
                },
                fieldState: {
                  error,
                },
                // formState
              }) => (
                <>
                  <label htmlFor="title">Title</label>
                  <select
                    className="text-black"
                    id={name}
                    name={name}
                    onBlur={onBlur}
                    onChange={(event: ChangeEvent<HTMLSelectElement>): void => {
                      const currentValue: string = event.target.value;
                      const nextValue = currentValue === ''
                        ? null
                        : currentValue;

                      onChange(nextValue);
                    }}
                    value={value === null ? '' : value}
                    ref={ref}
                  >
                    {titlesWithDefaultValue.map((title, index) => (
                      <option key={title} value={title} disabled={index === 0}>
                        {title === '' ? 'Please select a title' : title}
                      </option>
                    ))}
                  </select>
                  {error?.message && <p className="col-start-2">{error.message}</p>}
                </>
              )}
            />

            {/* firstName */}
            <label htmlFor="firstName">First name</label>
            <input
              {...register('firstName')}
              className="text-black"
              id="firstName"
              type="text"
            />
            {errors.firstName && <p className="col-start-2">{errors.firstName.message}</p>}

            {/* lastName */}
            <label htmlFor="lastName">Last name</label>
            <input
              {...register('lastName')}
              className="text-black"
              id="lastName"
              type="text"
            />
            {errors.lastName && <p className="col-start-2">{errors.lastName.message}</p>}

            {/* middleName */}
            <Controller
              control={control}
              name="middleName"
              render={({
                field: {
                  onChange, onBlur, name, ref, value,
                },
                fieldState: {
                  error,
                },
                // formState
              }) => (
                <>
                  <label htmlFor="middleName">Middle name</label>
                  <input
                    id={name}
                    name={name}
                    onBlur={onBlur}
                    onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                      const currentValue: string = event.target.value;
                      const nextValue = currentValue === ''
                        ? undefined
                        : currentValue;

                      onChange(nextValue);
                    }}
                    value={value === undefined ? '' : value}
                    ref={ref}
                    type="text"
                    className="text-black"
                  />
                  {error && <p className="col-start-2">{error.message}</p>}
                </>
              )}
            />

            {/* hasCats */}
            <label htmlFor="hasCats">Has cats</label>
            <input
              {...register('hasCats')}
              className="text-black"
              id="hasCats"
              type="checkbox"
            />
            {errors.hasCats && <p className="col-start-2">{errors.hasCats.message}</p>}

            {/* numberOfCats */}
            <Controller
              control={control}
              name="numberOfCats"
              render={({
                field: {
                  onChange, onBlur, name, ref, value,
                },
                fieldState: {
                  error,
                },
                // formState
              }) => (
                <>
                  <label htmlFor="numberOfCats">Number of Cat</label>
                  <input
                    id={name}
                    name={name}
                    onBlur={onBlur}
                    onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                      const currentValue: string = event.target.value;
                      const nextValue = currentValue === ''
                        ? undefined
                        : currentValue;

                      onChange(nextValue);
                    }}
                    value={value === undefined ? '' : value}
                    ref={ref}
                    type="text"
                    className="text-black"
                  />
                  {error && <p className="col-start-2">{error.message}</p>}
                </>
              )}
            />

            {/* daysInTheOffice */}
            <span className="self-start">Days in the office</span>
            <div className="grid grid-cols-[repeat(5,min-content)_auto] gap-4">
              <ol className="contents">
                {daysOfWorkWeek.map((day) => (
                  <li key={day} className="contents">
                    <label
                      htmlFor={day}
                      className="row-start-1 row-end-1"
                    >
                      {day}
                    </label>
                    <input
                      {...register('daysInTheOffice')}
                      id={day}
                      value={day}
                      className="text-black row-start-2 row-end-2"
                      type="checkbox"
                    />
                  </li>
                ))}
              </ol>
              {errors.daysInTheOffice && <p className="row-start-3 row-end-3 col-span-full">{errors.daysInTheOffice.message}</p>}
              <span className="pl-4 row-start-1 row-end-1">
                <span>Mandatory days in the office: </span>
                <code>{minimumDaysInTheOffice}</code>
              </span>
              <label htmlFor="daysInTheOfficeMeter" className="row-start-2 row-end-2 pl-4">
                <span>Number of selected days: </span>
                <code>{daysInTheOffice.length}</code>
                <meter
                  min={0}
                  max={daysOfWorkWeek.length}
                  value={daysInTheOffice.length}
                  id="daysInTheOfficeMeter"
                  className="w-32 pl-4"
                />
              </label>
            </div>
          </fieldset>

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
