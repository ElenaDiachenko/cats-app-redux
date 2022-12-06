import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Link } from 'react-router-dom';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';

export const MasonryGallery = ({
  photos,
  link,
  favoriteBtn,
  handleFavorite,
  removeVote,
}) => {
  return (
    <ResponsiveMasonry
      className="mt-6 h-[100%]"
      columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
    >
      <Masonry gutter="20px">
        {link
          ? photos.map((photo) => (
              <Link
                to={`/breeds/${photo.id}`}
                key={photo.reference_image_id ?? photo.id}
              >
                <div className="relative">
                  <img
                    className="rounded w-full block"
                    src={photo?.image?.url ?? photo?.url}
                    alt=""
                  />
                  {photo.name && (
                    <p className="absolute bottom-0 left-0 w-full text-center rounded-b text-white bg-black/50 py-3 font-bold">
                      {photo.name}
                    </p>
                  )}
                </div>
              </Link>
            ))
          : favoriteBtn
          ? photos.map((photo) => (
              <div className="relative" key={photo.id}>
                <img className="rounded w-full block" src={photo?.url} alt="" />
                <div className="absolute top-0 left-0 w-full h-full hover:bg-black/60 opacity-0 hover:opacity-100 text-white">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {photo.favorite ? (
                      <FaHeart
                        onClick={() => handleFavorite(photo)}
                        className="fill-red-400 cursor-pointer"
                        size={35}
                      />
                    ) : (
                      <FaRegHeart
                        onClick={() => handleFavorite(photo)}
                        className="fill-red-400 cursor-pointer"
                        size={35}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))
          : photos.map((photo) => (
              <div className="relative" key={photo.id}>
                <img
                  className="rounded w-full block"
                  src={photo?.image?.url}
                  alt=""
                />
                <p className="absolute top-4 right-4 p-1.5 rounded opacity-30 hover:opacity-100 text-gray-900 bg-gray-100 border border-gray-300  dark:bg-gray-700 dark:border-gray-600  dark:text-white flex justify-center items-center ">
                  <RiDeleteBin6Fill
                    size={35}
                    onClick={() => removeVote(photo.id)}
                  />
                </p>
              </div>
            ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};
