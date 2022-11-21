import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { BsSun, BsFillMoonFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { NavMenu } from './NavMenu';
import { NavLikes } from './NavLikes';
import { LoaderSpinner } from './LoaderSpinner';

const Layout = () => {
  const { darkTheme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const onToggle = () => dispatch(toggleTheme());

  return (
    <div className="dark:bg-gray-800 dark:text-white min-h-screen px-4 lg:px-12 ">
      <header className="mb-4">
        <nav
          className="border-b border-gray-200 border-opacity-25 py-2.5 flex
          justify-between
        "
        >
          <div className="flex gap-x-3 p-4  items-center font-bold text-xl">
            <NavMenu />
          </div>
          <div className="flex items-center lg:order-2">
            <NavLikes />
            {!darkTheme ? (
              <BsFillMoonFill
                onClick={() => onToggle()}
                size={20}
                className="hover:opacity-50 cursor-pointer"
              />
            ) : (
              <BsSun
                onClick={() => onToggle()}
                size={20}
                className="hover:opacity-50 cursor-pointer"
              />
            )}
          </div>
        </nav>
      </header>
      <Suspense fallback={<LoaderSpinner />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;
