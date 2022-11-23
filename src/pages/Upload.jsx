import { useState, useEffect, useRef } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';
import { requests } from '../servises/API';
import { LoaderSpinner } from '../components/LoaderSpinner';
import { BackLink } from '../components/BackLink';

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userId] = useState(JSON.parse(localStorage.getItem('catsapi_userId')));
  const inputFileRef = useRef(null);
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (images.length < 1) {
      setImageURLs([]);
    }
    const newImagesURLs = [];

    images.forEach((image) => newImagesURLs.push(URL.createObjectURL(image)));
    setImageURLs(newImagesURLs);
  }, [images]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target[2].files[0];
    let formData = new FormData();
    formData.append('file', file);
    formData.append('sub_id', userId);
    try {
      setIsLoading(true);
      await requests.uploadImage(formData);
      setImages([]);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
      setIsLoading(false);
      setError(true);
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <BackLink to={location.state?.from ?? '/breeds'}>Go Back</BackLink>
      <form className="mb-4 mx-auto" onSubmit={handleSubmit}>
        <div className="flex gap-x-4">
          <button
            type="button"
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
      {isLoading && <LoaderSpinner />}
      {error && <p>Something went wrong</p>}
      <div className=" relative rounded mx-auto flex  justify-center items-center bg-gray-200 dark:bg-slate-600 w-full md:w-[70%] h-[70vh]">
        {imageURLs.length ? (
          <button
            className="absolute top-4 right-4 p-2 rounded text-gray-900 bg-gray-50 border border-gray-300  dark:bg-gray-700 dark:border-gray-600  dark:text-white flex justify-center items-center hover:opacity-50"
            onClick={() => setImages([])}
          >
            <RiDeleteBin6Fill size={35} />
          </button>
        ) : null}
        {imageURLs.length ? (
          imageURLs.map((imageSrc) => (
            <img
              className="w-full h-full block object-cover"
              key={imageSrc}
              src={imageSrc}
              alt="upload_image"
            />
          ))
        ) : (
          <p className="text-xl lg:text-2xl font-bold">Download image</p>
        )}
      </div>
    </div>
  );
};

export default Upload;
