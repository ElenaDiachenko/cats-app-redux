import { useState, useEffect } from 'react';
import Select from 'react-select';
import { Pagination } from '../components/Pagination';
import { selectOptions } from '../utilities/options';
import { useOptions } from '../hooks';
import { MasonryGallery } from '../components/MasonryGallery';
import { LoaderSpinner } from '../components/LoaderSpinner';
import { useGetBreedListQuery } from '../redux/cats';

const Breeds = () => {
  const [query, setQuery] = useState(null);
  const [limit, setLimit] = useState(10);
  const [shownPhotos, setShownPhotos] = useState([]);
  const [currentPhotos, setCurrentPhotos] = useState([]);
  const [total, setTotal] = useState(null);
  const [link] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: breeds = [],
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetBreedListQuery();
  const breedOptions = useOptions(breeds, 'all', 'All Breeds');

  useEffect(() => {
    if (!isSuccess) return;

    if (query === null || query === 'all') {
      setShownPhotos(breeds);
      setTotal(breeds.length);
      setCurrentPage(1);
      return;
    }
    const result = breeds.filter(breed => breed.id === query);
    setShownPhotos(result);
  }, [breeds, isSuccess, query]);

  useEffect(() => {
    if (!shownPhotos.length) return;
    const indexOfLastItem = currentPage * limit;
    const indexOfFirstItem = indexOfLastItem - limit;
    setCurrentPhotos(shownPhotos.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, limit, shownPhotos]);

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const selectClassName =
    'focus:outline-0 md:w-[30%] font-bold text-gray-900 dark:text-white bg-gray-50 border border-gray-300 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100';
  return (
    <div className="min-h-full flex flex-col">
      {isLoading && (
        <div className="mt-[100px]">
          <LoaderSpinner />
        </div>
      )}
      {isError && <p>{error.message}</p>}

      {isSuccess && (
        <>
          <section className=" flex flex-col gap-y-3 md:flex-row md:items-center w-full gap-x-4">
            {breedOptions.length > 0 && (
              <Select
                options={breedOptions}
                placeholder="All Breeds"
                classNamePrefix="custom-select"
                className={selectClassName}
                onChange={option => {
                  setQuery(option.value);
                }}
              />
            )}

            <Select
              options={selectOptions.limit}
              placeholder="Limit"
              classNamePrefix="custom-select"
              className={selectClassName}
              onChange={option => {
                setLimit(option.value);
              }}
            />
          </section>

          {currentPhotos && (
            <div className="h-[calc(100%-60px)]">
              <MasonryGallery photos={currentPhotos} link={link} />
            </div>
          )}
          {total > limit && currentPhotos.length > 1 ? (
            <Pagination
              limit={limit}
              total={total}
              paginate={paginate}
              currentPage={currentPage}
              buttonConst={3}
              contentPerPage={5}
              siblingCount={1}
            />
          ) : null}
        </>
      )}
    </div>
  );
};

export default Breeds;
