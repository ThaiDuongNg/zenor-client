import { ErrorMessage, FormikHelpers, FormikState } from "formik";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import PopoverWrap from "components/PopoverWrap";

interface Props {
  options: any[];
  label?: string;
  name?: string;
  contentTooltip?: string;
  placeholder?: string;
  onChange?: (item: any) => void;
  field?: any;
  form?: FormikHelpers<any> & FormikState<any>;
  value?: any;
}

const index = ({
  options,
  placeholder,
  name,
  field,
  form,
  onChange,
  label,
  contentTooltip,
  value,
}: Props) => {
  const nameField = name || field?.name;
  const [isShow, setIsShow] = useState<boolean>(false);
  const { errors, touched, setFieldValue, values } = form ?? {};
  const [data, setData] = useState<{ label: string; value: string } | null>();

  const handleChange = (selectedOption: any) => {
    // console.log(selectedOption, "selectedOption");
    setData(selectedOption);
    setFieldValue && setFieldValue(nameField, selectedOption.value);
  };

  const inputOnChange = onChange || handleChange;

  const onClose = () => {
    isShow && setIsShow(false);
  };

  const onOpen = () => {
    contentTooltip && setIsShow(true);
  };

  console.log("value1111: ", { options, value });
  // console.log("options: ", options);

  return (
    <div className="mb-2">
      <label htmlFor={nameField} className="form-label">
        {label}
      </label>
      <PopoverWrap label={label} content={contentTooltip} isShow={isShow}>
        <Select
          onMenuOpen={onOpen}
          onMenuClose={onClose}
          className={`${
            touched?.[nameField] && errors?.[nameField] && "is-invalid"
          }`}
          placeholder={placeholder}
          defaultValue={value}
          onChange={inputOnChange}
          options={options}
        />
      </PopoverWrap>
      {touched?.[nameField] && errors?.[nameField] && (
        <span className={"invalid-feedback"} style={{ fontSize: 14 }}>
          <ErrorMessage name={nameField || ""} />
        </span>
      )}
    </div>
  );
};

export default index;
