import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsEmojiSmile } from 'react-icons/bs';
import { ImSad } from 'react-icons/im';
import { FaRegHeart } from 'react-icons/fa';
import { Tooltip } from './Tooltip';

export const NavLikes = () => {
  const activeClassName =
    'w-[40px] h-[40px] rounded  border border-gray-800  flex justify-center items-center dark:border-gray-500 hover:opacity-75 cursor-pointer ';
  return (
    <ul role="menu" className="flex gap-x-4 mr-2">
      <li>
        <Tooltip message="Likes">
          <NavLink
            role="menuitem"
            aria-label="likes"
            className={({ isActive }) =>
              isActive
                ? activeClassName
                : 'w-[40px] h-[40px] rounded  flex justify-center items-center  hover:opacity-75 cursor-pointer'
            }
            to="/likes"
          >
            <BsEmojiSmile size={30} />
          </NavLink>
        </Tooltip>
      </li>
      <li>
        <Tooltip message="Favorites">
          <NavLink
            role="menuitem"
            aria-label="favorites"
            className={({ isActive }) =>
              isActive
                ? activeClassName
                : 'w-[40px] h-[40px] rounded  flex justify-center items-center  hover:opacity-75 cursor-pointer'
            }
            to="/favorites"
          >
            <FaRegHeart size={30} />
          </NavLink>
        </Tooltip>
      </li>
      <li>
        <Tooltip message="Dislikes">
          <NavLink
            role="menuitem"
            aria-label="dislikes"
            className={({ isActive }) =>
              isActive
                ? activeClassName
                : 'w-[40px] h-[40px] rounded  flex justify-center items-center hover:opacity-75 cursor-pointer'
            }
            to="/dislikes"
          >
            <ImSad size={30} />
          </NavLink>
        </Tooltip>
      </li>
    </ul>
  );
};
