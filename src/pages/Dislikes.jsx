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

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const votesList = await requests.getVoteList(userId);

        const filteredResult = votesList.filter((item) => item.value === -1);
        setDislikes(filteredResult);
        console.log(filteredResult);
      } catch (error) {
        console.error(error.message);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [userId]);

  return (
    <div>
      {isLoading && (
        <div className="mt-[100px]">
          <LoaderSpinner />
        </div>
      )}
      {error && <p>Something went wrong</p>}
      <MasonryGallery photos={dislikes} />
    </div>
  );
};

export default Dislikes;
