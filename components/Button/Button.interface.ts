import { Size } from "../../interfaces";

interface ButtonProps {
    title: string;
    type: any;
    size?: Size;
    loading?: boolean;
    onClick?: () => void;
    disabled?: boolean;
    icon?: any;
    // type?: ButtonType;
    // className?: string;
    // htmlType?: ButtonHTMLTypes,
}

export default ButtonProps