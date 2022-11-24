import { useEffect, useState } from 'react';
import { requests } from '../servises/API';
import { CiFaceSmile } from 'react-icons/ci';
import { CgSmileSad } from 'react-icons/cg';
import { FaRegHeart } from 'react-icons/fa';

const Voting = () => {
  const [currentImage, setCurrentImage] = useState({});
  const [userId] = useState(JSON.parse(localStorage.getItem('catsapi_userId')));
  const [clicked, setClicked] = useState(false);
  const [userActions, setUserActions] = useState([]);

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
    (async () => {
      try {
        const favouriteList = await requests.getFavourites(userId);
        const votesList = await requests.getVoteList(userId);
        const result = [...favouriteList.data, ...votesList];

        const sortedResult = [...result].sort(
          (a, b) =>
            Number(new Date(b.created_at).getTime()) -
            Number(new Date(a.created_at).getTime()),
        );

        setUserActions(sortedResult.slice(0, 10));
      } catch (error) {
        console.error(error.message);
      }
    })();
  }, [userId, currentImage]);

  const handleVote = async (id, value) => {
    try {
      const currentVote = {
        image_id: id,
        sub_id: userId,
        value: value,
      };
      await requests.addVote(currentVote);
      setClicked(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavourite = async (id) => {
    try {
      const favourite = {
        image_id: id,
        sub_id: userId,
      };
      await requests.addFavourite(favourite);
      setClicked(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-y-4 lg:flex lg:flex-row lg:gap-x-4">
      <div className="relative w-full h-[90vh] lg:w-[50%]">
        <img
          className="w-full h-full block object-cover"
          src={currentImage?.url}
          alt={currentImage?.id}
        />
        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/60 opacity-0 hover:opacity-100 text-white">
          <div className="absolute top-4 right-4 gap-x-4 flex justify-center items-center ">
            <button
              onClick={() => handleVote(currentImage?.id, 1)}
              className="w-[40px] h-[40px] rounded bg-green-400 flex justify-center items-center"
            >
              <CiFaceSmile size={35} />
            </button>
            <button
              onClick={() => handleFavourite(currentImage?.id)}
              className="w-[40px] h-[40px] rounded bg-red-400 flex justify-center items-center"
            >
              <FaRegHeart size={35} />
            </button>
            <button
              onClick={() => handleVote(currentImage?.id, -1)}
              className="w-[40px] h-[40px] rounded bg-yellow-400 flex justify-center items-center"
            >
              <CgSmileSad size={35} />
            </button>
          </div>
        </div>
      </div>
      <div className=" w-full lg:w-[50%] flex  flex-col gap-y-3">
        {userActions.length > 0 &&
          userActions.map((it) => (
            <div
              key={it.id}
              className="flex  justify-between items-center p-3 rounded  bg-gray-200 dark:bg-slate-600"
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
                      : 'Favourite'}
                  </b>
                </p>
              </div>

              {it.value === 1 ? (
                <div className="w-[40px] h-[40px] rounded bg-green-400 flex justify-center items-center text-white">
                  <CiFaceSmile size={35} />
                </div>
              ) : it.value === -1 ? (
                <div className="w-[40px] h-[40px] rounded bg-yellow-400 flex justify-center items-center text-white">
                  <CgSmileSad size={35} />
                </div>
              ) : (
                <div className="w-[40px] h-[40px] rounded bg-red-400 flex justify-center items-center text-white">
                  <FaRegHeart size={35} />
                </div>
              )}
            </div>
          ))}
        {/* {votesList.length > 0 &&
          votesList.map((it) => (
            <div
              key={it.id}
              className="flex  justify-between items-center p-3 rounded  bg-gray-400 dark:bg-slate-600"
            >
              <div className="flex gap-x-3">
                <p className="font-bold">
                  {new Date(it.created_at).toJSON().slice(11, 16)}
                </p>
                <p>
                  Image ID: <b> {it.image_id}</b> was added to{' '}
                  <b>{it.value === 1 ? 'Likes' : 'Dislikes'}</b>
                </p>
              </div>

              {it.value === 1 ? (
                <div className="w-[40px] h-[40px] rounded bg-green-400 flex justify-center items-center">
                  <CiFaceSmile size={35} />
                </div>
              ) : (
                <div className="w-[40px] h-[40px] rounded bg-yellow-400 flex justify-center items-center">
                  <CgSmileSad size={35} />
                </div>
              )}
            </div>
          ))} */}
      </div>
    </div>
  );
};

export default Voting;
