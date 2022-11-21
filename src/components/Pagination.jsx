import React from 'react';
import { usePaginationRange, DOTS } from '../hooks';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

export const Pagination = ({
  total,
  currentPage,
  buttonConst,
  limit,
  siblingCount,
  paginate,
}) => {
  const totalPageCount = Math.ceil(total / limit);

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

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    paginate(pageNumber);
  }

  return (
    <div>
      <div className="mt-5 flex justify-center items-center gap-x-4">
        {currentPage > 1 && (
          <button
            onClick={() => paginate(currentPage - 1)}
            className={commonClassName}
          >
            <BsArrowLeft size={23} />
          </button>
        )}
        {paginationRange.map((item, index) => {
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
              <span>{item}</span>
            </button>
          );
        })}
        {currentPage !== totalPageCount && (
          <button
            onClick={() => paginate(currentPage + 1)}
            className={commonClassName}
          >
            <BsArrowRight size={23} />
          </button>
        )}
      </div>
    </div>
  );
};
