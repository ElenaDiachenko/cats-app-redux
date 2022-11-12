import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { requests } from '../servises/API';
import { MdArrowBackIosNew } from 'react-icons/md';

const BreedDetails = () => {
  const { id } = useParams();
  const [breed, setBreed] = useState({});
  const param = useParams();
  console.log(param);
  useEffect(() => {
    (async () => {
      try {
        const res = await requests.getBreedDetails(id);
        setBreed(res.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [id]);

  console.log(breed);
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex gap-x-4 items-center">
        <MdArrowBackIosNew />
        <p>Breed</p>
        <p>{id}</p>
      </div>
    </div>
  );
};

export default BreedDetails;
