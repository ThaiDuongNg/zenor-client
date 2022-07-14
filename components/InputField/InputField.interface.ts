import { FormElement } from "@nextui-org/react";
import { FieldInputProps, FormikState, FormikHelpers } from "formik";
import { ReactNode } from "react";
import { boolean } from "yup";
import { TypeInput } from "../../interfaces";

interface ICustomFieldInputProps<T, V> {
  children?: any;
  field?: FieldInputProps<T>;
  form?: FormikHelpers<V>&FormikState<any>;
}
interface InputProps<T, V> extends ICustomFieldInputProps<any, any> {
  animated?: boolean;
  disabled?: boolean;
  type?: TypeInput;
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<FormElement>) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  name?: string;
  props?: any;
  field?: FieldInputProps<T>;
  form?: FormikHelpers<V>&FormikState<any>;
  isTooltip?: boolean;
  contentTooltip?: string;
}

export default InputProps;
