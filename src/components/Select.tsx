import { SelectHTMLAttributes, useContext, useState } from "react";
import { get } from "../lib/utils";
import { FormContext, FormData, SelectOptions, ValidateData } from "./Form";

const Select = <T extends object, Y>(
  props: FormData<T> &
    SelectHTMLAttributes<HTMLSelectElement> &
    SelectOptions &
    ValidateData<Y>
) => {
  const dataRef = useContext(FormContext) as React.MutableRefObject<T>;
  const { path, validation, ...itemProps } = props;

  const [value, setValue] = useState<Y>(get(dataRef, props.path));
  const [error, setError] = useState<boolean>(false);
  return (
    <>
      <select {...itemProps} value={get(dataRef, props.path)}>
        {props.options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
