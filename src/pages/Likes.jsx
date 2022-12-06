import { useState, useEffect } from 'react';
import { MasonryGallery } from '../components/MasonryGallery';
import { Pagination } from '../components/Pagination';
import { LoaderSpinner } from '../components/LoaderSpinner';
import { useGetLikesQuery, useRemoveVoteMutation } from '../redux/cats';
import { NotFound } from '../components/NotFound';

const Likes = () => {
  const [userId] = useState(JSON.parse(localStorage.getItem('catsapi_userId')));
  const [limit] = useState(10);
  const [total, setTotal] = useState(null);
  const [page, setPage] = useState(1);
  const [currentPhotos, setCurrentPhotos] = useState([]);
  const {
    data: likes,
    isLoading: isLoadingLikes,
    isError: isErrorLikes,
    isSuccess: isSuccessLikes,
  } = useGetLikesQuery(userId, {
    skip: !userId,
  });
  const [removeVote] = useRemoveVoteMutation();

  useEffect(() => {
    if (!isSuccessLikes) return;
    const indexOfLastItem = page * limit;
    const indexOfFirstItem = indexOfLastItem - limit;
    setCurrentPhotos(likes.slice(indexOfFirstItem, indexOfLastItem));
    setTotal(likes.length);
  }, [likes, isSuccessLikes, limit, page]);

  useEffect(() => {
    window.scrollTo({
      behavior: 'smooth',
      top: '0px',
    });
  }, [page]);

  const paginate = (pageNumber) => setPage(pageNumber);
  return (
    <div>
      {isLoadingLikes && (
        <div className="mt-[100px]">
          <LoaderSpinner />
        </div>
      )}
      {isErrorLikes && <p>Something went wrong</p>}
      {!isLoadingLikes &&
        (currentPhotos.length ? (
          <MasonryGallery photos={currentPhotos} removeVote={removeVote} />
        ) : (
          <NotFound title={'Likes'} />
        ))}
      {total > limit && (
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
    </div>
  );
};

export default Likes;
