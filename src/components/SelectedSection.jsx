import React from 'react';
import Select from 'react-select';

const selectClassName =
  'focus:outline-0 w-full md:w-[50%] font-bold text-gray-900 dark:text-white bg-gray-50 border border-gray-300 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100';

export const SelectedSection = ({
  selectOptions,
  breedOptions,
  setBreed,
  setPage,
  setLimit,
  setOrder,
  setType,
}) => {
  return (
    <>
      <div className="flex justify-between  w-full gap-x-3">
        <Select
          options={breedOptions}
          placeholder="All Breeds"
          classNamePrefix="custom-select"
          className={selectClassName}
          onChange={(option) => {
            if (option.value === 'all') {
              setBreed('');
              setPage(1);
              return;
            }
            setBreed(option.value);
            setPage(1);
          }}
        />
        <Select
          options={selectOptions.type}
          placeholder="Type"
          classNamePrefix="custom-select"
          className={selectClassName}
          onChange={(option) => {
            setType(option.value);
          }}
        />
      </div>
      <div className="flex justify-between w-full gap-x-3">
        <Select
          options={selectOptions.order}
          placeholder="Order"
          classNamePrefix="custom-select"
          className={selectClassName}
          onChange={(option) => {
            setOrder(option.value);
          }}
        />
        <Select
          options={selectOptions.limit}
          placeholder="Limit"
          classNamePrefix="custom-select"
          className={selectClassName}
          onChange={(option) => setLimit(option.value)}
        />
      </div>
    </>
  );
};
