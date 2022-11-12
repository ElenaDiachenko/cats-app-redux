import { useState, useEffect } from 'react';
import { Searchbar } from '../components/Searchbar';
import { Select } from '../components/Select';
import { requests } from '../servises/API';
import { MasonryGallery } from '../components/MasonryGallery';

const Breeds = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [breeds, setBreeds] = useState([]);
  const [limit, setLimit] = useState();
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
    (async () => {
      try {
        const res = await requests.getImages(limit);
        setImages(res.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [limit]);

  useEffect(() => {
    if (query.length === 0) return;
    (async () => {
      try {
        const res = await requests.getBreedById(query, limit);
        setBreedById(res.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [query, limit]);

  const getInputQuery = async (searchQuery) => {
    if (searchQuery && breeds.length > 0) {
      const query = await breeds.find(
        (breed) => breed.name.toLowerCase() === searchQuery,
      );
      setQuery(query.id);
      console.log(query);
    }
  };

  return (
    <>
      <section className="md:flex md:items-center w-full gap-x-4">
        <Searchbar getQuery={getInputQuery} />
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
      {images.length > 0 && !breedById.length > 0 && (
        <MasonryGallery photos={images} />
      )}
      {breedById.length > 0 && <MasonryGallery photos={breedById} />}
    </>
  );
};

export default Breeds;
