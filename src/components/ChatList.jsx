import React, { useEffect, useState } from 'react';
import searchIcon from '../assets/search.png';
import addUsersIcon from '../assets/addUsers.png';
import disableAddUsersIcon from '../assets/remove.png';
import AddUser from './AddUser';
import {
  isDetailsVisible,
  isChatsVisible,
  currentOpenedUser,
} from '../redux/reducers/toggleViewReducers';
import { useSelector, useDispatch } from 'react-redux';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
function ChatList() {
  const [addUsersButtonDisplay, setAddUsersButtonDisplay] = useState(false);
  const [chats, setChats] = useState([]);
  const userChat = useSelector((state) => {
    return state.userAuthReducerExport.valueUserData.chats;
  });
  const user = useSelector(
    (state) => state.userAuthReducerExport.valueUserData
  );
  const isUserChatsVisible = useSelector((state) => {
    return state.toggleViewReducersExport.valueIsChatsVisible;
  });
  useEffect(() => {
    const latestChats = onSnapshot(
      doc(db, 'chatMessages', user.id),
      async (res) => {
        // obtained the chat data
        const items = res.data().chats;
        const promises = items.map(async (item) => {
          console.log('🚀 ~ promises ~ item:', item);
          const userDocRef = doc(db, 'users', item.receiverId);
          const userDocSnap = await getDoc(userDocRef);
          const user = userDocSnap.data();
          return { ...items, user };
        });
        const chatData = await Promise.all(promises);
        console.log('🚀 ~ latestChats ~ chatData:', chatData);
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      latestChats();
    };
  }, [userChat,user]);
  const dispatch = useDispatch();
  return (
    <>
      <div className='chatList h-[588px]  w-full px-2 overflow-y-auto'>
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
              className='w-[100%] h-8 rounded-full pl-10 text-black'
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
          {chats &&
            chats.map((currUser) => {
              return (
                <div
                  className='Users flex items-center border-2 relative py-1 rounded-full mb-2 cursor-pointer'
                  onClick={() => {
                    dispatch(isChatsVisible(!isUserChatsVisible));
                    dispatch(isDetailsVisible(false));
                    dispatch(currentOpenedUser(currUser.user));
                  }}
                >
                  <img
                    src={currUser.user.imgUrl}
                    className='w-10 h-10 mx-2 rounded-full cursor-pointer object-cover object-top'
                    alt=''
                  />
                  <span className='text-lg ml-4'>{currUser.user.callSign}</span>
                  {currUser.hasSentMessage ? (
                    <span className='bg-green-500 rounded-full w-4 h-4 ml-10 absolute right-6'></span>
                  ) : (
                    ''
                  )}
                </div>
              );
            })}
        </div>
        {addUsersButtonDisplay && <AddUser />}
      </div>
    </>
  );
}

export default ChatList;
