import { useState, useEffect } from 'react';
import { Searchbar } from '../components/Searchbar';
import { Select } from '../components/Select';
import { requests } from '../servises/API';
import { MasonryGallery } from '../components/MasonryGallery';

const Breeds = () => {
  const [query, setQuery] = useState('');
  const [breeds, setBreeds] = useState([]);
  const [limit, setLimit] = useState('5');
  const [breedById, setBreedById] = useState([]);

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

  return (
    <>
      <section className="md:flex md:items-center w-full gap-x-4">
        <Searchbar getQuery={setQuery} />
        <Select
          defaultValue="All Breeds"
          value={query}
          options={breeds}
          onChange={(value) => setQuery(value)}
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
      {breeds.length > 0 && !breedById.length > 0 && (
        <MasonryGallery photos={breeds} />
      )}
      {breedById.length > 0 && <MasonryGallery photos={breedById} />}
    </>
  );
};

export default Breeds;
