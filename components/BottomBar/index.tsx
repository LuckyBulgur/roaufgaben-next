import { useRouter } from 'next/router';
import { FC, HTMLProps, useEffect } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaArrowRight, FaTasks, FaUsers } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

import useDarkMode from '../../hooks/useDarkMode';


const BottomBar: FC = () => {

    const [darkTheme, setDarkTheme] = useDarkMode();

    return (
        <div className="w-full h-14 fixed bottom-0 z-[3] bg-white  dark:bg-second shadow-lg flex justify-center items-center">

            <BottomBarIcon href="/dashboard">
                <MdDashboard size="27" />
            </BottomBarIcon>

            <BottomBarIcon href="/classes">
                <FaUsers size="23" />
            </BottomBarIcon>

            <BottomBarIcon href="/tasks">
                <FaTasks size="20" />
            </BottomBarIcon>

            <BottomBarIcon href="/profile">
                <CgProfile size="22" />
            </BottomBarIcon>

            <BottomBarIcon href="/settings">
                <FaArrowRight size="22" />
            </BottomBarIcon>
        </div>
    );
};

interface BottomBarIconProps extends HTMLProps<HTMLDivElement> {
    href?: string;
}

const BottomBarIcon: FC<BottomBarIconProps> = ({ children, href }) => {
    const currentPath = useRouter().pathname;

    const isActive = currentPath === href;
    const router = useRouter();

    return (
        <div onClick={() => (href) && router.push(href)} className={isActive ? "active-icon group h-5/6" : "sidebar-icon group h-3/4"}>
            {children}
        </div>
    )
};

export default BottomBar;