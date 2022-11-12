import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { requests } from '../servises/API';
import { MdArrowBackIosNew } from 'react-icons/md';

const BreedDetails = () => {
  const { id } = useParams();
  const [breeds, setBreeds] = useState([]);

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
      <div>{/* <img src={breed.url} alt="/" /> */}</div>
    </div>
  );
};

export default BreedDetails;
