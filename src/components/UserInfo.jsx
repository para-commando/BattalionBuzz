import React from 'react';
import { isUserNew, isUserValidated } from '../redux/reducers/userAuth';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../lib/firebase';

function UserInfo() {
  // redux state which stores the current logged in user's details
  const user = useSelector(
    (state) => state.userAuthReducerExport.valueUserData
  );
  console.log('🚀 ~ UserInfo ~ user:', user);
  const dispatch = useDispatch();

  // displaying logged in user's information post successful authentication
  return (
    <div className='flex items-center gap-1 mb-7 w-full'>
      <div className='user flex items-center w-full'>
        <img
          src={user.imgUrl}
          className='w-14 h-14 mx-2  rounded-full cursor-pointer object-cover object-top'
          alt=''
        />
        <div className=''>
          <h2 className='font-bold text-xl tracking-wider'>{user.callSign}</h2>
          <p className='tracking-wider'>{user.regiment}</p>
        </div>
      </div>
      <div
        className='logoutButton bg-blue-700 text-white px-4 py-1 rounded-3xl cursor-pointer'
        onClick={() => {
          dispatch(isUserValidated(false));
          dispatch(isUserNew(false));
          // firebase module to handle user logout
          auth.signOut();
        }}
      >
        LogOut
      </div>
    </div>
  );
}

export default UserInfo;
