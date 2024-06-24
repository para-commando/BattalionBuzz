import React from 'react'
import UserInfo from './UserInfo'
import ChatList from './ChatList'
function List() {
  return (
    <div className='border-r-2 pr-3'>
     <UserInfo />
     <ChatList />
    </div>
  )
}

export default List
