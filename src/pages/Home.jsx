import { useState, useEffect } from 'react';
import Select from 'react-select';
import { Pagination } from '../components/Pagination';
import { MasonryGallery } from '../components/MasonryGallery';
import { requests } from '../servises/API';

import { useGetBreedsQuery } from '../redux/breed/breedsApiSlice';

// order, type, breedId, limit;

const Home = () => {
  const { data: breeds, error, isLoading } = useGetBreedsQuery();
  const [order, setOrder] = useState('random');
  const [type, setType] = useState('');
  const [breed, setBreed] = useState('');
  const [limit, setLimit] = useState(10);

  const options = [
    { value: 'all', label: 'All breeds' },
    ...breeds.map((breed) => ({
      value: breed.id,
      label: breed.name,
    })),
  ];

  return <div>Home</div>;
};

export default Home;
