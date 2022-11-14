import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { allBreeds } from '../redux/breed/breedsSlice';
import { useParams, useLocation } from 'react-router-dom';
import { requests } from '../servises/API';
import { MdArrowBackIosNew } from 'react-icons/md';
import Carousel from '../components/Carousel';
const BreedDetails = () => {
  const breedsArray = useSelector(allBreeds);
  const { id } = useParams();
  const [breeds, setBreeds] = useState([]);
  console.log(breedsArray);
  const breedDescr = breedsArray.find((it) => it.id === id);
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
    <div className="flex flex-col gap-y-4">
      <div className="flex gap-x-4 items-center">
        <MdArrowBackIosNew className="font-bold" />
        <p>Breed</p>
      </div>

      <div className="flex justify-between ">
        <Carousel images={breeds} />
        <div></div>
      </div>
    </div>
  );
};

export default BreedDetails;
