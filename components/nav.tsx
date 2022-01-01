import { HTMLProps } from "react";
import { FC } from "react"
import image from '../public/logo.png';
import Image from 'next/image'

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
        <li className="inline-block mr-4 ml-4">
            <a className="text-fontwhite hover:text-sky" {...props}>{children}</a>
        </li>
    );
}

export const Links: FC = ({ children }) => {
    return (
        <ul className="p-7">
            {children}
        </ul>
    );
}


export default Nav;