import { NavLink } from 'react-router-dom';
import { FaPaw } from 'react-icons/fa';
import { AiOutlineHome } from 'react-icons/ai';
import { CgCheckO } from 'react-icons/cg';
import { Tooltip } from '../components/Tooltip';

const links = [
  { title: 'Home', path: '/', icon: <AiOutlineHome size={30} /> },
  { title: 'Voting', path: '/voting', icon: <CgCheckO size={30} /> },
  { title: 'Breeds', path: '/breeds', icon: <FaPaw size={30} /> },
];

export const NavMenu = () => {
  const activeClassName =
    ' rounded  border border-gray-800 flex justify-center item-center p-1 md:px-2.5 md:py-1 dark:border-gray-500 hover:opacity-75 cursor-pointer ';
  return (
    <>
      {links.map(link => (
        <li>
          <NavLink
            role="menuitem"
            aria-label={link.title}
            className={({ isActive }) =>
              isActive ? activeClassName : '  cursor-pointer'
            }
            key={link.path}
            to={link.path}
          >
            <span className="hidden sm:inline-block hover:opacity-75">
              {link.title}
            </span>
            <div className="inline-block sm:hidden ">
              <Tooltip message={link.title}>
                <span className="hover:opacity-75">{link.icon}</span>
              </Tooltip>
            </div>
          </NavLink>
        </li>
      ))}
    </>
  );
};
