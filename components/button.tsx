import { ElementType, FC, HTMLProps } from "react";

interface ButtonProps {
    className?: string;
    children?: React.ReactNode;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

const button: FC<ButtonProps> = ({
    className,
    children,
    disabled,
    ...props
}) => {
    return <button disabled={disabled} type="submit" className={"p-6 " + className} {...props}>{children}</button>;
};

export default button;