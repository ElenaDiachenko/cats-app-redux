import { useState, useEffect } from 'react';
import Select from 'react-select';
// import { useDispatch } from 'react-redux';
// import { getAllBreeds } from '../redux/breed/breedsSlice';
// import { useGetBreedsQuery } from '../redux/breed/breedsApiSlice';
import { Searchbar } from '../components/Searchbar';
import { Pagination } from '../components/Pagination';
import { selectOptions } from '../utilities/options';
import { useOptions } from '../hooks';
import { MasonryGallery } from '../components/MasonryGallery';
import { requests } from '../servises/API';

const Breeds = () => {
  const [breeds, setBreeds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBreed, setSelectedBreed] = useState([]);
  const [query, setQuery] = useState(null);
  const [limit, setLimit] = useState(10);
  const [shownPhotos, setShownPhotos] = useState([]);
  const [currentPhotos, setCurrentPhotos] = useState([]);
  const [totalBreedQuery, setTotalBreedQuery] = useState(null);
  const [total, setTotal] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const breedOptions = useOptions(breeds, 'all', 'All Breeds');

  // const indexOfLastPost = currentPage * limit;
  // const indexOfFirstPost = indexOfLastPost - limit;
  // const currentPhotos = shownPhotos.slice(indexOfFirstPost, indexOfLastPost);

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

  useEffect(() => {
    if (!query) return;
    (async () => {
      try {
        const res = await requests.getBreedById(query, 30);
        setSelectedBreed(res.data);
        setTotalBreedQuery(+res.headers['pagination-count']);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [query, limit]);

  useEffect(() => {
    if (!breeds.length) return;

    if (query === null || query === 'all') {
      setShownPhotos(breeds);
      setTotal(breeds.length);
      setCurrentPage(1);
      return;
    }

    setShownPhotos(selectedBreed);
    setTotal(totalBreedQuery);
    setCurrentPage(1);
  }, [breeds, query, selectedBreed, totalBreedQuery]);
  ///////////////////////////////////////////////
  // useEffect(() => {
  //   if (!breeds.length) return;

  //   if (query === null || query === 'all') {
  //     setShownPhotos(breeds);
  //     return;
  //   }
  //   const result = breeds.filter((breed) => breed.id === query);
  //   setShownPhotos(result);
  // }, [breeds, limit, query]);

  //////////////////////////////////////////////////////////////////////////
  // const getBreedToShow = (query) => {
  //   if (breeds.length < 0) return;
  //   if (query === '') return breeds;
  //   return breeds.filter((breed) => breed.name.toLowerCase() === query);
  // };

  useEffect(() => {
    if (!shownPhotos.length > 0) return;
    const indexOfLastItem = currentPage * limit;
    const indexOfFirstItem = indexOfLastItem - limit;
    setCurrentPhotos(shownPhotos.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, limit, shownPhotos]);

  const getInputQuery = (searchQuery) => {
    setQuery(searchQuery);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const selectClassName =
    'focus:outline-0 md:w-[30%] font-bold text-gray-900 dark:text-white bg-gray-50 border border-gray-300 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100';
  return (
    <>
      {breeds && (
        <>
          <section className=" flex flex-col gap-y-3 md:flex-row md:items-center w-full gap-x-4">
            <Searchbar className="" getQuery={getInputQuery} />
            {breedOptions.length > 0 && (
              <Select
                options={breedOptions}
                placeholder="All Breeds"
                classNamePrefix="custom-select"
                className={selectClassName}
                onChange={(option) => {
                  setQuery(option.value);
                }}
              />
            )}

            <Select
              options={selectOptions.limit}
              placeholder="Limit"
              classNamePrefix="custom-select"
              className={selectClassName}
              onChange={(option) => {
                setLimit(option.value);
                // setCurrentPage(1);
              }}
            />
          </section>
          {isLoading && <p>Loading ...</p>}
          {error && <p>Something went wrong</p>}

          {currentPhotos && <MasonryGallery photos={currentPhotos} />}

          {total > limit && (
            <Pagination
              limit={limit}
              total={total}
              paginate={paginate}
              currentPage={currentPage}
              buttonConst={3}
              contentPerPage={5}
              siblingCount={1}
            />
          )}
        </>
      )}
    </>
  );
};

export default Breeds;
// <Pagination
//   limit={limit}
//   total={shownPhotos.length}
//   paginate={paginate}
//   currentPage={currentPage}
// />
