import React from 'react';
import avatarIcon from '../assets/avatarIcon.png';

function AddUser() {
  return (
    <div className='addUser absolute top-[140px] left-[340px] bg-blue-400 rounded-3xl p-7 z-10'>
      <form className='flex gap-1 justify-center'>
        <input type='text' placeholder='callSign...' className='rounded-2xl pl-2' name='callSignAddUser' />
        <button className='text-[12px] bg-purple-500 rounded-2xl px-2'>Search</button>
      </form>
      <div className='displayUsers p-3 h-24 overflow-y-auto'>
        <div className='user p-2 details flex gap-1 items-center justify-center'>
            <img
              src={avatarIcon}
              className='w-7 h-7 mx-2 rounded-full cursor-pointer'
              alt=''
            />
            <span>Major Sandeep</span>
            <button className='bg-green-400 rounded-full text-[12px] p-1 ml-4'>Add User</button>
          
        </div>
        <div className='user p-2 details flex gap-1 items-center justify-center'>
            <img
              src={avatarIcon}
              className='w-7 h-7 mx-2 rounded-full cursor-pointer'
              alt=''
            />
            <span>Major Sandeep</span>
            <button className='bg-green-400 rounded-full text-[12px] p-1 ml-4'>Add User</button>
          
        </div>
        <div className='user p-2 details flex gap-1 items-center justify-center'>
            <img
              src={avatarIcon}
              className='w-7 h-7 mx-2 rounded-full cursor-pointer'
              alt=''
            />
            <span>Major Sandeep</span>
            <button className='bg-green-400 rounded-full text-[12px] p-1 ml-4'>Add User</button>
          
        </div>
        <div className='user p-2 details flex gap-1 items-center justify-center'>
            <img
              src={avatarIcon}
              className='w-7 h-7 mx-2 rounded-full cursor-pointer'
              alt=''
            />
            <span>Major Sandeep</span>
            <button className='bg-green-400 rounded-full text-[12px] p-1 ml-4'>Add User</button>
          
        </div>

      </div>
    </div>
  );
}

export default AddUser;
