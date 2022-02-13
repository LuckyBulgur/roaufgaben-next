import { useRouter } from 'next/router';
import { FC, HTMLProps, useEffect } from 'react';
import { BsGearFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FaMoon, FaSun, FaTasks, FaUsers } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

import useDarkMode from '../../hooks/useDarkMode';


const SideBar: FC = () => {

  return (
    <div className="fixed  top-0 left-0 h-screen w-16 flex flex-col
                  bg-white  dark:bg-gradient-to-t from-myblue to-second shadow-lg">

      <SideBarIcon href="/dashboard">
        <MdDashboard size="28" />
      </SideBarIcon>

      <Divider />

      <SideBarIcon href="/classes">
        <FaUsers size="23" />
      </SideBarIcon>

      <SideBarIcon href="/tasks">
        <FaTasks size="20" />
      </SideBarIcon>

      <SideBarIcon href="/profile">
        <CgProfile size="22" />
      </SideBarIcon>

      <Divider />

      <SideBarIcon href="/settings">
        <BsGearFill size="22" />
      </SideBarIcon>

      <div className='mt-auto'>
        <SideBarIcon>
          <ThemeIcon />
        </SideBarIcon>
      </div>

    </div>
  );
};

interface SideBarIconProps extends HTMLProps<HTMLDivElement> {
  href?: string;
}

const ThemeIcon: FC = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);

  return (
    <span onClick={handleMode}>
      {darkTheme ? (
        <FaSun size='24' />
      ) : (
        <FaMoon size='24' />
      )}
    </span>
  );
};

const SideBarIcon: FC<SideBarIconProps> = ({ children, href }) => {
  const currentPath = useRouter().pathname;
  const isActive: Boolean = currentPath === href;
  const router = useRouter();

  return (
    <div onClick={() => (href) && router.push(href)} className={isActive ? "active-icon group" : "sidebar-icon group"}>
      {children}
    </div>
  )
};


const Divider: FC = () => <hr className="sidebar-hr" />;

export default SideBar;
