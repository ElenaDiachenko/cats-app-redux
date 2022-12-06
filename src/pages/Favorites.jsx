import { useState, useEffect } from 'react';
import { MasonryGallery } from '../components/MasonryGallery';
import { Pagination } from '../components/Pagination';
import { LoaderSpinner } from '../components/LoaderSpinner';
import {
  useGetAllFavoriteQuery,
  useRemoveFavoriteMutation,
} from '../redux/cats';
import { NotFound } from '../components/NotFound';

const Favorites = () => {
  const [userId] = useState(JSON.parse(localStorage.getItem('catsapi_userId')));
  const [limit] = useState(10);
  const [page, setPage] = useState(1);
  const { favorites, isSuccess, isLoading, isError, totalCount } =
    useGetAllFavoriteQuery(
      {
        userId,
        limit,
        page: page - 1,
      },
      {
        selectFromResult: ({ data, isError, isLoading, isSuccess }) => ({
          favorites: data?.response,
          totalCount: data?.totalCount,
          isError,
          isLoading,
          isSuccess,
        }),
      },
    );
  const [removeFavorite] = useRemoveFavoriteMutation();

  useEffect(() => {
    window.scrollTo({
      behavior: 'smooth',
      top: '0px',
    });
  }, [page]);

  const paginate = (pageNumber) => setPage(pageNumber);
  return (
    <div>
      {isLoading && (
        <div className="mt-[100px]">
          <LoaderSpinner />
        </div>
      )}
      {isError && <p>Something went wrong</p>}

      {isSuccess && (
        <>
          {favorites.length ? (
            <MasonryGallery photos={favorites} removeVote={removeFavorite} />
          ) : (
            <NotFound title={'Favorites'} />
          )}
          {totalCount > limit && (
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
    </div>
  );
};

export default Favorites;
