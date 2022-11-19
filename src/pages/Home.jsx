import { useState, useEffect } from 'react';
import Select from 'react-select';
import { Pagination } from '../components/Pagination';
import { MasonryGallery } from '../components/MasonryGallery';
import { requests } from '../servises/API';
import { usePagination, useOptions } from '../hooks';
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

  return (
    <section className=" flex flex-col gap-y-3 md:flex-row md:items-center w-full gap-x-4">
      <div></div>
    </section>
  );
};

export default Home;
