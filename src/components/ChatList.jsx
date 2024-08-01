import React, { useEffect, useState } from 'react';
import searchIcon from '../assets/search.png';
import addUsersIcon from '../assets/addUsers.png';
import disableAddUsersIcon from '../assets/remove.png';
import AddUser from './AddUser';
import {
  isDetailsVisible,
  isChatsVisible,
  currentOpenedUser,
  isLandingPageVisible,
} from '../redux/reducers/toggleViewReducers';
import { useSelector, useDispatch } from 'react-redux';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
function ChatList() {
  const [addUsersButtonDisplay, setAddUsersButtonDisplay] = useState(false);
  const [chats, setChats] = useState([]);
  const [filteredUserChats, setFilteredUserChats] = useState([]);

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
        console.log('🚀 ~ items:', items);
        const promises = items.map(async (item) => {
          console.log('🚀 ~ promises ~ item:', item);
          const userDocRef = doc(db, 'users', item.receiverId);
          const userDocSnap = await getDoc(userDocRef);
          const user = userDocSnap.data();
          user.hasSentMessage = item.hasSentMessage;
          return { ...items, user };
        });
        let chatData = await Promise.all(promises);
        console.log('🚀 ~ latestChats ~ chatData:', chatData);
        chatData = chatData.sort((a, b) => b.updatedAt - a.updatedAt);
        setChats(chatData);
        setFilteredUserChats(chatData);
      }
    );

    return () => {
      latestChats();
    };
  }, [userChat, user]);

  const dispatch = useDispatch();
  const handleSearch = async (e) => {
    console.log('🚀 ~ handleSearch ~ e:', e.target.value);
    try {
      console.log(chats);
      const filteredChats = chats.filter((chat) => {
        return chat.user.callSign
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setFilteredUserChats(filteredChats);
    } catch (error) {
      console.log('🚀 ~ handleSearch ~ error:', error);
    }
  };
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
              onChange={(e) => handleSearch(e)}
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
          {filteredUserChats &&
            filteredUserChats.map((currUser) => {
              console.log('🚀 ~ ChatList ~ currUser:', currUser);
              console.log(
                '🚀 ~ ChatList ~ currUser.hasSentMessage:',
                currUser.hasSentMessage
              );
              return (
                <div
                  className='Users flex items-center border-2 relative py-1 rounded-full mb-2 cursor-pointer'
                  onClick={() => {
                    dispatch(isChatsVisible(true));
                    dispatch(isLandingPageVisible(false));
                    dispatch(currentOpenedUser(currUser.user));
                  }}
                >
                  <img
                    src={currUser.user.imgUrl}
                    className='w-10 h-10 mx-2 rounded-full cursor-pointer object-cover object-top'
                    alt=''
                  />
                  <span className='text-lg ml-4'>{currUser.user.callSign}</span>
                  {currUser.user.hasSentMessage ? (
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
