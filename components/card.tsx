import classnames from 'classnames';
import { FC } from 'react';


interface CardProps {
    title: string;
    className?: string;
}

export const CardItem: FC = ({ children }) => {
    return (
        <div className="rounded-lg mt-4 dark:bg-myblue bg-gray-500 dark:bg-opacity-50 shadow-lg p-3 text-fontwhite font-sans text-xl">
            {children}
        </div>
    );
}

const Card: FC<CardProps> = ({ className, children, ...props }) => {
    return (
        <div className={classnames("dark:bg-myblue dark:bg-opacity-20 bg-gray-400 backdrop-blur-xl p-7 rounded-xl", className)}>
            <h1 className='text-xl sm:text-2xl text-gray-800 dark:text-fontwhite text-center mb-7 font-bold'>{props.title}</h1>
            {children}
        </div>
    );
}

export default Card;