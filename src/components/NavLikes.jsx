import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsEmojiSmile } from 'react-icons/bs';
import { ImSad } from 'react-icons/im';
import { FaRegHeart } from 'react-icons/fa';

export const NavLikes = () => {
  const activeClassName =
    'w-[40px] h-[40px] rounded  border border-gray-300  flex justify-center items-center dark:border-gray-500 hover:opacity-50 cursor-pointer ';
  return (
    <div className="flex gap-x-4 mr-2">
      <NavLink
        className={({ isActive }) =>
          isActive
            ? activeClassName
            : 'w-[40px] h-[40px] rounded  flex justify-center items-center  hover:opacity-50 cursor-pointer'
        }
        to="/likes"
      >
        <BsEmojiSmile size={30} />
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? activeClassName
            : 'w-[40px] h-[40px] rounded  flex justify-center items-center  hover:opacity-50 cursor-pointer'
        }
        to="/favourites"
      >
        <FaRegHeart size={30} />
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? activeClassName
            : 'w-[40px] h-[40px] rounded  flex justify-center items-center hover:opacity-50 cursor-pointer'
        }
        to="/dislikes"
      >
        <ImSad size={30} />
      </NavLink>
    </div>
  );
};
