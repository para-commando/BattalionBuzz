import React, { useState } from 'react';
import avatarIcon from '../assets/avatarIcon.png';
import { collection, endAt, getDocs, orderBy, query, serverTimestamp, setDoc, startAt, where } from 'firebase/firestore';
import { db } from '../lib/firebase';

function AddUser() {

  const [user, setUser] = useState([]);
 
  const addUser = async( ) => {
  try {
      
      const chatMessages = collection(db, 'chatMessages');
      const chats = collection(db, 'chats');
      const newChatRef = doc(chats);
      console.log("🚀 ~ addUser ~ newChatRef:", newChatRef.id)
      await setDoc(newChatRef,{
        createdAt: serverTimestamp(),
        messages: []
      })

  } catch (error) {
    
  }
  }
  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      
      const formData = new FormData(e.target);
      const username = formData.get('callSignAddUser');
      const userRef = collection(db, 'users');
      const queryMake = query(
        userRef,
        orderBy('callSign'),
        startAt(username),
        endAt(username + '\uf8ff')
      );
  
      const querySnapshot = await getDocs(queryMake);
  
      // Use a Set to ensure unique users
      const uniqueUsers = new Set(); // Convert existing users to string to use in Set
  
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        uniqueUsers.add(JSON.stringify(docData)); // Add new user data to the Set as string
      });
  
      // Convert Set back to array of objects
      const uniqueUsersArray = Array.from(uniqueUsers).map(userStr => JSON.parse(userStr));
  
      setUser(uniqueUsersArray);
    } catch (error) {
      console.log('🚀 ~ handleSearch ~ error:', error);
    }
  };

  return (
    <div className='addUser absolute top-[140px] left-[340px] bg-black rounded-3xl p-7 z-10 bg-opacity-[0.8]'>
      <form onSubmit={handleSearch} className='flex gap-1 justify-center'>
        <input
          type='text'
          placeholder='callSign...'
          className='rounded-2xl pl-2 text-black'
          name='callSignAddUser'
        />
        <button className='text-[12px] bg-green-900 rounded-2xl px-2'>
          Search
        </button>
      </form>
      <div className='displayUsers p-3 h-24 overflow-y-auto'>
      {user &&
  user.map((e) => {
    // Truncate the callSign if it exceeds the maximum length
    const truncatedCallSign = e.callSign.length > 15
      ? e.callSign.slice(0, 15) + '...' 
      : e.callSign;

    return (
      <div key={e.id} className='user p-2 details flex gap-1 items-center justify-center'>
        <img
          src={e.imgUrl}
          className='w-7 h-7 mx-2 rounded-full cursor-pointer'
          alt=''
        />
        <span className='w-15'>{truncatedCallSign}</span>
        <button className='bg-green-400 rounded-full text-[12px] p-1 ml-4' onClick={addUser}>
          Add User
        </button>
      </div>
    );
  })}
      </div>
    </div>
  );
}

export default AddUser;
