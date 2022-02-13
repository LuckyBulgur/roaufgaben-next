import { FC } from "react";

export const Title: FC = ({ children }) => {
    return (
        <h1 className="text-4xl sm:text-6xl text-fontwhite text-center mb-7">{children}</h1>
    );
}