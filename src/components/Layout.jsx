import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavMenu } from './NavMenu';

const Layout = () => {
  return (
    <div className="dark:bg-red-600 dark:text-white min-h-screen px-4 lg:px-12 ">
      <header className="mb-4">
        <nav className="border-b border-gray-200 border-opacity-25 py-2.5">
          <div className="flex gap-x-3 p-4  items-center mx-auto max-w-screen-xl font-bold text-xl">
            <NavMenu />
          </div>
        </nav>
      </header>
      <Outlet />
    </div>
  );
};

export default Layout;
