import React from 'react';
import editIcon from '../assets/edit.png';
import menuIcon from '../assets/menu.png';
import videoCameraIcon from '../assets/videoCamera.png';
import avatarIcon from '../assets/avatarIcon.png';

function UserInfo() {
  return (
    <div className='flex items-center gap-14 mb-7'>
      <div className='user flex items-center'>
        <img
          src={avatarIcon}
          className='w-14 h-14 mx-2  rounded-full cursor-pointer'
          alt=''
        />
        <h2 className='font-bold text-xl'>Major Vihaan</h2>
      </div>
      <div className='icons flex'>
        <img src={editIcon} className='w-8 h-8 mx-2 cursor-pointer ' alt='' />
        <img src={menuIcon} className='w-8 h-8 mx-2 cursor-pointer ' alt='' />
        <img
          src={videoCameraIcon}
          className='w-8 h-8 mx-2 cursor-pointer '
          alt=''
        />
      </div>
    </div>
  );
}

export default UserInfo;
