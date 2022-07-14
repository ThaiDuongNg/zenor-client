import { Radio } from "@nextui-org/react";
import React from "react";

interface Props {
  refFormik: any;
  nameField: string;
  defaultValue?: number;
}

function index(props: Props) {
  const { refFormik, nameField, defaultValue = 1 } = props;

  return (
    <Radio.Group
      onChange={(value: string | number) => {
        if (refFormik?.current) {
          refFormik.current.setFieldValue(nameField, value === 0);
        }
      }}
      row
      value={defaultValue}
    >
      <Radio value={0}>Có</Radio>
      <Radio value={1}>Không</Radio>
    </Radio.Group>
  );
}

export default index;
