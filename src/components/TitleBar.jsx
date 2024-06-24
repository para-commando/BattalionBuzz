import React from 'react';
import BattalionBuzzLogo from '../assets/BattalionBuzzLogo.png';
function TitleBar() {
  return (
    <div className='flex justify-center flex-col items-center'>
      <div className='flex items-center pt-3'>
        <h1 className='text-[23px] font-bold text-white pt-4'>
          BattalionBuzz
        </h1>
        <img src={BattalionBuzzLogo} alt='' className='w-14 h-14 mx-2  ' />
      </div>
      <h3 className='text-white text-[12px]'>
        Real-time Connections, Real-world Impact
      </h3>
    </div>
  );
}

export default TitleBar;
