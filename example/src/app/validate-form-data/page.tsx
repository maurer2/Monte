'use client';

import { useReducer } from 'react';
import { Combobox } from '@headlessui/react';

import BackButton from '@/components/BackButton';

// import { schema } from '../../schema/schema';
import type { Schema } from '../../schema/schema.types';

const FORM_VALUES_ACTION_NAMES = {
  SET_VALUE: 'setValue',
  RESET: 'reset',
} as const;
type FormValuesActionNames = keyof typeof FORM_VALUES_ACTION_NAMES;

type FormValuesActions<K extends keyof Schema> = {
  [FORM_VALUES_ACTION_NAMES.SET_VALUE]: {
    type: typeof FORM_VALUES_ACTION_NAMES.SET_VALUE;
    payload: {
      key: K,
      value: Schema[K] // replace with mapped type, e.g Schema[K][number] for strings | Schema[K] for boolean and number }
    };
  };
  [FORM_VALUES_ACTION_NAMES.RESET]: {
    type: typeof FORM_VALUES_ACTION_NAMES.RESET;
    payload: null;
  };
};
type FormValuesActionsAsUnion = FormValuesActions<keyof Schema>[keyof FormValuesActions<keyof Schema>];

type X = Schema['firstName'][number]

const initialFormState: Schema = {
  title: 'Mr.',
  firstName: '',
  lastName: '',
  hasCats: false,
  // numberOfCats: 1,
  // middleName: '',
};

function formValuesReducer(state: Schema, action: FormValuesActionsAsUnion) {
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

  return (
    <main className="flex min-h-screen p-24">
      <div className="z-10 w-full max-w-5xl font-mono text-sm">
        <h1 className="mb-4">Validate form data</h1>

        <form action="" onReset={() => null} onSubmit={() => null}>
          <fieldset>
            <legend>Fields</legend>
            {/* firstName */}
            <Combobox value={formValues.firstName}>
              <Combobox.Input
                className="text-black"
                onChange={(event) =>
                  dispatchFormValues({
                    type: FORM_VALUES_ACTION_NAMES.SET_VALUE,
                    payload: {
                      key: 'firstName',
                      value: event.target.value,
                    },
                  })
                }
                displayValue={(value: string) => value}
              />
            </Combobox>
          </fieldset>
          <button type="reset">Reset</button> <button type="submit">Submit</button>

          <code>
            <pre>
              {JSON.stringify(formValues, undefined, 4)}
            </pre>
          </code>
        </form>

        <BackButton cssClass="mt-4" />
      </div>
    </main>
  );
}
