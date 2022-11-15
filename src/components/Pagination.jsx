import React from 'react';

export const Pagination = ({ currentPage, limit, total, paginate }) => {
  const pageNumbers = [];
  const activeClassName =
    'bg-red-500 p-3 rounded-full flex justify-center items-center';

  for (let i = 1; i <= Math.ceil(total / limit); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className=" flex justify-center mt-3 gap-x-3">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={
              currentPage === number
                ? activeClassName
                : 'p-3 rounded-full flex justify-center items-center'
            }
          >
            <button onClick={() => paginate(number)} className="">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
