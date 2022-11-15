import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { getAllBreeds } from '../redux/breed/breedsSlice';
import { useGetBreedsQuery } from '../redux/breed/breedsApiSlice';
import { Searchbar } from '../components/Searchbar';
import { Select } from '../components/Select';
import { Pagination } from '../components/Pagination';
import { MasonryGallery } from '../components/MasonryGallery';

const Breeds = () => {
  const { data, error, isLoading, isFetching } = useGetBreedsQuery();
  console.log(data);
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(5);
  const [shownPhotos, setShownPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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

  const indexOfLastPost = currentPage * limit;
  const indexOfFirstPost = indexOfLastPost - limit;
  const currentPhotos = shownPhotos.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {error && <p>Something went wrong</p>}
      {isLoading && isFetching && <p>Loading ...</p>}
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

          {currentPhotos && <MasonryGallery photos={currentPhotos} />}
          {shownPhotos && (
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
