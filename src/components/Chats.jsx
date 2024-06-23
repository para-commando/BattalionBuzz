import React from 'react';
import informationIcon from '../assets/information.png';
import videoCameraIcon from '../assets/videoCamera.png';
import avatarIcon from '../assets/avatarIcon.png';
import phoneCallIcon from '../assets/phoneCall.png';

function Chats() {
  return (
    <div className='border-r-2 w-[650px] px-5 '>
      <div className='flex justify-between border-b-2 pb-4'>
        <div className='UserInfoInChatsWindow flex items-center gap-3'>
          <img
            src={avatarIcon}
            className='w-14 h-14 mx-2  rounded-full cursor-pointer'
            alt=''
          />
          <div className='name flex flex-col justify-start items-start'>
            <h2 className='font-bold text-xl'>Major Videep</h2>
            <p>Jai Hind</p>
          </div>
        </div>

        <div className='icons flex items-center'>
          <img
            src={phoneCallIcon}
            className='w-7 h-7 mx-2 cursor-pointer '
            alt=''
          />
          <img
            src={informationIcon}
            className='w-7 h-7 mx-2 cursor-pointer '
            alt=''
          />
          <img
            src={videoCameraIcon}
            className='w-7 h-7 mx-2 cursor-pointer '
            alt=''
          />
        </div>
      </div>
      <div className='UserChatDetailsInChatsWindow'></div>
      <div className='UserInputInChatsWindow'></div>
    </div>
  );
}

export default Chats;
