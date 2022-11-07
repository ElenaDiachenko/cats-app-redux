import { NavLink } from 'react-router-dom';

const links = [
  { title: 'Home', path: '/' },
  { title: 'Voting', path: '/voting' },
  { title: 'Breeds', path: '/breeds' },
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
          {link.title}
        </NavLink>
      ))}
    </>
  );
};
