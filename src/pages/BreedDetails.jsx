import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { allBreeds } from '../redux/breed/breedsSlice';

import { useParams, useLocation, Link } from 'react-router-dom';
import { useGetBreedsQuery } from '../redux/breed/breedsApiSlice';
import { requests } from '../servises/API';
import { MdArrowBackIosNew } from 'react-icons/md';
import Carousel from '../components/Carousel';
const BreedDetails = () => {
  const { data, error, isLoading } = useGetBreedsQuery();
  const location = useLocation();
  console.log(location);
  const { id } = useParams();
  const [breeds, setBreeds] = useState([]);
  const breedDescr = data.find((it) => it.id === id);
  console.log(breedDescr);

  useEffect(() => {
    (async () => {
      try {
        const res = await requests.getBreedById(id);
        setBreeds(res.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [id]);

  console.log(breeds);

  return (
    <>
      {error && <p>Something went wrong</p>}
      {isLoading && <p>Loading ...</p>}
      {data && (
        <div className="flex flex-col gap-y-4">
          <Link to={location.state?.from ?? '/breeds'}>
            <div className="flex gap-x-4 items-center">
              <MdArrowBackIosNew className="font-bold" />

              <p>Go Breed</p>
            </div>
          </Link>

          <div className="flex flex-col gap-y-3 md:flex-row md:justify-between md:gap-x-4">
            <div className=" f-full md:w-[70%] bg-slate-600 rounded p-2 md:p-3 flex justufy-center items-center">
              <Carousel images={breeds} />
            </div>
            <div className="f-full md:w-[30%]">
              <h1 className=" text-center text-xl md:text-2xl font-bold mb-3">
                {breedDescr.name}
              </h1>
              <p className="mb-4 text-gray-800 dark:text-gray-400  text-lg md:text-xl">
                {breedDescr.description}
              </p>
              <div className="flex flex-col gap-y-3">
                <p className="font-bold text-lg   md:text-xl">Temperament: </p>
                <p className="font-semibold text-gray-800 dark:text-gray-400 text-lg">
                  {breedDescr.temperament}
                </p>
                <p className="font-bold text-lg md:text-xl  ">
                  Origin:{' '}
                  <span className="font-semibold text-gray-800 dark:text-gray-400 text-lg">
                    {breedDescr.origin}
                  </span>
                </p>
                <p className="font-bold text-lg md:text-xl  ">
                  Weight:{' '}
                  <span className="font-semibold text-gray-800 dark:text-gray-400 text-lg">
                    {breedDescr.weight.metric} kg.
                  </span>
                </p>
                <p className="font-bold text-lg md:text-xl  ">
                  Life span:{' '}
                  <span className="font-semibold text-gray-800 dark:text-gray-400 text-lg">
                    {breedDescr.life_span} years
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BreedDetails;
