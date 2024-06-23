import React, { useState, useRef,useEffect } from 'react';
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

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleEmojiClick = (params) => {
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
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target)
    ) {
      setShowEmojiPicker(false);
    }
  };
  return (
    <div className='border-r-2 w-[670px] px-7 relative flex flex-col items-center'>
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
      <div className='UserChatDetailsInChatsWindow relative w-full'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad vitae illo
        eveniet ratione tempora, pariatur debitis. Enim doloribus eum, nihil
        dolor nulla veritatis. Nobis, error ipsam sint numquam earum ea iure cum
        ut quisquam accusantium odit ab unde repudiandae dignissimos officia
        placeat dolorum odio tempore. Deserunt animi ullam omnis fuga temporibus
        totam aut atque, delectus itaque accusamus porro ea dolorum. Ratione
        blanditiis placeat ducimus eligendi fugiat odio molestias ut, dolore
        natus quibusdam nisi fugit nulla maiores provident necessitatibus
        facilis ex commodi vero nemo tenetur recusandae. Odit dolorem dolorum,
        laudantium eius, sint exercitationem veniam, eaque unde fugit placeat
        voluptates. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Eveniet tenetur, iure, sapiente deserunt nisi exercitationem incidunt
        itaque minima eius est autem debitis nihil optio quaerat, id suscipit
        porro ex qui quos ad odit doloribus? Eius at consequatur voluptates
        labore iure nihil? Aperiam suscipit quis accusantium sint aliquam dicta
        deleniti delectus a sed architecto. Sit, mollitia sed eius laboriosam
        earum culpa quam praesentium harum est neque omnis tenetur dolorem
        exercitationem magni ipsa veniam modi explicabo odio qui? Deserunt
        molestias excepturi qui, nulla reiciendis rem accusamus explicabo
        voluptas vero non provident, fuga odio nihil quis facere consectetur
        quia molestiae voluptatem vel!
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
          <div className='options flex items-center' onClick={toggleOptions}>
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
        <div
          title='emojis'
          className='emojisOption absolute bottom-16 right-0'
          onClick={() => {
            setShowEmojiPicker(!showEmojiPicker);
           
          }}
        >
          {!showEmojiPicker && (
            <img
              src={emojisIcon}
              className='w-9 h-9 mx-1 cursor-pointer'
              alt='emojis'
            />
          )}
          <div ref={emojiPickerRef}>
            {showEmojiPicker && (
              <EmojiPicker
                height={400}
                width={400}
                onEmojiClick={handleEmojiClick}
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
