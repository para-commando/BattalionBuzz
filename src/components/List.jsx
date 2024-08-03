import React, { useRef } from 'react';
import UserInfo from './UserInfo';
import ChatList from './ChatList';
import { useSelector } from 'react-redux';

function List() {
  const stylesOfList = useRef('');

  const isLandingPageVisible = useSelector((state) => {
    return state.toggleViewReducersExport.valueIsLandingPageVisible;
  });
  
  return (
    <>
      {isLandingPageVisible && (
        <div
          ref={stylesOfList}
          className='min-w-[70%] pr-3 '
        >
          <UserInfo />
          <ChatList />
        </div>
      )}
    </>
  );
}

export default List;
