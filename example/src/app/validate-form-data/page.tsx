'use client';

import type { ChangeEvent, FormEvent } from 'react';
import { Listbox, Combobox, Switch } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';

import BackButton from '@/components/BackButton';

import { schema } from '../../schema/schema';
import { titles } from '../../schema/schema.constants';
import type { Schema } from '../../schema/schema.types';

const initialFormState: Schema = {
  title: 'Mr.',
  firstName: '',
  middleName: undefined,
  lastName: '',
  hasCats: false,
  // numberOfCats: 1,
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
  } = useForm<Schema>({
    defaultValues: initialFormState,
    resolver: zodResolver(schema),
  });

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

  return (
    <main className="flex min-h-screen p-24">
      <div className="z-10 w-full max-w-5xl font-mono text-sm">
        <h1 className="mb-4">Validate form data</h1>

        <form onSubmit={handleSubmit(onSubmit, onError)} onReset={onReset}>
          <fieldset className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-4 mb-4 items-center">
            <legend className="col-span-2 mb-4">Fields</legend>

            {/* title */}
            <Listbox
              {...register('firstName')}
              value={getValues('title')}
              onChange={(value) => setValue('title', value)}
              as="div"
              className="contents"
            >
              <Listbox.Label>Title</Listbox.Label>
              <div className="relative text-left">
                <Listbox.Button className="p-2 block w-full text-left bg-white text-black">
                  {({ value }) => value}
                </Listbox.Button>
                <Listbox.Options className="absolute w-full border-t border-black bg-white text-black">
                  {titles.map((title) => (
                    <Listbox.Option key={title} value={title} className="p-2 cursor-pointer">
                      {title}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>

            {/* firstName */}
            <Combobox value={() => getValues('firstName')}>
              <Combobox.Label>First name</Combobox.Label>
              <Combobox.Input
                {...register('firstName')}
                displayValue={() => getValues('firstName')}
                className="text-black"
              />
              {errors.firstName && <p className="col-start-2">{errors.firstName.message}</p>}
            </Combobox>

            {/* lastName */}
            <Combobox value={() => getValues('lastName')}>
              <Combobox.Label>Last name</Combobox.Label>
              <Combobox.Input
                {...register('lastName')}
                displayValue={() => getValues('lastName')}
                className="text-black"
              />
              {errors.lastName && <p className="col-start-2">{errors.lastName.message}</p>}
            </Combobox>

            {/* middleName */}
            <Combobox value={() => getValues('middleName')} nullable>
              <Combobox.Label>Middle name</Combobox.Label>
              <Combobox.Input
                {...register('middleName')}
                displayValue={() => getValues('middleName') ?? ''}
                className="text-black"
                // overrides onChange returned by register()
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  const inputValue = event.target.value;
                  const newValue = inputValue !== '' ? inputValue : undefined;
                  setValue('middleName', newValue);
                  trigger('middleName');
                }}
              />
              {errors.middleName && <p className="col-start-2">{errors.middleName.message}</p>}
            </Combobox>

            {/* has cats */}
            <Switch.Group>
              <Switch.Label>Has cats</Switch.Label>
              <Switch
                {...register('hasCats')}
                checked={getValues('hasCats')}
                onChange={(value) => setValue('hasCats', value)}
                className={clsx('w-4 h-4 flex items-center border', {
                  'bg-black border-white': getValues('hasCats'),
                  'bg-white border-black ': !getValues('hasCats'),
                })}
              >
                <span className="ml-8">{getValues('hasCats') ? 'Yes' : 'No'}</span>
              </Switch>
            </Switch.Group>
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

        <pre>
          <code>{JSON.stringify(watch(), undefined, 4)}</code>
        </pre>

        <BackButton cssClass="mt-4" />
      </div>
    </main>
  );
}
