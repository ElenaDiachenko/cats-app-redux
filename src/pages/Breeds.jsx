import { useState, useEffect } from 'react';
import { Searchbar } from '../components/Searchbar';
import { Select } from '../components/Select';
import { requests } from '../servises/API';

const Breeds = () => {
  const [query, setQuery] = useState('');
  const [breeds, setBreeds] = useState([]);
  const [limit, setLimit] = useState(0);
  const [breedById, setBreedById] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await requests.getBreeds();
        setBreeds(res.data);
        console.log('breeds');
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  useEffect(() => {
    if (query.length === 0) return;
    (async () => {
      try {
        const res = await requests.getBreedById(query, limit);
        setBreedById(res.data);
        console.log('breedById');
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [query, limit]);

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
      <Select
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue="Limit"
        options={[
          { id: 5, name: '5' },
          { id: 10, name: '10' },
          { id: 15, name: '15' },
          { id: 20, name: '20' },
        ]}
      />
    </section>
  );
};

export default Breeds;
