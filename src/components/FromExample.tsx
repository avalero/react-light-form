import React, { FC, useRef } from "react";
import { Locations, UserDetails } from "../types";
import { FormIntemEvents } from "./Form";
import Input from "./Input";
import Select from "./Select";

export const FormExample: FC<{ data: UserDetails }> = (props) => {
  const data = useRef<UserDetails>(props.data);

  return (
    <>
      <Input<UserDetails, string>
        type="text"
        label="User"
        name="user"
        dataRef={data}
        path="user"
      />
      <br />
      {/* Example of input with validation */}
      <Input<UserDetails, string>
        type="number"
        label="Age"
        dataRef={data}
        path="age"
        validation={{
          errorMessage: "You must be at least 18 years old",
          validateFunction: (value) => Number(value) >= 18,
          validateOn: [FormIntemEvents.onBlur],
        }}
      />
      <br />
      <Input<UserDetails, string>
        dataRef={data}
        label="Address"
        path="location.address"
        type="text"
      />
      <br />
      <Select<UserDetails, Locations>
        dataRef={data}
        path="location.city"
        options={[
          { name: "Madrid", value: String(Locations.Madrid) },
          { name: "Barcelona", value: String(Locations.Barcelona) },
        ]}
      />
    </>
  );
};
