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
  const activeClassName =
    ' rounded  border border-gray-800  p-1 md:px-2.5 md:py-1 dark:border-gray-500 hover:opacity-50 cursor-pointer ';
  return (
    <>
      {links.map((link) => (
        <NavLink
          className={({ isActive }) =>
            isActive ? activeClassName : ' hover:opacity-50 cursor-pointer'
          }
          key={link.path}
          to={link.path}
        >
          <span className="hidden sm:inline-block"> {link.title}</span>
          <span className="inline-block sm:hidden">{link.icon}</span>
        </NavLink>
      ))}
    </>
  );
};
