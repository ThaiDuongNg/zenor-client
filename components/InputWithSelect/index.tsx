import { ErrorMessage, FormikHelpers, FormikState } from "formik";
import React, { useEffect } from "react";
import ReactSelect from "react-select";

const options: any = [
  { value: "and", label: "and" },
  { value: "with", label: "with" },
  { value: "feat.", label: "feat." },
  { value: "ft.", label: "ft." },
  { value: "pres.", label: "pres." },
  { value: "vs", label: "vs" },
  { value: "x", label: "x" },
  { value: "&", label: "&" },
];

interface Props {
  label?: string;
  name?: string;
  isLast?: boolean;
  index: number;
  field?: any;
  placeholder?: string;
  isActiveSelect?: boolean;
  selectName?: string;
  arrrayName: string;
  onChangeName?: () => void;
  onBlur?: () => void;
  form?: FormikHelpers<any> & FormikState<any>;
  defaultValue: any;
}
//"and", "with", "feat.", "ft.", "pres.", "vs", "x", "&"
const InputArtist = ({
  label,
  onChangeName,
  isLast,
  name,
  field,
  form,
  onBlur,
  placeholder,
  isActiveSelect,
  selectName,
  index,
  arrrayName,
  defaultValue,
  ...props
}: Props) => {
  const nameField = name || field?.name;
  const nameOnchange = onChangeName || field?.onChange;
  const nameOnBlur = onBlur || field?.onBlur;
  const { errors, touched, setFieldValue } = form ?? {};

  useEffect(() => {
    if (isActiveSelect) {
      setFieldValue && setFieldValue(selectName as string, "");
    }
  }, [isActiveSelect]);

  return (
    <div className="mb-2">
      {/* <label className="form-label">{label}</label> */}
      <div className="d-flex" style={{ gap: 2 }}>
        <input
          // type={type}
          style={{ flex: 2 }}
          className={`form-control ${
            touched?.[arrrayName]?.[index] &&
            errors?.[arrrayName]?.[index] &&
            "is-invalid"
          }`}
          id={nameField}
          defaultValue={defaultValue.name}
          // value={field.value}
          placeholder={placeholder}
          onChange={nameOnchange}
          onBlur={nameOnBlur}
          data-toggle="tooltip"
          data-placement="right"
        />
        <div style={{ flex: 1 }}>
          <ReactSelect
            // className={`${
            //   touched?.[nameField] && errors?.[nameField] && "is-invalid"
            // }`}
            // styles
            isSearchable={false}
            defaultValue={options.find(
              (_: any) => _.value === defaultValue.link
            )}
            placeholder={""}
            isDisabled={isActiveSelect}
            onChange={(event) => {
              if (event?.value) {
                setFieldValue &&
                  setFieldValue(selectName as string, event?.value || "");
              }
            }}
            options={options}
          />
        </div>
      </div>

      {/* <span className={"invalid-feedback"}>asfs</span> */}
      {/* {touched?.[arrrayName]?.[index] && errors?.[arrrayName]?.[index] && (
        <span className={"invalid-feedback"} style={{ fontSize: 14 }}>
          <ErrorMessage name={nameField || ""} /> akk
        </span>
      )} */}
    </div>
  );
};

export default InputArtist;
