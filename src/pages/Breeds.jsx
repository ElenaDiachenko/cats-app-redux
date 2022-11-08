import { useState, useEffect } from 'react';
import { Searchbar } from '../components/Searchbar';
import { requests } from '../servises/API';

const Breeds = () => {
  const [query, setQuery] = useState('');
  const [breeds, setBreeds] = useState([]);

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
    <>
      <Searchbar getQuery={getQuery} />

      <select>
        <option disabled value="">
          Breeds
        </option>
        {breeds.map((option) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default Breeds;
