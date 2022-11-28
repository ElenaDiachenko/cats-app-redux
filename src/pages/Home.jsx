import { useState, useEffect, useCallback } from 'react';
import { nanoid } from 'nanoid';
import { NavLink } from 'react-router-dom';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MasonryGallery } from '../components/MasonryGallery';
import { requests } from '../servises/API';
import { useOptions, useGetBreeds } from '../hooks';
import { selectOptions } from '../utilities/options';
import { Pagination } from '../components/Pagination';
import { LoaderSpinner } from '../components/LoaderSpinner';
import { SelectedSection } from '../components/SelectedSection';

const Home = () => {
  const [userId] = useState(
    JSON.parse(localStorage.getItem('catsapi_userId')) ?? nanoid(),
  );
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
  const [favouriteBtn] = useState(true);
  const [favouriteList, setFavouriteList] = useState([]);
  const [favourite, setFavourite] = useState(null);

  useEffect(() => {
    localStorage.setItem('catsapi_userId', JSON.stringify(userId));
  }, [userId]);

  useEffect(() => {
    (async () => {
      try {
        const res = await requests.getFavourites(userId);

        setFavouriteList(res.data);
      } catch (error) {
        console.error(error.message);
      }
    })();
  }, [userId, favourite]);

  /// show images

  useEffect(() => {
    if (!breeds.length && !favouriteList.length) return;
    (async () => {
      setIsLoadingGallery(true);
      setTotal(null);
      try {
        const res = await requests.getImages(order, type, breed, limit, page);
        let compareRes = [];
        res.data.forEach((item1) => {
          favouriteList.forEach((item) => {
            if (item.image_id === item1.id) {
              item1 = { ...item1, favourite: true };
            }
          });
          compareRes.push(item1);
        });

        setShownPhotos(compareRes);
        setTotal(+res.headers['pagination-count']);
      } catch (error) {
        setErrorGallery(true);
        console.log(error.message);
      } finally {
        setIsLoadingGallery(false);
      }
    })();
  }, [breed, limit, order, type, page, breeds, favourite, favouriteList]);

  const toggleFavourite = useCallback(() => {
    (async (id) => {
      const filter = await favouriteList.find((it) => it.image_id === id);
      if (filter === undefined) {
        (() => {
          try {
            const favourite = {
              image_id: id,
              sub_id: userId,
            };
            requests.addFavourite(favourite);
            setFavourite(nanoid());
          } catch (error) {
            console.log(error);
          }
        })();
      } else {
        (() => {
          try {
            requests.removeFavourite(filter.id);
            setFavourite(nanoid());
          } catch (error) {
            console.log(error);
          }
        })();
      }
    })();
  }, [favouriteList, userId]);
  //////
  useEffect(() => {
    window.scrollTo({
      behavior: 'smooth',
      top: '0px',
    });
  }, [page]);

  const paginate = (pageNumber) => setPage(pageNumber);

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
              <SelectedSection
                selectOptions={selectOptions}
                breedOptions={breedOptions}
                setBreed={setBreed}
                setPage={setPage}
                setLimit={setLimit}
                setOrder={setOrder}
                setType={setType}
              />
              <NavLink to="/upload">
                <div
                  type=""
                  className="px-4 h-[50px] text-sm text-gray-900 bg-gray-50 border border-gray-300  dark:bg-gray-700 dark:border-gray-600  dark:text-white flex justify-center items-center hover:opacity-50"
                >
                  <FaCloudUploadAlt className="mr-3" size={35} /> UPLOAD
                </div>
              </NavLink>
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

          {shownPhotos.length > 0 &&
            !isLoadingGallery &&
            favouriteList.length && (
              <MasonryGallery
                photos={shownPhotos}
                favouriteBtn={favouriteBtn}
                handleFavourite={toggleFavourite}
              />
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
