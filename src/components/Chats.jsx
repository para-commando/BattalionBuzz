import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import informationIcon from '../assets/information.png';
import videoCameraIcon from '../assets/videoCamera.png';
import phoneCallIcon from '../assets/phoneCall.png';
import sendIntelIcon from '../assets/fighterJet.png';
import emojisIcon from '../assets/fires.png';
import menuIcon from '../assets/menu.png';
import documentsIcon from '../assets/docs.png';
import CameraIcon from '../assets/camera.png';
import mediaIcon from '../assets/media.png';
import microphoneIcon from '../assets/microphone.png';
import backButton from '../assets/back-button.png';
import closeButton from '../assets/close.png';
import EmojiPicker from 'emoji-picker-react';
import {
  isDetailsVisible,
  isChatsVisible,
  isLandingPageVisible,
} from '../redux/reducers/toggleViewReducers';
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../lib/firebase';
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { uploadData } from '../lib/upload.js';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    border: 'none',
    borderRadius: '8px',
    width: 'auto',
    height: 'auto',
    maxWidth: '80vw',
    maxHeight: '90vh',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    zIndex: 1000, // Add a high z-index value
  },
};

function formatChatTime(date) {
  const currentDate = new Date();
  const options = { hour: '2-digit', minute: '2-digit', hour12: false };
  // const options = { hour: 'numeric', minute: 'numeric', hour12: true };

  // Check if the date is today
  const isToday = date.toDateString() === currentDate.toDateString();

  // Check if the date is yesterday
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  // Format the time
  const formattedTime = date.toLocaleString('en-US', options);

  if (isToday) {
    return formattedTime;
  } else if (isYesterday) {
    return `${formattedTime}, yesterday`;
  } else {
    // If the date is not today or yesterday, include the full date
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    return `${formattedTime}, ${formattedDate}`;
  }
}
function Chats() {
  const [showOptions, setShowOptions] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [userInputText, setUserInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [openedChatId, setOpenedChatId] = useState('second');
  const [imgToSend, setImgToSend] = useState({
    file: '',
    url: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isInvert, setIsInvert] = useState(false);
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
    showLatestMessage?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  useEffect(() => {
    const fetchData = async () => {
      let userChatId = { chatId: '' };

      if (currentOpenedUser.id) {
        console.log('🚀 ~ fetchData ~ currentOpenedUser:', currentOpenedUser);
        const chatMessages = collection(db, 'chatMessages');
        const docRef = doc(chatMessages, userData.id);
        const docSnap = await getDoc(docRef);

        const chatsArray = docSnap.data() ? docSnap.data().chats : [];
        const matchedChat = chatsArray.find(
          (chat) => chat.receiverId === currentOpenedUser.id
        );
        await updateDoc(docRef, {
          chats: arrayRemove(matchedChat),
        });
        matchedChat.hasSentMessage = false;
        updateDoc(docRef, {
          chats: arrayUnion(matchedChat),
        });
        if (matchedChat) {
          userChatId = matchedChat;
          setOpenedChatId(userChatId.chatId);
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

  const handleSendImage = async (e) => {
    console.log(
      '🚀 ~ handleSendImage ~ e:32rknfkefneor',
      e.target.files['0'].size
    );
    if (e.target.files['0'].size > 10000000) {
      alert('File size should be less than 10MB');
      return;
    }
    setImgToSend({
      file: e.target.files['0'],
      url: URL.createObjectURL(e.target.files['0']),
    });
  };
  const handleSendMessage = async () => {
    if (!userInputText && !imgToSend.file) {
      alert('Please enter a message or select an image to send');
      return;
    }
    setIsSending(true);
    const interval = setInterval(() => {
      setIsInvert((prev) => !prev);
    }, 250);
    let imgUrl = '';
    if (imgToSend.file) {
      imgUrl = await uploadData(imgToSend.file);
      console.log('🚀 ~ handleSendMessage ~ imgUrl:', imgUrl);
    }

    try {
      console.log('🚀 ~ handleSendMessage ~ currentOpenedUser:', openedChatId);
      // adding chat in the current user's chat list
      await updateDoc(doc(db, 'chats', openedChatId), {
        messages: arrayUnion({
          senderId: userData.id,
          receiverId: currentOpenedUser.id,
          image: imgUrl,
          isUserMessage: true,
          username: currentOpenedUser.callSign,
          message: userInputText,
          time: formatChatTime(new Date()),
          updatedAt: Date.now(),
          hasSentMessage: true,
          isSeen: false,
        }),
      });
      const chatMessages = collection(db, 'chatMessages');
      const docRef = doc(chatMessages, currentOpenedUser.id);
      console.log(
        '🚀 ~ handleSendMessage ~ currentOpenedUser.id:',
        currentOpenedUser.id
      );

      const docSnap = await getDoc(docRef);

      const chatsArray = docSnap.data() ? docSnap.data().chats : [];
      console.log('🚀 ~ handleSendMessage ~ chatsArray:', chatsArray);
      console.log('🚀 ~ handleSendMessage ~ docSnap.data() :', docSnap.data());
      const matchedChat = await chatsArray.find(
        (chat) => chat.receiverId === userData.id
      );
      if (matchedChat) {
        console.log('🚀 ~ handleSendMessage ~ matchedChat:', matchedChat);
        debugger
       const aa = await updateDoc(docRef, {
          chats: arrayRemove(matchedChat),
        });
        matchedChat.hasSentMessage = true;
        matchedChat.updatedAt = Date.now();
      const op= await updateDoc(docRef, {
          chats: arrayUnion(matchedChat),
        });
        // adding chat in the receiver's chat list
        updateDoc(doc(db, 'chats', matchedChat.chatId), {
          messages: arrayUnion({
            senderId: userData.id,
            receiverId: currentOpenedUser.id,
            image: imgUrl,
            isUserMessage: false,
            username: currentOpenedUser.callSign,
            message: userInputText,
            time: formatChatTime(new Date()),
            updatedAt: Date.now(),
            hasSentMessage: true,
            isSeen: false,
          }),
        });

        console.log('🚀 ~ handleSendMessage ~ matchedChat:', matchedChat);

        setUserInputText('');
      } else {
        console.log(
          'nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn'
        );
      }
    } catch (error) {
      debugger;
    } finally {
      clearInterval(interval);
      setIsSending(false);
      setIsInvert(false);
      imgUrl = '';
    }
  };

  const handleViewImage = (url) => {
    setSelectedImage(url);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage('');
  };

  return (
    <>
      {isUserChatsVisible && (
        <>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            style={customStyles}
            contentLabel='Image View Modal'
            ariaHideApp={false}
          >
            <div className='relative z-[1001]'>
              <img
                src={closeButton}
                alt='Back'
                className='w-12 h-12 p-2 cursor-pointer'
                onClick={handleCloseModal}
              />
              <Zoom>
                <div className='relative'>
                  <img src={selectedImage} alt='Full View' className='' />
                </div>
              </Zoom>
            </div>
          </Modal>
          <div
            className={
              isUserDetailsVisible
                ? 'border-r-2 border-l-2 min-w-[78%] max-w-[60%] px-2 relative flex flex-col items-center'
                : 'border-r-2 border-l-2 min-w-[95%] max-w-[70%] px-2 relative flex flex-col items-center'
            }
          >
            <div className='flex w-full justify-between border-b-2 pb-4 relative'>
              <div className='UserInfoInChatsWindow flex items-center gap-3'>
                <div
                  className='name flex flex-col justify-start items-start'
                  onClick={() => {
                    dispatch(isChatsVisible(false));
                    dispatch(isDetailsVisible(false));
                    dispatch(isLandingPageVisible(true));
                  }}
                >
                  <img
                    src={backButton}
                    className='w-12 h-12 mx-2  rounded-full cursor-pointer object-cover object-top invert'
                    alt=''
                  />
                </div>
                <img
                  src={currentOpenedUser.imgUrl}
                  className='w-14 h-14 mx-2  rounded-full cursor-pointer object-cover object-top'
                  alt=''
                  onClick={() => handleViewImage(currentOpenedUser.imgUrl)}
                />
                <div className='name flex flex-col justify-start items-start'>
                  <h2 className='font-bold text-xl'>
                    {currentOpenedUser.callSign}
                  </h2>
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
              {messages.map((message, index) => {
                return (
                  <div
                    key={index}
                    className={
                      message.isUserMessage
                        ? 'flex flex-col self-end p-2 max-w-[70%]'
                        : 'flex flex-col self-start p-2 max-w-[70%]'
                    }
                  >
                    <img
                      title='user profile'
                      src={currentOpenedUser.imgUrl}
                      className={
                        message.isUserMessage
                          ? 'hidden'
                          : 'w-7 h-7 mx-2 cursor-pointer rounded-full object-cover object-top'
                      }
                      alt='user profile'
                    />
                    <div className='texts flex flex-col justify-start'>
                      {message?.message && (
                        <p
                          className={
                            message.isUserMessage
                              ? 'bg-green-950 text-white rounded-3xl p-2 break-words'
                              : 'bg-green-800 text-white rounded-3xl p-2 break-words'
                          }
                        >
                          {message.message}
                        </p>
                      )}
                      {message?.image && (
                        <img
                          title='Image in chats'
                          src={message.image}
                          className='max-w-80 max-h-80 mx-2 cursor-pointer rounded-lg mt-1 object-contain bg-gray-300'
                          onClick={() => handleViewImage(message.image)}
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
                <label htmlFor='file'>
                  <img
                    src={CameraIcon}
                    className='w-7 h-7 mx-2 cursor-pointer'
                    alt='Camera'
                  />
                </label>
                <input
                  type='file'
                  id='file'
                  className='hidden'
                  onChange={handleSendImage}
                />
              </div>
              <div
                title='Send'
                className='SendButton'
                onClick={handleSendMessage}
              >
                <img
                  src={sendIntelIcon}
                  className={`w-9 h-9 mx-2 cursor-pointer ${
                    isInvert ? 'invert' : ''
                  }`}
                  alt='Send'
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Chats;
