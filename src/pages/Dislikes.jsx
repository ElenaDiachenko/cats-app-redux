import { useState, useEffect } from 'react';
import { MasonryGallery } from '../components/MasonryGallery';
import { Pagination } from '../components/Pagination';
import { LoaderSpinner } from '../components/LoaderSpinner';
import { useGetDislikesQuery, useRemoveVoteMutation } from '../redux/cats';
import { NotFound } from '../components/NotFound';

const Dislikes = () => {
  const [userId] = useState(JSON.parse(localStorage.getItem('catsapi_userId')));
  const [limit] = useState(10);
  const [total, setTotal] = useState(null);
  const [page, setPage] = useState(1);
  const [currentPhotos, setCurrentPhotos] = useState([]);
  const {
    data: dislikes,
    isLoading: isLoadingDislikes,
    isError: isErrorDislikes,
    isSuccess: isSuccessDislikes,
  } = useGetDislikesQuery(userId, {
    skip: !userId,
  });
  const [removeVote] = useRemoveVoteMutation();

  useEffect(() => {
    if (!isSuccessDislikes) return;
    const indexOfLastItem = page * limit;
    const indexOfFirstItem = indexOfLastItem - limit;
    setCurrentPhotos(dislikes.slice(indexOfFirstItem, indexOfLastItem));
    setTotal(dislikes.length);
  }, [dislikes, isSuccessDislikes, limit, page]);

  useEffect(() => {
    window.scrollTo({
      behavior: 'smooth',
      top: '0px',
    });
  }, [page]);

  const paginate = (pageNumber) => setPage(pageNumber);
  return (
    <div>
      {isLoadingDislikes && (
        <div className="mt-[100px]">
          <LoaderSpinner />
        </div>
      )}
      {isErrorDislikes && <p>Something went wrong</p>}
      {!isLoadingDislikes &&
        (currentPhotos.length ? (
          <MasonryGallery photos={currentPhotos} removeVote={removeVote} />
        ) : (
          <NotFound title={'Dislikes'} />
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

export default Dislikes;
