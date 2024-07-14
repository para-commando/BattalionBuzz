import React from 'react';
import editIcon from '../assets/edit.png';
import menuIcon from '../assets/menu.png';
import videoCameraIcon from '../assets/videoCamera.png';
import avatarIcon from '../assets/avatarIcon.png';
import { isUserNew, isUserValidated } from '../redux/reducers/userAuth';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../lib/firebase';

function UserInfo() {
  const user = useSelector((state) => state.userAuthReducerExport.valueUserData);
  console.log("🚀 ~ UserInfo ~ user:", user)
  const dispatch = useDispatch();

  return (
    <div className='flex items-center gap-1 mb-7 w-full'>
      <div className='user flex items-center w-full'>
        <img
          src={user.imgUrl}
          className='w-14 h-14 mx-2  rounded-full cursor-pointer object-cover object-top'
          alt=''
        />
        <h2 className='font-bold text-xl tracking-wider'>{user.callSign+'.'+user.regiment}</h2>
      </div>
      <div
        className='logoutButton bg-blue-700 text-white px-4 py-1 rounded-3xl cursor-pointer'
        onClick={() => {
          dispatch(isUserValidated(false));
          dispatch(isUserNew(false));
          auth.signOut();
        }}
      >
        LogOut
      </div>
    </div>
  );
}

export default UserInfo;
