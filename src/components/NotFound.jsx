import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = ({ title }) => {
  return (
    <div className="flex flex-col gap-y-4 items-center mt-[200px] text-lg md:text-2xl ">
      <p>{`${title} not found`}</p>
      <p>
        You can vote on the{' '}
        <Link to="/voting" className="font-bold hover:underline">
          Voting page
        </Link>
      </p>
    </div>
  );
};
