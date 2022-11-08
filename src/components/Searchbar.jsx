import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

export const Searchbar = ({ getQuery }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    getQuery(searchQuery);
    setSearchQuery('');
  };
  return (
    <form className="flex items-center">
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value.trim().toLowerCase())}
        type="text"
        className="block p-4 pl-10 focus:outline-none text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        placeholder="Search..."
      />
      <button
        className=" p-4 flex justify-center items-center  text-sm text-gray-900 bg-gray-50  border border-gray-300 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        type="submit"
        onClick={handleSubmit}
      >
        <BsSearch size={20} />
      </button>
    </form>
  );
};
