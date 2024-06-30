import React from 'react';
import UserInfo from './UserInfo';
import ChatList from './ChatList';
import { isUserNew, isUserValidated } from '../redux/reducers/userAuth';
import { useSelector, useDispatch } from 'react-redux';
function List() {
  const dispatch = useDispatch();

  return (
    <div className='w-[420px] border-r-2 pr-5 '>
      <UserInfo />
      <ChatList />
      <div
        className='logoutButton bg-blue-700 px-2 py-3 rounded-full text-center cursor-pointer'
        onClick={() => {
          dispatch(isUserValidated(false));
          dispatch(isUserNew(false));
        }}
      >
        Log out
      </div>
    </div>
  );
}

export default List;
