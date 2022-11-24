import { useState, useEffect } from 'react';
import { MasonryGallery } from '../components/MasonryGallery';
import { requests } from '../servises/API';
import { Pagination } from '../components/Pagination';
import { LoaderSpinner } from '../components/LoaderSpinner';

const Favourites = () => {
  const [userId] = useState(JSON.parse(localStorage.getItem('catsapi_userId')));
  const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedFavourite, setSelectedFavourite] = useState('');
  // const [favouriteBtn] = useState(true);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await requests.getFavourites(userId, limit, page - 1);

        setFavourites(res.data);
        setTotal(+res.headers['pagination-count']);
      } catch (error) {
        console.error(error.message);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [userId, selectedFavourite, page, limit]);

  useEffect(() => {
    window.scrollTo({
      behavior: 'smooth',
      top: '0px',
    });
  }, [page]);

  const removeFavourite = async (id) => {
    try {
      await requests.removeFavourite(id);
      setSelectedFavourite(id);
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
        <MasonryGallery
          photos={favourites}
          // favouriteBtn={favouriteBtn}
          removeVote={removeFavourite}
        />
      ) : null}

      {!isLoading && total > limit && (
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

export default Favourites;
