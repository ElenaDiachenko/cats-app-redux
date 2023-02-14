import { useState, useEffect, useMemo } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { MasonryGallery } from '../components/MasonryGallery';
import { Pagination } from '../components/Pagination';
import { LoaderSpinner } from '../components/LoaderSpinner';
import { useRemoveVoteMutation, useGetVotesQuery } from '../redux/cats';
import { NotFound } from '../components/NotFound';

const Likes = () => {
  const [userId] = useState(JSON.parse(localStorage.getItem('catsapi_userId')));
  const [limit] = useState(10);
  const [total, setTotal] = useState(null);
  const [page, setPage] = useState(1);
  const [currentPhotos, setCurrentPhotos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const selectLikes = useMemo(() => {
    const emptyArray = [];
    return createSelector(
      [data => data],
      data => data?.filter(item => item.value === 1) ?? emptyArray
    );
  }, []);

  const {
    data: likes,
    isLoading: isLoadingLikes,
    isError: isErrorLikes,
    isSuccess: isSuccessLikes,
    isFetching: isFetchingLikes,
  } = useGetVotesQuery(
    { userId },
    {
      skip: !userId,
      selectFromResult: ({
        data,
        isLoading,
        isError,
        isSuccess,
        isFetching,
      }) => ({
        isLoading: isLoading,
        isError: isError,
        isSuccess: isSuccess,
        isFetching: isFetching,
        data: selectLikes(data),
      }),
    }
  );

  const [removeVote] = useRemoveVoteMutation();

  useEffect(() => {
    if (isLoadingLikes || isFetchingLikes) {
      setIsLoading(true);
    }
    if (!isSuccessLikes) {
      setIsLoading(false);
      return;
    }

    const indexOfLastItem = page * limit;
    const indexOfFirstItem = indexOfLastItem - limit;
    setCurrentPhotos(likes.slice(indexOfFirstItem, indexOfLastItem));
    setTotal(likes.length);
    setIsLoading(false);
  }, [likes, isSuccessLikes, limit, page, isLoadingLikes, isFetchingLikes]);

  useEffect(() => {
    window.scrollTo({
      behavior: 'smooth',
      top: '0px',
    });
  }, [page]);

  const paginate = pageNumber => setPage(pageNumber);
  return (
    <div className="h-full w-full ">
      {isLoading || isLoadingLikes || isFetchingLikes ? (
        <div className="flex items-center justify-center h-full w-full">
          <LoaderSpinner />
        </div>
      ) : currentPhotos ? (
        <MasonryGallery photos={currentPhotos} removeVote={removeVote} />
      ) : !isErrorLikes ? (
        <NotFound title={'Likes'} />
      ) : null}
      {isErrorLikes && (
        <p className="flex items-center justify-center h-full w-full font-bold">
          Something went wrong
        </p>
      )}

      {total > limit && currentPhotos ? (
        <Pagination
          limit={limit}
          total={total}
          paginate={paginate}
          currentPage={page}
          buttonConst={3}
          contentPerPage={5}
          siblingCount={1}
        />
      ) : null}
    </div>
  );
};

export default Likes;
