import { FC, HTMLProps } from 'react';
import { useRouter } from 'next/router';

import { BsGearFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FaMoon, FaSun, FaUsers, FaTasks } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

import useDarkMode from '../../hooks/useDarkMode';


const SideBar: FC = () => {

  return (
    <div className="fixed  top-0 left-0 h-screen w-16 flex flex-col
                  bg-white  dark:bg-gradient-to-t from-myblue to-second shadow-lg">

      <SideBarIcon href="/dashboard" text="Dashboard">
        <MdDashboard size="28" />
      </SideBarIcon>

      <Divider />

      <SideBarIcon href="/classes" text="Klassen">
        <FaUsers size="23" />
      </SideBarIcon>

      <SideBarIcon href="/tasks" text="Aufgaben">
        <FaTasks size="20" />
      </SideBarIcon>

      <SideBarIcon href="/profile" text="Profil">
        <CgProfile size="22" />
      </SideBarIcon>

      <Divider />

      <SideBarIcon href="/settings" text="Einstellungen">
        <BsGearFill size="22" />
      </SideBarIcon>

      <div className='mt-auto'>
        <SideBarIcon text="Theme">
          <ThemeIcon />
        </SideBarIcon>
      </div>

    </div>
  );
};

interface SideBarIconProps extends HTMLProps<HTMLDivElement> {
  text: string;
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

const SideBarIcon: FC<SideBarIconProps> = ({ children, text, href }) => {
  const currentPath = useRouter().pathname;
  const isActive: Boolean = currentPath === href;

  return (
    <div onClick={() => (href) && window.location.assign(href)} className={isActive ? "active-icon group" : "sidebar-icon group"}>
      {children}
      <span className="sidebar-tooltip group-hover:scale-100">
        {text}
      </span>
    </div>
  )
};


const Divider: FC = () => <hr className="sidebar-hr" />;

export default SideBar;
