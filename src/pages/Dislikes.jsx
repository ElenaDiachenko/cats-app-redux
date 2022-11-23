import { useState, useEffect } from 'react';
import { MasonryGallery } from '../components/MasonryGallery';
import { requests } from '../servises/API';
import { Pagination } from '../components/Pagination';
import { LoaderSpinner } from '../components/LoaderSpinner';

const Dislikes = () => {
  const [userId] = useState(JSON.parse(localStorage.getItem('catsapi_userId')));
  const [dislikes, setDislikes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedVote, setSelectedVote] = useState('');
  const [limit] = useState(10);
  const [total, setTotal] = useState(null);
  const [page, setPage] = useState(1);
  const [currentPhotos, setCurrentPhotos] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const votesList = await requests.getVoteList(userId, 100);

        const filteredResult = votesList.filter((item) => item.value === -1);
        setDislikes(filteredResult);
        setTotal(filteredResult.length);
        setPage(1);
      } catch (error) {
        console.error(error.message);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [userId, selectedVote]);

  useEffect(() => {
    if (!dislikes.length) return;
    const indexOfLastItem = page * limit;
    const indexOfFirstItem = indexOfLastItem - limit;
    setCurrentPhotos(dislikes.slice(indexOfFirstItem, indexOfLastItem));
  }, [dislikes, limit, page]);

  const removeVote = async (id) => {
    try {
      await requests.removeVote(id);
      setSelectedVote(id);
    } catch (error) {
      console.log(error);
    }
  };

  const paginate = (pageNumber) => setPage(pageNumber);
  return (
    <div>
      {isLoading && (
        <div className="mt-[100px]">
          <LoaderSpinner />
        </div>
      )}
      {error && <p>Something went wrong</p>}
      {!isLoading ? (
        <MasonryGallery photos={currentPhotos} removeVote={removeVote} />
      ) : null}

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
