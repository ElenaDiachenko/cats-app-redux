import React from 'react';

export const Pagination = ({ currentPage, limit, total, paginate }) => {
  const pageNumbers = [];
  const activeClassName =
    'rounded-full flex justify-center items-center w-[40px] h-[40px] font-bold bg-red-500 text-white hover:bg-slate-600';

  for (let i = 1; i <= Math.ceil(total / limit); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="mt-5 flex justify-center items-center gap-x-3">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={
                currentPage === number
                  ? activeClassName
                  : 'rounded-full flex justify-center items-center w-[40px] h-[40px] font-bold bg-slate-500 hover:bg-slate-600'
              }
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
