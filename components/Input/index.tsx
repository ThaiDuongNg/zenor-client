import React from "react";
import InputProps from "./Input.interface";
import { Input, Tooltip } from "@nextui-org/react";
import { ErrorMessage } from "formik";
import { Size } from "../../interfaces";
import styles from "./Input.module.scss";

const index = ({
  name,
  type,
  value,
  onChange,
  placeholder,
  className,
  form,
  onBlur,
  isTooltip,
  contentTooltip,
  ...props
}: InputProps<any, any>) => {
  const inputName = name || props?.field?.name || "";
  const inputValue = value || props.field?.value;
  const inputOnChange = onChange || props.field?.onChange;
  const inputOnBlur = onBlur || props.field?.onBlur;
  const { errors, touched } = form ?? {};

  const renderInput = () => (
    <>
      <Input
        style={{ width: "100%" }}
        placeholder={placeholder}
        name={inputName}
        size={Size.Lg}
        // css={{ width: "100%" }}
        type={type}
        value={inputValue}
        onChange={inputOnChange}
        onBlur={inputOnBlur}
        className={`${className}`}
        // className={styles.custom_input}
      />
      {touched?.[inputName] && errors?.[inputName] && (
        <span className={styles.span_error}>
          <ErrorMessage name={inputName || ""} />
        </span>
      )}
    </>
  );

  return (
    <div className={styles.custom_input}>
      {isTooltip ? (
        <Tooltip content={contentTooltip} placement="rightStart">
          {renderInput()}
        </Tooltip>
      ) : (
        renderInput()
      )}
    </div>
  );
};

export default index;
