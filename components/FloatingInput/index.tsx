import React, { useState } from "react";
import InputProps from "./FloatingInput.interface";
import { ErrorMessage } from "formik";
import PopoverWrap from "components/PopoverWrap";

const index = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  className,
  form,
  onBlur,
  contentTooltip,
  required,
  ...props
}: InputProps<any, any>) => {
  const inputName = name || props?.field?.name || "";
  const inputValue = value || props.field?.value;
  const inputOnBlur = onBlur || props.field?.onBlur;
  const { errors, touched, setFieldValue } = form ?? {};
  const [isShow, setIsShow] = useState<boolean>(false);

  const onChangeField = (e: any) => {
    setFieldValue && setFieldValue(inputName, e.target.value);
  };

  const inputOnChange = onChange || onChangeField;

  return (
    <div className="form-floating mb-3">
      <PopoverWrap isShow={isShow} label={label} content={contentTooltip}>
        <input
          type={type}
          className={`form-control ${
            touched?.[inputName] && errors?.[inputName] && "is-invalid"
          }`}
          onClick={() => {
            contentTooltip && setIsShow(true);
          }}
          onBlurCapture={() => {
            isShow && setIsShow(false);
          }}
          onBlur={inputOnBlur}
          onChange={inputOnChange}
          placeholder={placeholder}
          defaultValue={inputValue}
          required={required}
        />
      </PopoverWrap>
      <label htmlFor="floatingInput">{label}</label>
      {touched?.[inputName] && errors?.[inputName] && (
        <div id="validationServerUsernameFeedback" className="invalid-feedback">
          <ErrorMessage name={inputName || ""} />
        </div>
      )}
    </div>
  );
};

export default index;
