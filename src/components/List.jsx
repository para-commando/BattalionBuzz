import React, { useEffect, useRef } from 'react';
import UserInfo from './UserInfo';
import ChatList from './ChatList';
import { useSelector, useDispatch } from 'react-redux';

function List() {
  const stylesOfList = useRef('');

  const isUserDetailsVisible = useSelector((state) => {
    return state.toggleViewReducersExport.valueIsDetailsVisible;
  });
  const isUserChatsVisible = useSelector((state) => {
    return state.toggleViewReducersExport.valueIsChatsVisible;
  });
  return (
    <div
      ref={stylesOfList}
      className={
        isUserChatsVisible ? 'min-w-[25%] pr-3 ' : 'min-w-[70%] pr-3 '
      }
    >
      <UserInfo />
      <ChatList />
    </div>
  );
}

export default List;
