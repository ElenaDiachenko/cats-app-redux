import { useEffect, useState } from 'react';
import { requests } from '../servises/API';
import { BsEmojiSmile } from 'react-icons/bs';
import { ImSad } from 'react-icons/im';
import { FaRegHeart } from 'react-icons/fa';
import {
  useGetVotesQuery,
  useGetAllFavoriteQuery,
  useAddVoteMutation,
  useAddFavoriteMutation,
} from '../redux/cats';

const Voting = () => {
  const [currentImage, setCurrentImage] = useState({});
  const [userId] = useState(JSON.parse(localStorage.getItem('catsapi_userId')));
  const [clicked, setClicked] = useState(false);
  const [userActions, setUserActions] = useState([]);
  const { data: votes, isSuccess: isSuccessVotes } = useGetVotesQuery(userId, {
    skip: !userId,
  });
  const { favorites, isSuccessFavorites } = useGetAllFavoriteQuery(
    {
      userId,
      limit: 10,
      page: 1,
    },
    {
      skip: !userId,
      selectFromResult: ({ data, isSuccess }) => ({
        favorites: data?.response,
        isSuccessFavorites: isSuccess,
      }),
    },
  );

  const [addFavorite] = useAddFavoriteMutation();
  const [addVote] = useAddVoteMutation();

  useEffect(() => {
    (async () => {
      try {
        const res = await requests.getImageToVote();
        setCurrentImage(res.data[0]);
        setClicked(false);
      } catch (error) {
        console.error(error.message);
      }
    })();
  }, [clicked, userId]);

  useEffect(() => {
    if (isSuccessVotes && isSuccessFavorites) {
      const result = [...favorites, ...votes];

      const sortedResult = [...result].sort(
        (a, b) =>
          Number(new Date(b.created_at).getTime()) -
          Number(new Date(a.created_at).getTime()),
      );

      setUserActions(sortedResult.slice(0, 10));
    }
  }, [favorites, isSuccessFavorites, isSuccessVotes, votes]);

  const handleVote = (id, value) => {
    const currentVote = {
      image_id: id,
      sub_id: userId,
      value: value,
    };
    addVote(currentVote);
    setClicked(true);
  };

  const handleFavorite = (id) => {
    const favorite = {
      image_id: id,
      sub_id: userId,
    };
    addFavorite(favorite);
    setClicked(true);
  };

  return (
    <div className="flex flex-col gap-y-4 lg:flex lg:flex-row lg:gap-x-4">
      <div className="relative w-full h-[90vh] lg:w-[50%]">
        <img
          className="w-full h-full block object-cover rounded"
          src={currentImage?.url}
          alt={currentImage?.id}
        />
        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/60 opacity-0 hover:opacity-100 text-white">
          <div className="absolute top-4 right-4 gap-x-4 flex justify-center items-center ">
            <button
              onClick={() => handleVote(currentImage?.id, 1)}
              className="w-[40px] h-[40px] rounded bg-green-400 flex justify-center items-center"
            >
              <BsEmojiSmile size={35} />
            </button>
            <button
              onClick={() => handleFavorite(currentImage?.id)}
              className="w-[40px] h-[40px] rounded bg-red-400 flex justify-center items-center"
            >
              <FaRegHeart size={35} />
            </button>
            <button
              onClick={() => handleVote(currentImage?.id, -1)}
              className="w-[40px] h-[40px] rounded bg-yellow-400 flex justify-center items-center"
            >
              <ImSad size={35} />
            </button>
          </div>
        </div>
      </div>
      <div className=" w-full lg:w-[50%] flex  flex-col gap-y-3">
        {userActions.length > 0 &&
          userActions.map((it) => (
            <div
              key={it.id}
              className="flex  justify-between items-center p-3 rounded  bg-white dark:bg-slate-600"
            >
              <div className="flex gap-x-3">
                <p className="font-bold">{it.created_at.slice(11, 16)}</p>
                <p>
                  Image ID: <b> {it.image_id}</b> was added to{' '}
                  <b>
                    {it.value === 1
                      ? 'Likes'
                      : it.value === -1
                      ? 'Dislikes'
                      : 'Favorite'}
                  </b>
                </p>
              </div>

              {it.value === 1 ? (
                <div className="w-[40px] h-[40px] rounded bg-green-400 flex justify-center items-center text-white">
                  <BsEmojiSmile size={35} />
                </div>
              ) : it.value === -1 ? (
                <div className="w-[40px] h-[40px] rounded bg-yellow-400 flex justify-center items-center text-white">
                  <ImSad size={35} />
                </div>
              ) : (
                <div className="w-[40px] h-[40px] rounded bg-red-400 flex justify-center items-center text-white">
                  <FaRegHeart size={35} />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Voting;
