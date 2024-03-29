import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { NavLink } from 'react-router-dom';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MasonryGallery } from '../components/MasonryGallery';
import { useOptions } from '../hooks';

import {
  useGetBreedListQuery,
  useGetAllImagesQuery,
  useRemoveFavoriteMutation,
  useAddFavoriteMutation,
} from '../redux/cats';

import { selectOptions } from '../utilities/options';
import { Pagination } from '../components/Pagination';
import { LoaderSpinner } from '../components/LoaderSpinner';
import { SelectedSection } from '../components/SelectedSection';

const Home = () => {
  const [userId] = useState(
    JSON.parse(localStorage.getItem('catsapi_userId')) ?? nanoid()
  );
  const [order, setOrder] = useState('desc');
  const [type, setType] = useState('gif,jpg,png');
  const [breed, setBreed] = useState('');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [favoriteBtn] = useState(true);

  const {
    data: breeds = [],
    error,
    isLoading: isLoadingBreeds,
    isSuccess: isSuccessBreeds,
  } = useGetBreedListQuery();

  const {
    images,
    // isSuccessImages,
    totalCount,
    isLoadingImages,
    isFetchingImages,
  } = useGetAllImagesQuery(
    {
      order,
      type,
      breedId: breed,
      limit,
      page,
      userId,
    },
    {
      selectFromResult: ({
        data,
        error,
        isLoading,
        isSuccess,
        isFetching,
      }) => ({
        images: data?.response,
        totalCount: data?.totalCount,
        error,
        isLoadingImages: isLoading,
        isSuccessImages: isSuccess,
        isFetchingImages: isFetching,
      }),
    }
  );

  const breedOptions = useOptions(breeds, 'all', 'All Breeds');

  useEffect(() => {
    localStorage.setItem('catsapi_userId', JSON.stringify(userId));
  }, [userId]);

  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  const toggleFavorite = async photo => {
    if (photo.favourite === undefined) {
      // console.log(photo.id, 'TOGGLE');
      const favorite = {
        image_id: photo.id,
        sub_id: userId,
      };
      addFavorite(favorite);
    } else {
      // console.log(photo?.favourite.id, 'REMOVE');

      removeFavorite(photo?.favourite.id);
    }
  };

  useEffect(() => {
    window.scrollTo({
      behavior: 'smooth',
      top: '0px',
    });
  }, [page]);

  const paginate = pageNumber => setPage(pageNumber);

  return (
    <>
      {isSuccessBreeds && (
        <main className="  min-h-full flex flex-col justify-start ">
          {isLoadingBreeds ? (
            <div className="mt-[100px]">
              <LoaderSpinner />
            </div>
          ) : null}
          {error && <p>Something went wrong</p>}
          {selectOptions && (
            <section className=" flex flex-col  gap-y-3 md:flex-row md:items-center md:justify-between md:gap-x-3 grow-0">
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

          {isLoadingImages || isFetchingImages ? (
            <div className="mt-[100px]">
              <LoaderSpinner />
            </div>
          ) : images?.length > 0 ? (
            <div className="flex flex-col">
              <MasonryGallery
                photos={images}
                favoriteBtn={favoriteBtn}
                handleFavorite={toggleFavorite}
              />
              {totalCount > limit ? (
                <Pagination
                  limit={limit}
                  total={totalCount}
                  paginate={paginate}
                  currentPage={page}
                  buttonConst={3}
                  contentPerPage={5}
                  siblingCount={1}
                />
              ) : null}
            </div>
          ) : (
            <div className=" font-bold">No images.</div>
          )}
        </main>
      )}
    </>
  );
};

export default Home;
