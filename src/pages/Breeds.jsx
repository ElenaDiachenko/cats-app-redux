import { useState } from 'react';
import { Searchbar } from '../components/Searchbar';

const Breeds = () => {
  const [query, setQuery] = useState('');

  const getQuery = (searchQuery) => {
    setQuery(searchQuery);
  };
  console.log(query);
  return (
    <>
      <Searchbar getQuery={getQuery} />
    </>
  );
};

export default Breeds;
