import { useState, useEffect } from 'react';
import Select from 'react-select';
import { MasonryGallery } from '../components/MasonryGallery';
import { requests } from '../servises/API';
import { useOptions, useGetBreeds } from '../hooks';
import { selectOptions } from '../utilities/options';
import { Pagination } from '../components/Pagination';
import { LoaderSpinner } from '../components/LoaderSpinner';

const Home = () => {
  const { breeds, isLoading, error } = useGetBreeds();
  const [isLoadingGallery, setIsLoadingGallery] = useState(false);
  const [errorGallery, setErrorGallery] = useState(false);
  const [order, setOrder] = useState('rand');
  const [type, setType] = useState('gif,jpg,png');
  const [breed, setBreed] = useState('');
  const [limit, setLimit] = useState(10);
  const [shownPhotos, setShownPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const breedOptions = useOptions(breeds, 'all', 'All Breeds');
  const [favourite] = useState(true);

  useEffect(() => {
    if (!breeds.length) return;
    (async () => {
      setIsLoadingGallery(true);
      setTotal(null);
      try {
        const res = await requests.getImages(order, type, breed, limit, page);
        setShownPhotos(res.data);
        setTotal(+res.headers['pagination-count']);
      } catch (error) {
        setErrorGallery(true);
        console.log(error.message);
      } finally {
        setIsLoadingGallery(false);
      }
    })();
  }, [breed, limit, order, type, page, breeds]);

  useEffect(() => {
    window.scrollTo({
      behavior: 'smooth',
      top: '0px',
    });
  }, [page]);

  const paginate = (pageNumber) => setPage(pageNumber);
  const selectClassName =
    'focus:outline-0 w-full md:w-[50%] font-bold text-gray-900 dark:text-white bg-gray-50 border border-gray-300 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100';

  return (
    <>
      {isLoading && (
        <div className="mt-[100px]">
          <LoaderSpinner />
        </div>
      )}
      {error && <p>Something went wrong</p>}

      {breeds.length > 0 && (
        <>
          {selectOptions && (
            <section className=" flex flex-col  gap-y-3 md:flex-row md:items-center md:justify-between md:gap-x-3 ">
              <div className="flex justify-between  w-full gap-x-3">
                <Select
                  options={breedOptions}
                  placeholder="All Breeds"
                  classNamePrefix="custom-select"
                  className={selectClassName}
                  onChange={(option) => {
                    if (option.value === 'all') {
                      setBreed('');
                      setPage(1);
                      return;
                    }
                    setBreed(option.value);
                    setPage(1);
                  }}
                />
                <Select
                  options={selectOptions.type}
                  placeholder="Type"
                  classNamePrefix="custom-select"
                  className={selectClassName}
                  onChange={(option) => {
                    setType(option.value);
                  }}
                />
              </div>
              <div className="flex justify-between w-full gap-x-3">
                <Select
                  options={selectOptions.order}
                  placeholder="Order"
                  classNamePrefix="custom-select"
                  className={selectClassName}
                  onChange={(option) => {
                    setOrder(option.value);
                  }}
                />
                <Select
                  options={selectOptions.limit}
                  placeholder="Limit"
                  classNamePrefix="custom-select"
                  className={selectClassName}
                  onChange={(option) => setLimit(option.value)}
                />
              </div>
            </section>
          )}
          {isLoadingGallery && (
            <div className="mt-[100px]">
              <LoaderSpinner />
            </div>
          )}
          {errorGallery && (
            <div className="mt-[100px]">
              <p>Something went wrong</p>
            </div>
          )}

          {shownPhotos.length > 0 && !isLoadingGallery && (
            <MasonryGallery photos={shownPhotos} favourite={favourite} />
          )}

          {total > limit && !isLoadingGallery && (
            <Pagination
              limit={limit}
              total={total}
              paginate={paginate}
              currentPage={page}
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

export default Home;
