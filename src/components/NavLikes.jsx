import React from 'react';
import { NavLink } from 'react-router-dom';
import { CiFaceSmile } from 'react-icons/ci';
import { CgSmileSad } from 'react-icons/cg';
import { FaRegHeart } from 'react-icons/fa';

export const NavLikes = () => {
  const activeClassName =
    'bg-red-500 p-1.5 rounded flex justify-center items-center';
  return (
    <div className="flex gap-x-4 mr-2">
      <NavLink
        className={({ isActive }) =>
          isActive
            ? activeClassName
            : 'p-1.5 rounded flex justify-center items-center'
        }
        to="/likes"
      >
        <CiFaceSmile size={20} />
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? activeClassName
            : 'p-1.5 rounded flex justify-center items-center'
        }
        to="/favourites"
      >
        <FaRegHeart size={20} />
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? activeClassName
            : 'p-1.5 rounded flex justify-center items-center'
        }
        to="/dislikes"
      >
        <CgSmileSad size={20} />
      </NavLink>
    </div>
  );
};
