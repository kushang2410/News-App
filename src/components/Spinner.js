import React from 'react';
import loading from '../spinner.gif';

const Spinner = () => {
  return (
    <div className='text-center px-5'>
      <img src={loading} alt="loading" />
    </div>
  );
}

export default Spinner;
