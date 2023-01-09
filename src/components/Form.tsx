import React, { PropsWithChildren } from "react";
import { set } from "../lib/utils";

/**
 * Thanks to https://dev.to/pffigueiredo/typescript-utility-keyof-nested-object-2pa3
 */
export type NestedKeyOf<T extends object> = {
  [Key in keyof T & (string | number)]: T[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<T[Key]>}`
    : `${Key}`;
}[keyof T & (string | number)];

export enum FormIntemEvents {
  onChange = "onChange",
  onBlur = "onBlur",
}

export type ValidateData<Y> = {
  validation?: {
    errorMessages: string[];
    validateFunctions: Array<(value: Y, other?: unknown) => boolean>;
    validateOn: FormIntemEvents[];
  };
};

export type FormData<T extends object> = {
  path: NestedKeyOf<T>;
};

export function FormEventsFunctions<T extends object, Y>(params: {
  dataRef: React.MutableRefObject<T>;
  path: NestedKeyOf<T>;
  setValue: React.Dispatch<React.SetStateAction<Y>>;
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
  validate: ValidateData<Y>;
}) {
  const { setValue, setErrors, dataRef, path, validate } = params;
  const { validation } = validate;

  const checkErrors = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errors: string[] = [];
    if (validation) {
      validation.validateFunctions.forEach((validateFunction, index) => {
        if (!validateFunction(e.target.value as Y)) {
          errors.push(validation.errorMessages[index]);
        }
      });
    }
    setErrors(errors);
  };
  return {
    onChange: (e: React.ChangeEvent<HTMLInputElement>): void => {
      setValue(e.target.value as Y);
      set<T>(dataRef, path, e.target.value);
      if (validation?.validateOn.includes(FormIntemEvents.onChange)) {
        checkErrors(e);
      }
    },
    onBlur: (e: React.ChangeEvent<HTMLInputElement>): void => {
      set<T>(dataRef, path, e.target.value);
      if (validation?.validateOn.includes(FormIntemEvents.onBlur)) {
        checkErrors(e);
      }
    },
  };
}

export type SelectOptions = {
  options: Array<{
    name: string;
    value: string;
  }>;
};

function createDataContext<T extends object>() {
  return React.createContext({} as React.MutableRefObject<T>);
}

export const FormContext = createDataContext();

function createFormComponent<T extends object>() {
  return function FormComponent(
    props: PropsWithChildren<{ dataRef: React.MutableRefObject<T> }>
  ) {
    return (
      <FormContext.Provider value={props.dataRef}>
        {props.children}
      </FormContext.Provider>
    );
  };
}

export const Form = createFormComponent();
