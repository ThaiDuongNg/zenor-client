import { ErrorMessage, FormikHelpers, FormikState } from "formik";
import React, { useCallback, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DatePicker.module.scss";
import PopoverWrap from "components/PopoverWrap";

interface Props {
  value?: any;
  name: string;
  label?: string;
  contentTooltip?: string;
  field?: any;
  form?: FormikHelpers<any> & FormikState<any>;
  minDate?: Date;
  maxDate?: Date;
  onSelect?: (e: Date) => void;
}

const index = ({
  name,
  label,
  value,
  contentTooltip,
  field,
  form,
  onSelect,
  minDate,
  maxDate,
}: Props) => {
  const ref = useRef(null);
  const [isShow, setIsShow] = useState<boolean>(false);
  const nameField = name || field?.name;
  const ValueField = value || field?.value;
  const { errors, touched, setFieldValue, values } = form ?? {};
  const handleSelect = useCallback((date: Date) => {
    setFieldValue && setFieldValue(nameField, date);
  }, []);

  const onSelectDate = onSelect || handleSelect;

  return (
    <div className="mb-2">
      <label htmlFor={nameField} className="form-label">
        {label}
      </label>
      <PopoverWrap label={label} content={contentTooltip} isShow={isShow}>
        <DatePicker
          minDate={minDate}
          maxDate={maxDate}
          onFocus={() => {
            contentTooltip && setIsShow(true);
          }}
          onBlur={() => {
            isShow && setIsShow(false);
          }}
          className="form-control"
          name={nameField}
          wrapperClassName="datePicker"
          ref={ref}
          selected={ValueField}
          onChange={onSelectDate}
        />
      </PopoverWrap>
      {touched?.[nameField] && errors?.[nameField] && (
        <span className={styles.span_error}>
          <ErrorMessage name={nameField || ""} />
        </span>
      )}
    </div>
  );
};

export default index;
