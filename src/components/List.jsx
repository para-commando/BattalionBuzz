import React from 'react';
import UserInfo from './UserInfo';
import ChatList from './ChatList';

function List() {

  return (
    <div className='w-[420px] border-r-2 pr-5 '>
      <UserInfo />
      <ChatList />
    </div>
  );
}

export default List;
