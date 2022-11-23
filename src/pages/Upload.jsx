import { useState, useEffect, useRef } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';
import { requests } from '../servises/API';

import { BackLink } from '../components/BackLink';

const Upload = () => {
  const inputFileRef = useRef(null);
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (images.length < 1) return;
    const newImagesURLs = [];

    images.forEach((image) => newImagesURLs.push(URL.createObjectURL(image)));
    setImageURLs(newImagesURLs);
  }, [images]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.elements[0].files[0]);
    const file = e.target.elements[0].files[0];
    let formData = new FormData();
    formData.append('file', file);
    try {
      const result = await requests.uploadImage(formData);
      console.log(result);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <BackLink to={location.state?.from ?? '/breeds'}>Go Back</BackLink>
      <div>
        <div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex gap-x-4">
                <button
                  className="px-6 h-[50px] text-sm text-gray-900 bg-gray-50 border border-gray-300  dark:bg-gray-700 dark:border-gray-600  dark:text-white flex justify-center items-center hover:opacity-50"
                  onClick={() => inputFileRef.current.click()}
                >
                  <BiImageAdd className="mr-3" size={35} /> ADD IMAGE
                </button>
                <button
                  className="px-6 h-[50px] text-sm text-gray-900 bg-gray-50 border border-gray-300  dark:bg-gray-700 dark:border-gray-600  dark:text-white flex justify-center items-center hover:opacity-50"
                  type="submit"
                >
                  <FaCloudUploadAlt className="mr-3" size={35} /> UPLOAD
                </button>
              </div>
              <input
                ref={inputFileRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setImages([...e.target.files]);
                }}
                hidden
              />
            </form>
          </div>
        </div>

        <div>
          <button onClick={() => setImageURLs([])}>
            <RiDeleteBin6Fill size={35} />
          </button>

          {imageURLs.map((imageSrc) => (
            <img key={imageSrc} src={imageSrc} alt="upload_image" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Upload;
