import React, { FC, useRef } from "react";
import { Locations, UserDetails } from "../types";
import { Form, FormIntemEvents } from "./Form";
import Input from "./Input";
import Select from "./Select";
import styled from "@emotion/styled";
import StyledInput from "./StyledInput";

export const FormExample: FC<{ data: UserDetails }> = (props) => {
  const data = useRef<UserDetails>(props.data);

  return (
    <>
      <Form dataRef={data}>
        <StyledInput<UserDetails, string>
          CustomComponent={MyStyledInput}
          type="text"
          label="User"
          name="user"
          path="user"
        />
        <br />
        {/* Example of input with validation */}
        <Input<UserDetails, string>
          type="number"
          label="Age"
          path="age"
          validation={{
            errorMessages: [
              "You must be at least 18 years old",
              "You must be younger than 60",
            ],
            validateFunctions: [
              (value) => Number(value) >= 18,
              (value) => Number(value) < 60,
            ],
            validateOn: [FormIntemEvents.onBlur],
          }}
        />
        <br />
        <Input<UserDetails, string>
          label="Address"
          path="location.address"
          type="text"
        />
        <br />
        <Select<UserDetails, Locations>
          path="location.city"
          options={[
            { name: "Madrid", value: String(Locations.Madrid) },
            { name: "Barcelona", value: String(Locations.Barcelona) },
          ]}
        />
      </Form>
    </>
  );
};

const MyStyledInput = styled(Input)`
  background-color: #7a788f;
  color: white;
  border-radius: 5px;
  padding: 5px;
  margin: 10px;
`;
