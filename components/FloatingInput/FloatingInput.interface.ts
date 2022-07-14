import { FormElement } from "@nextui-org/react";
import { FieldInputProps, FormikState, FormikHelpers } from "formik";
import { ReactNode } from "react";
import { TypeInput } from "../../interfaces";

interface ICustomFieldInputProps<T, V> {
  children?: any;
  field?: FieldInputProps<T>;
  form?: FormikHelpers<V>&FormikState<any>;
}
interface InputProps<T, V> extends ICustomFieldInputProps<any, any> {
  animated?: boolean;
  label: string;
  type?: TypeInput;
  value?: string;
  onChange?: (e: React.ChangeEvent<FormElement>) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  name?: string;
  props?: any;
  field?: FieldInputProps<T>;
  form?: FormikHelpers<V>&FormikState<any>;
  contentTooltip?: string;
  required?:boolean;
}

export default InputProps;
