import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useGetBreedListQuery, useGetBreedByIdQuery } from '../redux/cats';

import Carousel from '../components/Carousel';
import { BackLink } from '../components/BackLink';
import { LoaderSpinner } from '../components/LoaderSpinner';

const BreedDetails = () => {
  const location = useLocation();
  const { id } = useParams();
  const [breedDescr, setBreedDescr] = useState(null);
  const {
    data: breedList = [],
    isLoading: isLoadingBreedList,
    isSuccess: isSuccessBreedList,
    isError: isErrorBreedList,
  } = useGetBreedListQuery();

  const {
    data: breeds,
    isLoading: isLoadingBreeds,
    isError: isErrorBreeds,
  } = useGetBreedByIdQuery(id, { skip: !id });

  useEffect(() => {
    if (isSuccessBreedList && id) {
      const result = breedList.find((it) => it.id === id);
      setBreedDescr(result);
    }
  }, [isSuccessBreedList, id, breedList]);

  return (
    <>
      {isErrorBreeds && isErrorBreedList && <p>Something went wrong</p>}
      {isLoadingBreeds && isLoadingBreedList && (
        <div className="mt-[100px]">
          <LoaderSpinner />
        </div>
      )}

      {breedDescr && (
        <div className="flex flex-col gap-y-4">
          <BackLink to={location.state?.from ?? '/breeds'}>Go Back</BackLink>

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
