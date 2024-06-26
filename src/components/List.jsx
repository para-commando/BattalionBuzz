import React from 'react';
import UserInfo from './UserInfo';
import ChatList from './ChatList';
function List() {
  return (
    <div className='w-[420px] border-r-2 pr-5 '>
      <UserInfo />
      <ChatList />
      <div className='logoutButton bg-blue-700 px-2 py-3 rounded-full text-center'>
        Log out
      </div>
    </div>
  );
}

export default List;
