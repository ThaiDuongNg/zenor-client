import React, { useEffect, useState } from "react";
import InputProps from "./InputField.interface";
import { ErrorMessage } from "formik";
import PopoverWrap from "components/PopoverWrap";

const index = ({
  name,
  type,
  label,
  value,
  onChange,
  placeholder,
  className,
  form,
  onBlur,
  contentTooltip,
  disabled,
  ...props
}: InputProps<any, any>) => {
  const inputName = name || props?.field?.name || "";
  const inputValue = value || props.field?.value;
  const inputOnChange = onChange || props.field?.onChange;
  const inputOnBlur = onBlur || props.field?.onBlur;
  const { errors, touched } = form ?? {};
  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <div className="mb-2">
      <label htmlFor={inputName} className="form-label">
        {label}
      </label>
      <PopoverWrap isShow={isShow} label={label} content={contentTooltip}>
        <input
          onClick={() => {
            contentTooltip && setIsShow(true);
          }}
          onBlurCapture={() => {
            isShow && setIsShow(false);
          }}
          type={type}
          className={`form-control ${
            touched?.[inputName] && errors?.[inputName] && "is-invalid"
          }`}
          disabled={disabled}
          id={inputName}
          placeholder={placeholder}
          value={inputValue}
          onChange={inputOnChange}
          onBlur={inputOnBlur}
        />
      </PopoverWrap>

      {touched?.[inputName] && errors?.[inputName] && (
        <div className="invalid-feedback">
          <ErrorMessage name={inputName || ""} />
        </div>
      )}
    </div>
  );
};

export default React.memo(index);
