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

function Chats() {
  const [showOptions, setShowOptions] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [userInputText, setUserInputText] = useState('');
  const emojiPickerRef = useRef(null);
  const showLatestMessage = useRef(null);
  useEffect(() => {
    showLatestMessage?.current?.scrollIntoView({behavior:"smooth"})  

  }, []);

  const messages = [
    {
      message: 'Commander, report your status.',
      isUserMessage: false,
      userName: 'Major Videep',
      time: '10:30 PM, yesterday',
    },
    {
      message:
        'Sir, we are holding our position and awaiting further instructions.',
      isUserMessage: true,
      userName: 'Major Vihaan',
      time: '10:31 PM, yesterday',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/IAF_Tejas_full_size_%2832941198511%29.jpg/330px-IAF_Tejas_full_size_%2832941198511%29.jpg',
    },
    {
      message: 'Keep the perimeter secure. Reinforcements are on the way.',
      isUserMessage: false,
      userName: 'Major Videep',
      time: '10:32 PM, yesterday',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/RB005_-_Dassault_Rafale_-_Indian_Air_Force_-_50976863128.jpg/330px-RB005_-_Dassault_Rafale_-_Indian_Air_Force_-_50976863128.jpg',
    },
    {
      message: 'Roger that, Sir. We have eyes on the target.',
      isUserMessage: true,
      userName: 'Major Vihaan',
      time: '10:33 PM, yesterday',
    },
    {
      message: 'Maintain stealth and proceed with caution. Over and out.',
      isUserMessage: false,
      userName: 'Major Videep',
      time: '10:34 PM, yesterday',
    },
    {
      message: 'Understood, Sir. Awaiting your signal.',
      isUserMessage: true,
      userName: 'Major Vihaan',
      time: '10:35 PM, yesterday',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/IAF_LCH_in_flight.jpg/330px-IAF_LCH_in_flight.jpg',
    },
  ];

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
    if (!emojiPickerRef.current.contains(event.target)) {
      setShowEmojiPicker(false);
    }
  };
  return (
    <div className='border-r-2 min-w-[600px] max-w-auto px-2 relative flex flex-col items-center'>
      <div className='flex w-full justify-between border-b-2 pb-4 relative'>
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
                    className={'w-17 h-17 mx-2 cursor-pointer rounded-lg mt-1'}
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
  );
}

export default Chats;
