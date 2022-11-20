import { useState, useEffect } from 'react';
import Select from 'react-select';
import { MasonryGallery } from '../components/MasonryGallery';
import { requests } from '../servises/API';
import { useOptions } from '../hooks';
import { selectOptions } from '../utilities/options';
import Pagination2 from '../components/Pagination2';

const Home = () => {
  const [breeds, setBreeds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState('rand');
  const [type, setType] = useState('gif,jpg,png');
  const [breed, setBreed] = useState('');
  const [limit, setLimit] = useState(10);
  const [shownPhotos, setShownPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const breedOptions = useOptions(breeds, 'all', 'All Breeds');

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
    if (breeds.length < 0) return;
    (async () => {
      setTotal(null);
      try {
        const res = await requests.getImages(order, type, breed, limit, page);

        setShownPhotos(res.data);
        setTotal(+res.headers['pagination-count']);

        console.log(+res.headers['pagination-count']);
      } catch (error) {
        console.log(error.message);
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

  return (
    <>
      {isLoading && <p>Loading ...</p>}
      {breeds.length > 0 && selectOptions && (
        <>
          <section className=" flex flex-col  gap-y-3 md:flex-row md:items-center md:justify-between md:gap-x-3 ">
            <div className="flex justify-between  w-full gap-x-3">
              <Select
                options={breedOptions}
                placeholder="All Breeds"
                classNamePrefix="custom-select"
                className="
    focus:outline-0 w-full md:w-[50%] font-bold text-gray-900 dark:text-white bg-gray-50 border border-gray-300 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100"
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
                className="
    focus:outline-0 w-full md:w-[50%] font-bold text-gray-900 dark:text-white bg-gray-50 border border-gray-300 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100"
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
                className="
    focus:outline-0 w-full md:w-[50%] font-bold text-gray-900 dark:text-white bg-gray-50 border border-gray-300 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100"
                onChange={(option) => {
                  setOrder(option.value);
                }}
              />
              <Select
                options={selectOptions.limit}
                placeholder="Limit"
                classNamePrefix="custom-select"
                className="
    focus:outline-0 w-full md:w-[50%] font-bold text-gray-900 dark:text-white bg-gray-50 border border-gray-300 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100"
                onChange={(option) => setLimit(option.value)}
              />
            </div>
          </section>
          {shownPhotos.length > 0 && <MasonryGallery photos={shownPhotos} />}

          {shownPhotos.length > 0 && total && (
            <Pagination2
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
