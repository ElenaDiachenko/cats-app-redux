import React from 'react';
import { usePaginationRange, DOTS } from '../hooks';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

export const Pagination = ({
  total,
  currentPage,
  buttonConst,
  contentPerPage,
  limit,
  siblingCount,
  paginate,
}) => {
  const totalPageCount = Math.floor(total / limit);

  const paginationRange = usePaginationRange({
    totalPageCount,
    buttonConst,
    siblingCount,
    currentPage,
  });

  const activeClassName =
    'rounded flex justify-center items-center w-[40px] h-[40px] font-bold border border-gray-700 bg-gray-50 dark:bg-gray-700';
  const commonClassName =
    'rounded flex justify-center items-center w-[40px] h-[40px] font-bold border border-transparent hover:bg-gray-50 dark:hover:bg-gray-700';

  const changePage = e => {
    const pageNumber = Number(e.target.textContent);
    paginate(pageNumber);
  };

  return (
    <nav
      aria-label="pagination"
      className="mt-5 flex justify-center items-center gap-x-4 grow-0"
    >
      {currentPage > 1 && (
        <button
          aria-label="previous"
          onClick={() => paginate(currentPage - 1)}
          className={commonClassName}
        >
          <BsArrowLeft size={23} />
        </button>
      )}
      {paginationRange &&
        paginationRange.map((item, index) => {
          if (item === DOTS) {
            return (
              <button key={index} className={commonClassName}>
                &#8230;
              </button>
            );
          }
          return (
            <button
              key={index}
              onClick={changePage}
              className={
                currentPage === item ? activeClassName : commonClassName
              }
            >
              <span className="sr-only">page</span>
              <span>{item}</span>
            </button>
          );
        })}

      {currentPage !== totalPageCount && (
        <button
          aria-label="next"
          onClick={() => paginate(currentPage + 1)}
          className={commonClassName}
        >
          <BsArrowRight size={23} />
        </button>
      )}
    </nav>
  );
};
