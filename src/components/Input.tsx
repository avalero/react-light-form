import { InputHTMLAttributes, useState } from "react";
import { get } from "../lib/utils";
import { FormData, FormEventsFunctions, ValidateData } from "./Form";

type CustoInputProps = {
  label: string;
};

const Input = <T extends object, Y>(
  props: FormData<T> &
    InputHTMLAttributes<HTMLInputElement> &
    CustoInputProps &
    ValidateData<Y>
) => {
  const [value, setValue] = useState<Y>(get(props.dataRef, props.path));
  const [error, setError] = useState<boolean>(false);

  const { dataRef, path, validation, label, ...itemProps } = props;
  return (
    <>
      <span>{label}</span>
      <input
        value={value as string | number | readonly string[] | undefined}
        {...FormEventsFunctions<T, Y>({
          setValue,
          setError,
          dataRef,
          path: path as any,
          validate: { validation },
        })}
        {...itemProps}
      />
      {error && <span>{validation?.errorMessage}</span>}
    </>
  );
};

export default Input;
