import React from "react";
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
    errorMessage: string;
    validateFunction: (value: Y, other?: unknown) => boolean;
    validateOn: FormIntemEvents[];
  };
};

export type FormData<T extends object> = {
  dataRef: React.MutableRefObject<T>;
  path: NestedKeyOf<T>;
};

export function FormEventsFunctions<T extends object, Y>(params: {
  dataRef: React.MutableRefObject<T>;
  path: NestedKeyOf<T>;
  setValue: React.Dispatch<React.SetStateAction<Y>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  validate: ValidateData<Y>;
}) {
  const { setValue, setError, dataRef, path, validate } = params;
  const { validation } = validate;
  return {
    onChange: (e: React.ChangeEvent<HTMLInputElement>): void => {
      setValue(e.target.value as Y);
      set<T>(dataRef, path, e.target.value);
      if (validation?.validateOn.includes(FormIntemEvents.onChange)) {
        if (validation.validateFunction(e.target.value as Y)) {
          setError(false);
        } else {
          setError(true);
        }
      }
    },
    onBlur: (e: React.ChangeEvent<HTMLInputElement>): void => {
      set<T>(dataRef, path, e.target.value);
      if (validation?.validateOn.includes(FormIntemEvents.onBlur)) {
        if (validation.validateFunction(e.target.value as Y)) {
          setError(false);
          // set dataRef Value
        } else {
          setError(true);
        }
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
