import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { requests } from '../servises/API';

import { BackLink } from '../components/BackLink';

const Upload = () => {
  const [userId] = useState(JSON.parse(localStorage.getItem('catsapi_userId')));

  const location = useLocation();

  return (
    <div className="flex flex-col gap-y-4">
      <BackLink to={location.state?.from ?? '/breeds'}>Go Back</BackLink>
    </div>
  );
};

export default Upload;
