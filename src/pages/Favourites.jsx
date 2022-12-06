import { useState, useEffect } from 'react';
import { MasonryGallery } from '../components/MasonryGallery';
import { Pagination } from '../components/Pagination';
import { LoaderSpinner } from '../components/LoaderSpinner';
import {
  useGetAllFavouriteQuery,
  useRemoveFavouriteMutation,
} from '../redux/cats';
import { NotFound } from '../components/NotFound';

const Favourites = () => {
  const [userId] = useState(JSON.parse(localStorage.getItem('catsapi_userId')));
  const [limit] = useState(10);
  const [page, setPage] = useState(1);
  const { favourites, isSuccess, isLoading, isError, totalCount } =
    useGetAllFavouriteQuery(
      {
        userId,
        limit,
        page: page - 1,
      },
      {
        selectFromResult: ({ data, isError, isLoading, isSuccess }) => ({
          favourites: data?.response,
          totalCount: data?.totalCount,
          isError,
          isLoading,
          isSuccess,
        }),
      },
    );
  const [removeFavourite] = useRemoveFavouriteMutation();

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
          {favourites.length ? (
            <MasonryGallery photos={favourites} removeVote={removeFavourite} />
          ) : (
            <NotFound title={'Favourites'} />
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

export default Favourites;
