import { NavLink } from 'react-router-dom';
import { FaPaw } from 'react-icons/fa';
import { AiOutlineHome } from 'react-icons/ai';
import { CgCheckO } from 'react-icons/cg';

const links = [
  { title: 'Home', path: '/', icon: <AiOutlineHome size={30} /> },
  { title: 'Voting', path: '/voting', icon: <CgCheckO size={30} /> },
  { title: 'Breeds', path: '/breeds', icon: <FaPaw size={30} /> },
];

export const NavMenu = () => {
  const activeClassName = 'underline';
  return (
    <>
      {links.map((link) => (
        <NavLink
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
          key={link.path}
          to={link.path}
        >
          <span className="hidden md:inline-block"> {link.title}</span>
          <span className="inline-block md:hidden">{link.icon}</span>
        </NavLink>
      ))}
    </>
  );
};
