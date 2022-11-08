import React from 'react';
import { NavLink } from 'react-router-dom';

import { CiFaceSmile } from 'react-icons/ci';
import { CgSmileSad } from 'react-icons/cg';
import { FaRegHeart } from 'react-icons/fa';

export const NavLikes = () => {
  const activeClassName = 'bg-red-500 p-1 rounded';
  return (
    <div className="flex gap-x-4 mr-2">
      <NavLink
        className={({ isActive }) =>
          isActive ? activeClassName : 'p-1 rounded'
        }
        to="/likes"
      >
        <CiFaceSmile size={20} />
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? activeClassName : 'p-1 rounded'
        }
        to="/favourites"
      >
        <FaRegHeart size={20} />
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? activeClassName : 'p-1 rounded'
        }
        to="/dislikes"
      >
        <CgSmileSad size={20} />
      </NavLink>
    </div>
  );
};
