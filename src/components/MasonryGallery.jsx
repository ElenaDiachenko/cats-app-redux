import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Link } from 'react-router-dom';

export const MasonryGallery = ({ photos }) => {
  return (
    <ResponsiveMasonry
      className="mt-6"
      columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
    >
      <Masonry gutter="20px">
        {photos.map((photo) => (
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
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};
