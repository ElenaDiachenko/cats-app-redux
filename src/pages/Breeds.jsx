import { useState, useEffect } from 'react';
import Select from 'react-select';
// import { useDispatch } from 'react-redux';
// import { getAllBreeds } from '../redux/breed/breedsSlice';
// import { useGetBreedsQuery } from '../redux/breed/breedsApiSlice';
import { Searchbar } from '../components/Searchbar';
// import { Select } from '../components/Select';
import { Pagination } from '../components/Pagination';
import { MasonryGallery } from '../components/MasonryGallery';
import { requests } from '../servises/API';

const Breeds = () => {
  // const { data, error, isLoading, isFetching } = useGetBreedsQuery();
  const [breeds, setBreeds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBreed, setSelectedBreed] = useState([]);
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(10);
  const [shownPhotos, setShownPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await requests.getBreeds();
        setBreeds(res.data);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const options = [
    { value: 'all', label: 'All breeds' },
    ...breeds.map((breed) => ({
      value: breed.id,
      label: breed.name,
    })),
  ];

  useEffect(() => {
    if (query === 0) return;
    (async () => {
      try {
        const res = await requests.getBreedById(query);
        setSelectedBreed(res.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [query]);

  useEffect(() => {
    if (!breeds.length) return;

    if (query === '') {
      setShownPhotos(breeds);
      return;
    }
    if (query === 'all') {
      setShownPhotos(breeds);
      return;
    }

    setShownPhotos(selectedBreed);
  }, [query, breeds, selectedBreed]);

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

  const getInputQuery = (searchQuery) => {
    setQuery(searchQuery);
    console.log(query);
  };

  const indexOfLastPost = currentPage * limit;
  const indexOfFirstPost = indexOfLastPost - limit;
  const currentPhotos = shownPhotos.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {error && <p>Something went wrong</p>}
      {isLoading && <p>Loading ...</p>}
      {breeds && (
        <>
          <section className="md:flex md:items-center w-full gap-x-4">
            <Searchbar getQuery={getInputQuery} />
            {options.length > 0 && (
              <Select
                options={options}
                placeholder="All Breeds"
                classNamePrefix="custom-select"
                className="
    focus:outline-0  font-bold text-gray-900 dark:text-white bg-gray-50 border border-gray-300 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100"
                onChange={(option) => setQuery(option.value)}
              />
            )}

            <Select
              options={[
                { value: 5, label: '5' },
                { value: 10, label: '10' },
                { value: 15, label: '15' },
                { value: 20, label: '20' },
              ]}
              placeholder="Limit"
              classNamePrefix="custom-select"
              className="
    focus:outline-0  font-bold text-gray-900 dark:text-white bg-gray-50 border border-gray-300 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100"
              onChange={(option) => setLimit(option.value)}
            />
            {/* {options.length > 0 && (
              <Select
                value={query}
                options={options}
                onChange={(value) => setQuery(value)}
              />
            )}
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
            /> */}
          </section>

          {currentPhotos && <MasonryGallery photos={currentPhotos} />}

          {shownPhotos.length > currentPhotos.length && (
            <Pagination
              limit={limit}
              total={shownPhotos.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          )}
        </>
      )}
      {/* {breedById.length > 0 && <MasonryGallery photos={breedById} />} */}
    </>
  );
};

export default Breeds;
