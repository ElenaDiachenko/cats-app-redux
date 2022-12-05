import { useState, useEffect, useCallback } from 'react';
import { nanoid } from 'nanoid';
import { NavLink } from 'react-router-dom';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MasonryGallery } from '../components/MasonryGallery';
import { requests } from '../servises/API';
import { useOptions, useGetBreeds } from '../hooks';
import {
  useGetBreedListQuery,
  useGetAllFavouriteQuery,
  useGetAllImagesQuery,
} from '../redux/cats/catsApiSlice';

import { selectOptions } from '../utilities/options';
import { Pagination } from '../components/Pagination';
import { LoaderSpinner } from '../components/LoaderSpinner';
import { SelectedSection } from '../components/SelectedSection';

const Home = () => {
  const [userId] = useState(
    JSON.parse(localStorage.getItem('catsapi_userId')) ?? nanoid(),
  );
  // const { breeds, isLoading, error } = useGetBreeds();

  const [isLoadingGallery, setIsLoadingGallery] = useState(false);
  const [errorGallery, setErrorGallery] = useState(false);
  const [order, setOrder] = useState('rand');
  const [type, setType] = useState('gif,jpg,png');
  const [breed, setBreed] = useState('');
  const [limit, setLimit] = useState(10);
  const [shownPhotos, setShownPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [favouriteBtn] = useState(true);
  // const [favouriteList, setFavouriteList] = useState([]);
  const [favourite, setFavourite] = useState(null);
  const {
    data: breeds = [],
    error,
    isFetching: isFetchingBreeds,
    isSuccess: isSuccessBreeds,
  } = useGetBreedListQuery();
  const { data: allFavourites = [], isSuccess: isSuccessFavourites } =
    useGetAllFavouriteQuery({
      userId,
    });

  ////////////////////////
  const { images, isSuccessImages, totalCount } = useGetAllImagesQuery(
    {
      order,
      type,
      breedId: breed,
      limit,
      page,
    },
    {
      selectFromResult: ({ data, error, isLoading, isSuccess }) => ({
        images: data?.response,
        totalCount: data?.totalCount,
        error,
        isLoading,
        isSuccessImages: isSuccess,
      }),
    },
  );

  const breedOptions = useOptions(breeds, 'all', 'All Breeds');

  useEffect(() => {
    localStorage.setItem('catsapi_userId', JSON.stringify(userId));
  }, [userId]);

  const getImageWithFavourite = (images, favourites) => {
    let result = [];
    images.forEach((item1) => {
      favourites.forEach((item) => {
        if (item.image_id === item1.id) {
          item1 = { ...item1, favourite: true };
        }
      });
      result.push(item1);
    });

    return result;
  };

  useEffect(() => {
    if (isSuccessImages && isSuccessFavourites) {
      setIsLoadingGallery(true);
      const result = getImageWithFavourite(images, allFavourites);
      setShownPhotos(result);
      setIsLoadingGallery(false);
    }
  }, [allFavourites, images, isSuccessFavourites, isSuccessImages]);

  console.log(images);
  // useEffect(() => {
  //   (async () => {
  //     setTotal(null);
  //     try {
  //       const res = await requests.getImages(order, type, breed, limit, page);
  //       setTotal(+res.headers['pagination-count']);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   })();
  // }, [breed, limit, order, page, type]);

  // useEffect(() => {
  //   if (!isSuccessImages && !isSuccessFavourites) return;
  // const result = getImageWithFavourite(images, allFavourites);
  // setShownPhotos(result);
  // }, [allFavourites, images, isSuccessFavourites, isSuccessImages]);

  const toggleFavourite = useCallback(() => {
    (async (id) => {
      const filter = await allFavourites.find((it) => it.image_id === id);
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
  }, [allFavourites, userId]);
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
      {isFetchingBreeds && (
        <div className="mt-[100px]">
          <LoaderSpinner />
        </div>
      )}
      {error && <p>Something went wrong</p>}

      {shownPhotos.length > 0 && (
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
          {errorGallery && (
            <div className="mt-[100px]">
              <p>Something went wrong</p>
            </div>
          )}

          {shownPhotos.length > 0 && (
            <MasonryGallery
              photos={shownPhotos}
              favouriteBtn={favouriteBtn}
              handleFavourite={toggleFavourite}
            />
          )}

          {totalCount > limit && !isLoadingGallery && (
            <Pagination
              limit={limit}
              total={totalCount}
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
