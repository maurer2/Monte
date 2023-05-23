'use client';

import { useReducer } from 'react';
import type { ChangeEvent } from 'react';
import { Listbox, Combobox } from '@headlessui/react';

import BackButton from '@/components/BackButton';

import { schema } from '../../schema/schema';
import type { Schema } from '../../schema/schema.types';

const FORM_VALUES_ACTION_NAMES = {
  SET_VALUE: 'setValue',
  RESET: 'reset',
} as const;

type SetValueAction<T, K extends keyof T> = {
  type: typeof FORM_VALUES_ACTION_NAMES.SET_VALUE;
  payload: {
    key: K;
    value: T[K];
  };
};

type ResetAction = {
  type: typeof FORM_VALUES_ACTION_NAMES.RESET;
  payload: null;
};

const initialFormState: Schema = {
  title: 'Mr.',
  firstName: '',
  lastName: '',
  hasCats: false,
  // numberOfCats: 1,
  // middleName: '',
};

function formValuesReducer<K extends keyof Schema>(
  state: Schema,
  action: SetValueAction<Schema, K> | ResetAction,
) {
  const { type, payload } = action;

  switch (type) {
    case FORM_VALUES_ACTION_NAMES.SET_VALUE:
      const { key, value } = payload;

      return {
        ...state,
        [key]: value,
      };
    case FORM_VALUES_ACTION_NAMES.RESET:
      return initialFormState;
    default:
      return state;
  }
}

export default function ValidateFormData() {
  const [formValues, dispatchFormValues] = useReducer(formValuesReducer, initialFormState);
  console.log(formValues);

  function dispatchFormValuesTyped<K extends keyof Schema>(payload: SetValueAction<Schema, K> | ResetAction): void {
    dispatchFormValues(payload);
  }

  return (
    <main className="flex min-h-screen p-24">
      <div className="z-10 w-full max-w-5xl font-mono text-sm">
        <h1 className="mb-4">Validate form data</h1>

        <form action="" onReset={() => null} onSubmit={() => null}>
          <fieldset className="grid grid-cols-[min-content_1fr] gap-x-4 gap-y-4 mb-4 items-center">
            <legend className="col-span-2 mb-4">Fields</legend>

            {/* firstName */}
            <Combobox value={formValues.firstName}>
              <Combobox.Label>firstName</Combobox.Label>
              <Combobox.Input
                className="text-black"
                onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                  dispatchFormValuesTyped({
                    type: FORM_VALUES_ACTION_NAMES.SET_VALUE,
                    payload: {
                      key: 'firstName',
                      value: event.target.value,
                      // value: 5 // test type security
                    },
                  });
                }}
                displayValue={(value: Schema['firstName']) => value}
              />
            </Combobox>

            {/* lastName */}
            <Combobox value={formValues.lastName}>
              <Combobox.Label>lastName</Combobox.Label>
              <Combobox.Input
                className="text-black"
                onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                  dispatchFormValuesTyped({
                    type: FORM_VALUES_ACTION_NAMES.SET_VALUE,
                    payload: {
                      key: 'lastName',
                      value: event.target.value,
                    },
                  });
                }}
                displayValue={(value: Schema['lastName']) => value}
              />
            </Combobox>
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

        <code>
          <pre>{JSON.stringify(formValues, undefined, 4)}</pre>
        </code>

        <BackButton cssClass="mt-4" />
      </div>
    </main>
  );
}
