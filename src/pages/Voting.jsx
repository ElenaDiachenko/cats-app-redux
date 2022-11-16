import { useEffect, useState } from 'react';
import { requests } from '../servises/API';
import { CiFaceSmile } from 'react-icons/ci';
import { CgSmileSad } from 'react-icons/cg';
import { FaRegHeart } from 'react-icons/fa';

const Voting = () => {
  const [currentImage, setCurrentImage] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const res = await requests.getImageToVote();
        setCurrentImage(res.data[0]);
      } catch (error) {
        console.error(error.message);
      }
    })();
  }, []);

  console.log(currentImage);
  return (
    <div className="flex flex-col gap-y-4 md:flex md:flex-row md:gap-x-4">
      <div className="relative h-[70vh] md:w-[50%]">
        <img
          className="w-full h-auto object-cover"
          src={currentImage?.url}
          alt={currentImage?.id}
        />
        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/60 opacity-0 hover:opacity-100 text-white">
          <div className="absolute top-4 right-4 gap-x-4 flex justify-center items-center ">
            <button
              onClick={() => {}}
              className="w-[40px] h-[40px] rounded bg-green-400 flex justify-center items-center"
            >
              <CiFaceSmile size={35} />
            </button>
            <button
              onClick={() => {}}
              className="w-[40px] h-[40px] rounded bg-red-400 flex justify-center items-center"
            >
              <FaRegHeart size={35} />
            </button>
            <button
              onClick={() => {}}
              className="w-[40px] h-[40px] rounded bg-yellow-400 flex justify-center items-center"
            >
              <CgSmileSad size={35} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Voting;
