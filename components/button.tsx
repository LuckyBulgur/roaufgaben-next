import { ElementType, FC, HTMLProps } from "react";
import { Button, ButtonOwnProps } from "evergreen-ui";

interface Props extends ButtonOwnProps {
    appearance?: "primary" | "minimal" | "default";
}

const button: FC<Props> = ({
    className,
    children,
    ...props
}) => {
    return <button type="submit" className={"p-6 " + className} {...props}>{children}</button>;
};

export default button;