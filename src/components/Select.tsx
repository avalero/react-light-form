import { SelectHTMLAttributes, useState } from "react";
import { get } from "../lib/utils";
import { FormData, SelectOptions, ValidateData } from "./Form";

const Select = <T extends object, Y>(
  props: FormData<T> &
    SelectHTMLAttributes<HTMLSelectElement> &
    SelectOptions &
    ValidateData<Y>
) => {
  const { dataRef, path, ...itemProps } = props;
  const [value, setValue] = useState<Y>(get(dataRef, path));
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
