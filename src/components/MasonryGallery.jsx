import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Link } from 'react-router-dom';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

export const MasonryGallery = ({
  photos,
  link,
  favouriteBtn,
  handleFavourite,
}) => {
  return (
    <ResponsiveMasonry
      className="mt-6"
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
          : favouriteBtn
          ? photos.map((photo) => (
              <div className="relative" key={photo.id}>
                <img className="rounded w-full block" src={photo?.url} alt="" />
                <div className="absolute top-0 left-0 w-full h-full hover:bg-black/60 opacity-0 hover:opacity-100 text-white">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {photo.favourite ? (
                      <FaHeart
                        onClick={() => handleFavourite(photo.id)}
                        className="fill-red-400 cursor-pointer"
                        size={35}
                      />
                    ) : (
                      <FaRegHeart
                        onClick={() => handleFavourite(photo.id)}
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
                {/* {photo.name && (
                  <p className="absolute bottom-0 left-0 w-full text-center rounded-b text-white bg-black/50 py-3 font-bold">
                    {photo.name}
                  </p>
                )} */}
              </div>
            ))}

        {/* {photos.map((photo) => (
          <div key={photo.id}>
            <Link to={`/breeds/${photo.id}`}>
              <img
                className="rounded"
                id={photo.id}
                src={photo?.url}
                style={{ width: '100%', display: 'block' }}
                alt=""
              />
            </Link>
          </div>
        ))} */}
        {/* {photos.map((photo) => (
          <div key={photo.reference_image_id ?? photo.id}>
            <Link to={`/breeds/${photo.reference_image_id ?? photo.id}`}>
              <img
                className="rounded"
                id={photo.reference_image_id ?? photo.id}
                src={photo?.image?.url ?? photo?.url}
                style={{ width: '100%', display: 'block' }}
                alt=""
              />
            </Link>
          </div>
        ))} */}
      </Masonry>
    </ResponsiveMasonry>
  );
};
