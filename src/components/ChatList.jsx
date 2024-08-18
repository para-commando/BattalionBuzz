import React, { useEffect, useRef, useState } from 'react';
import searchIcon from '../assets/search.png';
import addUsersIcon from '../assets/addUsers.png';
import disableAddUsersIcon from '../assets/remove.png';
import AddUser from './AddUser';
import {
  isChatsVisible,
  currentOpenedUser,
  isLandingPageVisible,
  setMessages,
} from '../redux/reducers/toggleViewReducers';
import { setCurrentUsersChatlist } from '../redux/reducers/userAuth';
import { useSelector, useDispatch } from 'react-redux';
import {
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import deleteIcon from '../assets/delete.png';

function ChatList() {
  const [addUsersButtonDisplay, setAddUsersButtonDisplay] = useState(false);
  const [chats, setChats] = useState([]);
  const [filteredUserChats, setFilteredUserChats] = useState([]);

  const user = useSelector(
    (state) => state.userAuthReducerExport.valueUserData
  );

  // handle the click outside event for closing the add user popup
  useEffect(() => {
    document.addEventListener('click', handleClickOutside2, true);
    return () => {
      document.removeEventListener('click', handleClickOutside2, true);
    };
  }, []);

  const addUsersRef = useRef(null);
  const addUserComponentRef = useRef(null);
  const handleClickOutside2 = (event) => {
    if (
      addUserComponentRef.current &&
      !addUserComponentRef.current.contains(event.target)
    ) {
      setAddUsersButtonDisplay(false);
    }
  };
  // handles real time fetching of data from the firestore database using the module onSnapshot for the document specified
  useEffect(() => {
    // prevent the process from going forward until the user id is available

    if (!user || !user.id) {
      console.log('User ID is not available yet.');
      return;
    }

    // listener for any changes on the specified document in the given collection
    const latestChats = onSnapshot(
      doc(db, 'chatMessages', user.id),
      async (res) => {
        // obtained the chat data

        if (res && res.data()) {
          const items = res.data().chats;

          const promises = items.map(async (item) => {
            if (item.receiverId) {
              const userDocRef = doc(db, 'users', item.receiverId);
              const userDocSnap = await getDoc(userDocRef);
              const user = userDocSnap.data();
              user.hasSentMessage = item.hasSentMessage;
              user.updatedAt = item.updatedAt;
              return user;
            }
          });

          let chatData = await Promise.all(promises);

          // sorting logic on displaying the chats, first pref is the most recent text message, else its updated chat
          chatData = chatData.sort((a, b) => {
            if (a.hasSentMessage === b.hasSentMessage) {
              return b.updatedAt - a.updatedAt; // Sort by updatedAt if hasSentMessage is the same
            }
            return b.hasSentMessage - a.hasSentMessage; // Sort by hasSentMessage (true first)
          });

          setChats(chatData);
          // to handle the filter chats func
          setFilteredUserChats(chatData);
        } else {
          console.log('user chats are loading, please wait...');
        }
      }
    );
    // cleanup function which is run whenever user.id is changed
    return () => {
      latestChats();
    };
    // the first conditional in this useEffect is to prevent the process from going forward until the user id is available but we want the function below it to be executed once user.id is available so in dependency array we pass user.id
  }, [user?.id]);

  const dispatch = useDispatch();
  // to search among existing chats
  const handleSearch = async (e) => {
    try {
      
      const filteredChats = chats.filter((chat) => {
        return chat.callSign
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setFilteredUserChats(filteredChats);
    } catch (error) {
      alert('something went wrong, please try again');
    }
  };
  const loggedInUsersChatList = useSelector(
    (state) => state.userAuthReducerExport.currentUsersChatList
  );
  const handleDeleteUser = async (userId) => {
    try {
      const userResponse = confirm(
        'Are you sure you want to delete this user?'
      );

      if (!userResponse) {
        // User clicked "OK" (Yes)
        return;
      }

      // deleting user from the redux reducer

      const newChats = { ...loggedInUsersChatList };
      // deleting the user data from redux store
      for (let key in newChats) {
        if (key === userId) {
          delete newChats[key];
        }
      }

      // updating the user's chat list
      dispatch(setCurrentUsersChatlist(newChats));

      // loading the desired collection
      const chatMessagesCollection = collection(db, 'chatMessages');
      // selecting the document or row in the collection
      const docSelectCondition = doc(chatMessagesCollection, user?.id);

      const docResponse = await getDoc(docSelectCondition);

      if (!docResponse.exists()) {
        console.log(
          `Current logged in User ID ${userId} does not exist in the chatMessages collection.`
        );
        return;
      }

      const userChatList = docResponse.data().chats || [];
      const matchedUserChat = userChatList.find(
        (chat) => chat.receiverId === userId
      );
      const matchedUserChatId = matchedUserChat?.chatId;
      // deleting the object matched
      await updateDoc(docSelectCondition, {
        chats: arrayRemove(matchedUserChat),
      });
      // cleaning the current opened chat details in the redux store
      dispatch(currentOpenedUser(''));
      dispatch(setMessages([]));

      // deleting the chat from the chats collection
      const chatsCollection = collection(db, 'chats');
      // selecting the document or row in the collection
      const chatsDocSelectCondition = doc(chatsCollection, matchedUserChatId);
      // deleting the matched chat id
      deleteDoc(chatsDocSelectCondition);
    } catch (error) {
      alert('something went wrong, please try again');
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
          <span>
            {
              // since default value will be false hence inversion of it is used
              !addUsersButtonDisplay && (
                <img
                  ref={addUsersRef}
                  src={addUsersIcon}
                  className='w-7 h-7 mx-2 cursor-pointer '
                  alt='add users icon'
                  onClick={() => setAddUsersButtonDisplay(true)}
                />
              )
            }
            {addUsersButtonDisplay && (
              <img
                ref={addUsersRef}
                src={disableAddUsersIcon}
                className='w-7 h-7 mx-2 cursor-pointer '
                alt='add users icon'
                onClick={() => setAddUsersButtonDisplay(false)}
              />
            )}
          </span>
        </div>
        <div className='overflow-y-auto max-h-[85%] pb-5'>
          {filteredUserChats &&
            filteredUserChats.map((currUser) => {
              return (
                <div
                  className='Users flex items-center border-2 relative py-1 rounded-full mb-2 cursor-pointer'
                  onClick={() => {
                    dispatch(isChatsVisible(true));
                    dispatch(isLandingPageVisible(false));
                    // setting the value of the reducer to the current opened user
                    dispatch(currentOpenedUser(currUser));
                  }}
                >
                  <img
                    src={currUser.imgUrl}
                    className='w-10 h-10 mx-2 rounded-full cursor-pointer object-cover object-top'
                    alt=''
                  />
                  <span className='text-lg ml-4'>{currUser.callSign}</span>
                  <span className='absolute right-16'>
                    <img
                      title='delete user history'
                      src={deleteIcon}
                      alt=''
                      className={'w-6 h-6 cursor-pointer ml-14'}
                      onClick={(event) => {
                        event.stopPropagation();
                        return handleDeleteUser(currUser.id);
                      }}
                    />
                  </span>

                  {currUser.hasSentMessage ? (
                    <span className='bg-green-500 rounded-full w-4 h-4 ml-10 absolute right-6'></span>
                  ) : (
                    ''
                  )}
                </div>
              );
            })}
        </div>
        {addUsersButtonDisplay && (
          <div ref={addUserComponentRef}>
            <AddUser />
          </div>
        )}
      </div>
    </>
  );
}

export default ChatList;
