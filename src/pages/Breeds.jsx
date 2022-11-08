import { useState, useEffect } from 'react';
import { Searchbar } from '../components/Searchbar';
import { Select } from '../components/Select';
import { requests } from '../servises/API';

const Breeds = () => {
  const [query, setQuery] = useState('');
  const [breeds, setBreeds] = useState([]);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    (async () => {
      try {
        const res = await requests.getBreeds();
        setBreeds(res.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  const getQuery = (searchQuery) => {
    setQuery(searchQuery);
  };

  return (
    <section className="md:flex md:items-center w-full gap-x-4">
      <Searchbar getQuery={getQuery} />
      <Select
        defaultValue="All Breeds"
        options={breeds}
        onChange={getQuery}
        value={query}
      />
    </section>
  );
};

export default Breeds;
