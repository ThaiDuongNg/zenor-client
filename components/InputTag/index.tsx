import {
  ErrorMessage,
  FieldInputProps,
  FormikHelpers,
  FormikState,
} from "formik";
import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import styles from "./InputTag.module.scss";

interface Props {
  name?: string;
  label?: string;
  value?: any;
  onChange?: () => void;
  placeholder?: string;
  form?: FormikHelpers<any> & FormikState<any>;
  field?: FieldInputProps<any>;
}

const index = ({
  name,
  label,
  value,
  onChange,
  placeholder,
  form,
  field,
}: Props) => {
  const inputName = name || field?.name || "";
  const inputValue = value || field?.value;
  const inputOnChange = onChange || field?.onChange;
  // const inputOnBlur = onBlur || field?.onBlur;
  const { errors, touched, setFieldValue } = form ?? {};

  return (
    <>
      <div className="mb-2">
        <label htmlFor={inputName} className="form-label">
          {label}
        </label>
        <span
          className={`${
            touched?.[inputName] && errors?.[inputName] && "is-invalid"
          }`}
        ></span>
        <TagsInput
          onChange={(value: any) => {
            setFieldValue && setFieldValue(inputName, value);
          }}
          name={inputName}
          placeHolder={placeholder}
        />
        {touched?.[inputName] && errors?.[inputName] && (
          <span className={"invalid-feedback"}>
            <ErrorMessage name={inputName || ""} />
          </span>
        )}
      </div>
    </>
  );
};

export default index;
