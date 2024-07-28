import React, { useState, useRef, useEffect } from 'react';
import informationIcon from '../assets/information.png';
import videoCameraIcon from '../assets/videoCamera.png';
import avatarIcon from '../assets/avatarIcon.png';
import phoneCallIcon from '../assets/phoneCall.png';
import sendIntelIcon from '../assets/fighterJet.png';
import emojisIcon from '../assets/fires.png';
import menuIcon from '../assets/menu.png';
import documentsIcon from '../assets/docs.png';
import CameraIcon from '../assets/camera.png';
import mediaIcon from '../assets/media.png';
import microphoneIcon from '../assets/microphone.png';
import EmojiPicker from 'emoji-picker-react';
import {
  isDetailsVisible,
  isChatsVisible,
} from '../redux/reducers/toggleViewReducers';
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../lib/firebase';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
function Chats() {
  const [showOptions, setShowOptions] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [userInputText, setUserInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const emojiPickerRef = useRef(null);
  const showLatestMessage = useRef(null);
  const dispatch = useDispatch();
  const isUserDetailsVisible = useSelector((state) => {
    return state.toggleViewReducersExport.valueIsDetailsVisible;
  });
  const currentOpenedUser = useSelector((state) => {
    return state.toggleViewReducersExport.currentOpenedUser;
  });
  const userData = useSelector(
    (state) => state.userAuthReducerExport.valueUserData
  );
  useEffect(() => {
    showLatestMessage?.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      let userChatId = { chatId: '' };

      if (currentOpenedUser.id) {
        console.log("🚀 ~ fetchData ~ currentOpenedUser:", currentOpenedUser)
        const chatMessages = collection(db, 'chatMessages');
        const docRef = doc(chatMessages, userData.id);
        const docSnap = await getDoc(docRef);

        const chatsArray = docSnap.data() ? docSnap.data().chats : [];
        const matchedChat = chatsArray.find(
          (chat) => chat.receiverId === currentOpenedUser.id
        );

        if (matchedChat) {
          userChatId = matchedChat;
        }
      }

      const unsubscribe = onSnapshot(
        doc(db, 'chats', userChatId.chatId),
        (res) => {
          const items = res.data().messages;
          setMessages(items);
        }
      );

      return unsubscribe; // Returning the unsubscribe function for cleanup
    };

    const unsubscribePromise = fetchData();

    return () => {
      // Clean up the subscription
      // to make the firebase listen to the real time chats even after opening the chat window, add the chat id in the dependency list of this useEffect hook
      unsubscribePromise.then((unsubscribe) => {
        if (unsubscribe) unsubscribe();
      });
    };
  }, [currentOpenedUser, userData.id]);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleEmojiClick = (params) => {
    console.log('🚀 ~ handleEmojiClick ~ params:', params);
    setUserInputText(userInputText + params.emoji);

    return;
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (event) => {
    console.log('🚀 ~ handleClickOutside ~ event:', event);
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target)
    ) {
      setShowEmojiPicker(false);
    }
  };
  const isUserChatsVisible = useSelector((state) => {
    return state.toggleViewReducersExport.valueIsChatsVisible;
  });

  return (
    <>
      {isUserChatsVisible && (
        <div
          className={
            isUserDetailsVisible
              ? 'border-r-2 border-l-2 min-w-[50%] max-w-[60%] px-2 relative flex flex-col items-center'
              : 'border-r-2 border-l-2 min-w-[70%] max-w-[70%] px-2 relative flex flex-col items-center'
          }
        >
          <div className='flex w-full justify-between border-b-2 pb-4 relative'>
            <div className='UserInfoInChatsWindow flex items-center gap-3'>
              <img
                src={currentOpenedUser.imgUrl}
                className='w-14 h-14 mx-2  rounded-full cursor-pointer object-cover object-top'
                alt=''
              />
              <div className='name flex flex-col justify-start items-start'>
                <h2 className='font-bold text-xl'>{currentOpenedUser.callSign}</h2>
                <p>{currentOpenedUser.regiment}</p>
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
                onClick={() => {
                  dispatch(isDetailsVisible(!isUserDetailsVisible));
                  setShowOptions(!showOptions);
                }}
              />
              <img
                src={videoCameraIcon}
                className='w-7 h-7 mx-2 cursor-pointer '
                alt=''
              />
            </div>
          </div>
          <div className='UserChatDetailsInChatsWindow relative w-full flex flex-col gap-2 overflow-y-auto   rounded-xl h-[525px] mt-2'>
            {messages.map((message) => {
              return (
                <div
                  className={
                    message.isUserMessage
                      ? 'flex flex-col self-end p-2 w-[70%] '
                      : 'flex flex-col self-start p-2  w-[70%]'
                  }
                >
                  <img
                    title='user profile'
                    src={avatarIcon}
                    className={
                      message.isUserMessage
                        ? 'hidden'
                        : 'w-7 h-7 mx-2 cursor-pointer'
                    }
                    alt='user profile'
                  />
                  <div className='texts flex flex-col justify-start'>
                    {message?.message && (
                      <p
                        className={
                          message.isUserMessage
                            ? 'bg-green-950 text-white rounded-3xl p-2'
                            : 'bg-green-800 text-whitle rounded-3xl p-2'
                        }
                      >
                        {message.message}
                      </p>
                    )}
                    {message?.image && (
                      <img
                        title='Image in chats'
                        src={message.image}
                        className={
                          'w-17 h-17 mx-2 cursor-pointer rounded-lg mt-1'
                        }
                        alt='image in chats'
                      />
                    )}
                    <span className='text-white text-[12px] ml-3'>
                      {message.time}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={showLatestMessage}></div>
          </div>
          <div className='UserInputInChatsWindow flex items-center bg-green-950 rounded-full px-2 h-14  box-border w-[98%] absolute bottom-2  '>
            <input
              type='text'
              value={userInputText}
              onChange={(e) => setUserInputText(e.target.value)}
              className='w-[70%] rounded-full pl-4 text-black h-9 text-lg'
              placeholder='Your Intel goes here...'
            />
            <div title='More' className='MoreButton invert'>
              <img
                src={menuIcon}
                className='w-9 h-9 mx-2 cursor-pointer'
                alt='More'
                onClick={toggleOptions}
              />
            </div>
            {showOptions && (
              <div className='options flex items-center'>
                <div title='microphone' className='Microphone invert'>
                  <img
                    src={microphoneIcon}
                    className='w-7 h-7 mx-2 cursor-pointer'
                    alt='microphone'
                  />
                </div>
                <div title='Documents' className='DocumentOption invert'>
                  <img
                    src={documentsIcon}
                    className='w-7 h-7 mx-1 cursor-pointer'
                    alt='Documents'
                  />
                </div>
                <div title='Media' className='Media invert'>
                  <img
                    src={mediaIcon}
                    className='w-7 h-7 mx-2 cursor-pointer'
                    alt='Media'
                  />
                </div>
              </div>
            )}
            <div ref={emojiPickerRef} title='emojis' className='emojisOption'>
              <img
                src={emojisIcon}
                className='w-9 h-9 mx-1 cursor-pointer'
                alt='emojis'
                onClick={() => {
                  setShowEmojiPicker(!showEmojiPicker);
                }}
              />

              <div className=' absolute bottom-16 right-0'>
                {showEmojiPicker && (
                  <EmojiPicker
                    height={400}
                    width={400}
                    onEmojiClick={handleEmojiClick}
                    // onEmojiSelect={handleEmojiClick}
                  />
                )}
              </div>
            </div>

            <div title='Camera' className='Camera invert'>
              <img
                src={CameraIcon}
                className='w-7 h-7 mx-2 cursor-pointer'
                alt='Camera'
              />
            </div>
            <div title='Send' className='SendButton'>
              <img
                src={sendIntelIcon}
                className='w-9 h-9 mx-2 cursor-pointer'
                alt='Send'
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Chats;
