import { useState, useEffect } from 'react';
import Select from 'react-select';
import { Pagination } from '../components/Pagination';
import { MasonryGallery } from '../components/MasonryGallery';
import { requests } from '../servises/API';
import { usePagination, useOptions } from '../hooks';
import { selectOptions } from '../utilities/options';

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
  const [total, setTotal] = useState(0);
  const currentPhotos = usePagination(shownPhotos, limit, page);
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
      try {
        const res = await requests.getImages(order, type, breed, limit, page);
        setShownPhotos(res.data);
        setTotal(+res.headers['pagination-count']);
        console.log(res.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [breed, limit, order, type, page, breeds]);

  // const breedOptions = [
  //   { value: 'all', label: 'All Breeds' },
  //   ...breeds.map((item) => ({
  //     value: item.id,
  //     label: item.name,
  //   })),
  // ];
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
                onChange={(option) => setBreed(option.value)}
              />
              <Select
                options={selectOptions.type}
                placeholder="Type"
                classNamePrefix="custom-select"
                className="
    focus:outline-0 w-full md:w-[50%] font-bold text-gray-900 dark:text-white bg-gray-50 border border-gray-300 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100"
                onChange={(option) => setType(option.value)}
              />
            </div>
            <div className="flex justify-between w-full gap-x-3">
              <Select
                options={selectOptions.order}
                placeholder="Order"
                classNamePrefix="custom-select"
                className="
    focus:outline-0 w-full md:w-[50%] font-bold text-gray-900 dark:text-white bg-gray-50 border border-gray-300 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100"
                onChange={(option) => setOrder(option.value)}
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
          {currentPhotos && <MasonryGallery photos={currentPhotos} />}

          {shownPhotos.length > 0 && (
            <Pagination
              limit={limit}
              total={total}
              paginate={paginate}
              currentPage={page}
            />
          )}
        </>
      )}
    </>
  );
};

export default Home;
