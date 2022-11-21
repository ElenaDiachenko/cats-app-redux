import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Link } from 'react-router-dom';

export const MasonryGallery = ({ photos, link }) => {
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
          : photos.map((photo) => (
              <div className="relative" key={photo.id}>
                <img className="rounded w-full block" src={photo?.url} alt="" />
                {photo.name && (
                  <p className="absolute bottom-0 left-0 w-full text-center rounded-b text-white bg-black/50 py-3 font-bold">
                    {photo.name}
                  </p>
                )}
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
