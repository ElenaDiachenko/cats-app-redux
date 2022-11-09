import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { requests } from '../servises/API';

const BreedDetails = () => {
  const { id } = useParams();
  const [breed, setBreed] = useState({});

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
  return <div>BreedDetails</div>;
};

export default BreedDetails;
