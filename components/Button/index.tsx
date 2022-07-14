import React from "react";
import ButtonProps from "./Button.interface";
import { Button, Loading } from "@nextui-org/react";
import { Size, TypeButton } from "interfaces/index";

const defaultProps = {
  loading: false,
  size: Size.Md,
  type: TypeButton.Button,
};

const index = ({
  title,
  type,
  size,
  loading,
  onClick,
  disabled,
  icon,
}: ButtonProps & typeof defaultProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      size={size}
      icon={icon}
      type={type}
    >
      {loading ? (
        <Loading type="points" color="currentColor" size={size} />
      ) : (
        title
      )}
    </Button>
  );
};

export default index;
