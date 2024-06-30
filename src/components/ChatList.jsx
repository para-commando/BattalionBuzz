import React, { useState } from 'react';
import searchIcon from '../assets/search.png';
import addUsersIcon from '../assets/addUsers.png';
import disableAddUsersIcon from '../assets/remove.png';
import avatarIcon from '../assets/avatarIcon.png';

function ChatList() {
  const [addUsersButtonDisplay, setAddUsersButtonDisplay] = useState(false);
  const users = [
    { name: 'Major Videep', hasSentMessage: true, profileImg: avatarIcon },
    { name: 'Major Videep', hasSentMessage: true, profileImg: avatarIcon },
    { name: 'Major Videep', hasSentMessage: true, profileImg: avatarIcon },
    { name: 'Major Videep', hasSentMessage: true, profileImg: avatarIcon },
    { name: 'Major Videep', hasSentMessage: true, profileImg: avatarIcon },
    { name: 'Major Videep11', hasSentMessage: true, profileImg: avatarIcon },
    { name: 'Major Videep', hasSentMessage: true, profileImg: avatarIcon },
    { name: 'Major Videep', hasSentMessage: true, profileImg: avatarIcon },
    { name: 'Major Videep', hasSentMessage: true, profileImg: avatarIcon },
    { name: 'Major Videep', hasSentMessage: true, profileImg: avatarIcon },
    { name: 'Major Videep11', hasSentMessage: true, profileImg: avatarIcon },
  ];
  return (
    <>
      <div className='chatList h-[532px]  w-full px-2 overflow-y-auto'>
        <div className='search flex items-center mb-5 gap-2 w-full'>
          <div className='searchBar flex relative w-full'>
            <img
              src={searchIcon}
              className='w-6 h-6 mx-2 mt-1 cursor-pointer absolute -left-1 bg-white rounded-[6px]'
              alt='Search Icon'
            />
            <input
              type='text'
              placeholder='Search...'
              className='w-[297px] h-8 rounded-full pl-10 text-black'
            />
          </div>
          <img
            src={addUsersButtonDisplay ? disableAddUsersIcon : addUsersIcon}
            className='w-7 h-7 mx-2 cursor-pointer '
            alt='add users icon'
            onClick={() => setAddUsersButtonDisplay(!addUsersButtonDisplay)}
          />
        </div>
        <div className='overflow-y-auto max-h-[85%] pb-5'>
          {users.map((currUser) => {
            return (
              <div className='Users flex items-center border-2 relative py-1 rounded-full mb-2'>
                <img
                  src={currUser.profileImg}
                  className='w-10 h-10 mx-2 rounded-full cursor-pointer'
                  alt=''
                />
                <span className='text-lg ml-4'>{currUser.name}</span>
                {currUser.hasSentMessage ? (
                  <span className='bg-green-500 rounded-full w-4 h-4 ml-10 absolute right-6'></span>
                ) : (
                  ''
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ChatList;
