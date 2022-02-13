import classnames from 'classnames';
import { FC } from 'react';


interface CardProps {
    title: string;
    className?: string;
}

const Title: FC = ({ children }) => {
    return (
        <h1 className="text-xl sm:text-2xl text-fontwhite text-center mb-7">{children}</h1>
    );
}

export const CardItem: FC = ({ children }) => {
    return (
        <div className="rounded-lg mt-4 bg-myblue bg-opacity-50 shadow-lg p-3 text-fontwhite font-sans text-xl">
            {children}
        </div>
    );
}

const Card: FC<CardProps> = ({ className, children, ...props }) => {
    return (
        <div className={classnames("bg-myblue w-96 bg-opacity-20 backdrop-blur-xl p-7 rounded-xl", className)}>
            <Title>{props.title}</Title>
            {children}
        </div>
    );
}

export default Card;