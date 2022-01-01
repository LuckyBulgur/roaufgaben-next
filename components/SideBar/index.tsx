import { FC, HTMLProps } from 'react';

import { BsPlus, BsFillLightningFill, BsGearFill } from 'react-icons/bs';
import { FaMoon, FaSun } from 'react-icons/fa';
import { FaFire, FaPoo } from 'react-icons/fa';

import useDarkMode from '../../hooks/useDarkMode';

const SideBar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-16 flex flex-col
                  bg-white dark:bg-gray-900 shadow-lg">

      <SideBarIcon icon={<FaFire size="28" />} />
      <Divider />
      <SideBarIcon icon={<BsPlus size="32" />} />
      <SideBarIcon icon={<BsFillLightningFill size="20" />} />
      <SideBarIcon icon={<FaPoo size="20" />} />
      <Divider />
      <SideBarIcon icon={<BsGearFill size="22" />} />
      <SideBarIcon icon={<ThemeIcon />} />
    </div>
  );
};

interface sideBarIconProps extends HTMLProps<HTMLDivElement> {
  icon: any;
  text?: string;
}

const ThemeIcon = () => {
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

const SideBarIcon: FC<sideBarIconProps> = ({ icon, text = 'tooltip 💡' }) => (
  <div className="sidebar-icon group">
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">
      {text}
    </span>
  </div>
);


const Divider = () => <hr className="sidebar-hr" />;

export default SideBar;
