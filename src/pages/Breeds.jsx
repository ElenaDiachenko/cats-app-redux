import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { getAllBreeds } from '../redux/breed/breedsSlice';
import { useGetBreedsQuery } from '../redux/breed/breedsApiSlice';
import { Searchbar } from '../components/Searchbar';
import { Select } from '../components/Select';
// import { requests } from '../servises/API';
import { MasonryGallery } from '../components/MasonryGallery';

const Breeds = () => {
  const { data, error, isLoading } = useGetBreedsQuery();
  console.log(data);
  // const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  // const [breeds, setBreeds] = useState([]);
  const [limit, setLimit] = useState();
  const [shownPhotos, setShownPhotos] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await requests.getBreeds();
  //       setBreeds(res.data);
  //       // dispatch(getAllBreeds(res.data));
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   })();
  // }, [dispatch]);

  useEffect(() => {
    if (!data && query === '') return;
    if (query === '') {
      setShownPhotos(data);
      return;
    }
    const result = data.filter((breed) => breed.name.toLowerCase() === query);
    setShownPhotos(result);
  }, [query, data]);

  // const getBreedToShow = (query) => {
  //   if (breeds.length < 0) return;
  //   if (query === '') return breeds;
  //   return breeds.filter((breed) => breed.name.toLowerCase() === query);
  // };

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await requests.getImages(limit);
  //       setImages(res.data);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   })();
  // }, [limit]);

  // useEffect(() => {
  //   if (query.length === 0) return;
  //   (async () => {
  //     try {
  //       const res = await requests.getBreedById(query, limit);
  //       setBreedById(res.data);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   })();
  // }, [query, limit]);

  const getInputQuery = (searchQuery) => {
    setQuery(searchQuery);
    console.log(query);
  };

  return (
    <>
      {error && <p>Something went wrong</p>}
      {isLoading && <p>Loading ...</p>}
      {data && (
        <>
          <section className="md:flex md:items-center w-full gap-x-4">
            <Searchbar getQuery={getInputQuery} />
            <Select
              defaultValue="All Breeds"
              value={query}
              options={data}
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

          <MasonryGallery photos={shownPhotos} />
        </>
      )}
      {/* {breedById.length > 0 && <MasonryGallery photos={breedById} />} */}
    </>
  );
};

export default Breeds;
