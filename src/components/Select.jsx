import React from 'react';

export const Select = ({ options, value, onChange }) => {
  return (
    <div>
      <select
        value={value}
        onChange={(e) => {
          onChange(e.target.value.toLowerCase());
        }}
        className="
      block p-4 pl-10 focus:outline-none text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
      >
        {options.map((option) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};
