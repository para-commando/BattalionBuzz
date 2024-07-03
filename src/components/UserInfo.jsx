import React from 'react';
import editIcon from '../assets/edit.png';
import menuIcon from '../assets/menu.png';
import videoCameraIcon from '../assets/videoCamera.png';
import avatarIcon from '../assets/avatarIcon.png';
import { isUserNew, isUserValidated } from '../redux/reducers/userAuth';
import { useSelector, useDispatch } from 'react-redux';

function UserInfo() {
  const dispatch = useDispatch();

  return (
    <div className='flex items-center gap-1 mb-7 w-full'>
      <div className='user flex items-center w-full'>
        <img
          src={avatarIcon}
          className='w-14 h-14 mx-2  rounded-full cursor-pointer'
          alt=''
        />
        <h2 className='font-bold text-xl'>Major Vihaan</h2>
      </div>
      <div
        className='logoutButton bg-blue-700 text-white px-4 py-1 rounded-3xl cursor-pointer'
        onClick={() => {
          dispatch(isUserValidated(false));
          dispatch(isUserNew(false));
        }}
      >
        LogOut
      </div>
    </div>
  );
}

export default UserInfo;
