import React from 'react';
import { NavLink } from 'react-router-dom';
import { CiFaceSmile } from 'react-icons/ci';
import { CgSmileSad } from 'react-icons/cg';
import { FaRegHeart } from 'react-icons/fa';

export const NavLikes = () => {
  const activeClassName =
    'bg-red-500 p-1.5 rounded flex justify-center items-center ';
  return (
    <div className="flex gap-x-4 mr-2">
      <NavLink
        className={({ isActive }) =>
          isActive
            ? activeClassName
            : 'w-[40px] h-[40px] rounded bg-green-400 flex justify-center items-center  hover:opacity-50 cursor-pointer'
        }
        to="/likes"
      >
        <CiFaceSmile size={30} />
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? activeClassName
            : 'w-[40px] h-[40px] rounded bg-red-400 flex justify-center items-center  hover:opacity-50 cursor-pointer'
        }
        to="/favourites"
      >
        <FaRegHeart size={30} />
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? activeClassName
            : 'w-[40px] h-[40px] rounded  bg-yellow-400 flex justify-center items-center hover:opacity-50 cursor-pointer'
        }
        to="/dislikes"
      >
        <CgSmileSad size={30} />
      </NavLink>
    </div>
  );
};
