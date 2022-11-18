import { Link } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';

export const BackLink = ({ to, children }) => {
  return (
    <Link to={to} className="font-bold inline-flex gap-x-3">
      <HiArrowLeft size={25} />
      {children}
    </Link>
  );
};
