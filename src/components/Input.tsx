import { InputHTMLAttributes, useContext, useState } from "react";
import { get } from "../lib/utils";
import {
  FormContext,
  FormData,
  FormEventsFunctions,
  ValidateData,
} from "./Form";

type CustomInputProps = {
  label: string;
};

const Input = <T extends object, Y>(
  props: FormData<T> &
    InputHTMLAttributes<HTMLInputElement> &
    CustomInputProps &
    ValidateData<Y>
) => {
  const dataRef = useContext(FormContext) as React.MutableRefObject<T>;
  const { path, validation, label, ...itemProps } = props;

  const [value, setValue] = useState<Y>(get(dataRef, props.path));
  const [errors, setErrors] = useState<string[]>([]);

  return (
    <>
      <span>{label}</span>
      <input
        value={value as string | number | readonly string[] | undefined}
        {...FormEventsFunctions<T, Y>({
          setValue,
          setErrors,
          dataRef,
          path: path as any,
          validate: { validation },
        })}
        {...itemProps}
      />
      {errors.length > 0 && <span>{errors.join("-")}</span>}
    </>
  );
};

export default Input;
