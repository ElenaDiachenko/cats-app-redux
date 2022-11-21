import { useState, useEffect } from 'react';
import { requests } from '../servises/API';

export const useGetBreeds = () => {
  const [breeds, setBreeds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await requests.getBreeds();
        setBreeds(res.data);
      } catch (error) {
        console.log(error.message);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  return {
    breeds,
    isLoading,
    error,
  };
};
