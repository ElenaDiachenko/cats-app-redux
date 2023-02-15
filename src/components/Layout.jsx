import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { BsSun, BsFillMoonFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { NavMenu } from './NavMenu';
import { NavLikes } from './NavLikes';
import { LoaderSpinner } from './LoaderSpinner';

const Layout = () => {
  const { darkTheme } = useSelector(state => state);
  const dispatch = useDispatch();
  const onToggle = () => dispatch(toggleTheme());

  return (
    <div className="bg-zinc-200 dark:bg-gray-800 dark:text-white min-h-screen flex flex-col">
      <div className="max-w-[1400px] w-full mx-auto px-4 lg:px-12 h-full pb-6 ">
        <header className="mb-4 h-[61px]">
          <nav
            role="navigation"
            aria-label="primary"
            className="border-b border-gray-800 dark:border-gray-200 border-opacity-25 py-2.5 flex
          justify-between
        "
          >
            <ul className="flex gap-x-4  items-center font-bold text-xl">
              <NavMenu />
            </ul>
            <nav
              role="navigation"
              aria-label="secondary"
              className="flex items-center lg:order-2"
            >
              <NavLikes />
              <button
                title="Toggles light & dark"
                aria-label="auto"
                aria-live="polite"
              >
                {!darkTheme ? (
                  <BsFillMoonFill
                    aria-hidden="true"
                    onClick={() => onToggle()}
                    size={27}
                    className="rounded bg-transparent flex justify-center items-center  hover:opacity-50 cursor-pointer"
                  />
                ) : (
                  <BsSun
                    aria-hidden="true"
                    onClick={() => onToggle()}
                    size={27}
                    className="rounded bg-transparent flex justify-center items-center  hover:opacity-50 cursor-pointer"
                  />
                )}
              </button>
            </nav>
          </nav>
        </header>
        <Suspense fallback={<LoaderSpinner />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default Layout;
