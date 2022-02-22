import { HTMLProps } from 'react';
import { FC } from 'react';

const Nav: FC = ({ children }) => {
    return (
        <nav className="flex h-20 justify-between items-center">
            {children}
        </nav>
    )
}

export const Title: FC = ({ children }) => {
    return (
        <div className="text-fontwhite text-lg font-medium font-sans ml-5">{children}</div>
    );
}

export const Link: FC<HTMLProps<HTMLAnchorElement>> = ({ children, ...props }) => {
    return (
        <li className="inline-block sm:mr-4 sm:ml-4 ml-2 mr-2">
            <a className="text-fontwhite text-sm sm:text-base hover:text-sky" {...props}>{children}</a>
        </li>
    );
}

export const Links: FC = ({ children }) => {
    return (
        <ul className="p-2 sm:p-7">
            {children}
        </ul>
    );
}


export default Nav;