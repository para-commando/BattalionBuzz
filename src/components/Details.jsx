import React, { useState, useRef } from 'react';
import avatarIcon from '../assets/avatarIcon.png';
import toggleViewIcon from '../assets/unfold.png';
import { useSelector, useDispatch } from 'react-redux';
import documentsIcon from '../assets/docs.png';
import microphoneIcon from '../assets/microphone.png';
import videoIcon from '../assets/video.png';
import showImageInChatIcon from '../assets/eye.png';

function Details() {
  const [toggleImgListDetailsSection, setToggleImgListDetailsSection] =
    useState(false);
  const [toggleVideosListDetailsSection, setToggleVideosListDetailsSection] =
    useState(false);
  const [
    toggleDocumentsListDetailsSection,
    setToggleDocumentsListDetailsSection,
  ] = useState(false);
  const [toggleAudioListDetailsSection, setToggleAudioListDetailsSection] =
    useState(false);
  const [isNotRadioSilenced, setIsNotRadioSilenced] = useState(true);
  const currentOpenedUser = useSelector((state) => {
    return state.toggleViewReducersExport.currentOpenedUser;
  });
  const radioSilenceRef = useRef(null);
  const sharedVideosList = useSelector((state) => {
    return state.userAuthReducerExport.sharedVideos;
  });
  const sharedAudiosList = useSelector((state) => {
    return state.userAuthReducerExport.sharedAudios;
  });
  const sharedImagesList = useSelector((state) => {
    return state.userAuthReducerExport.sharedImages;
  });
  const sharedDocumentsList = useSelector((state) => {
    return state.userAuthReducerExport.sharedDocuments;
  });

  const radioSilenceChat = (params) => {
    if (isNotRadioSilenced) {
      alert('Radio silenced...');
      radioSilenceRef.current.innerText = 'Radio-Silenced';
      radioSilenceRef.current.style.backgroundColor = 'black';
      setIsNotRadioSilenced(false);
      return;
    }
    radioSilenceRef.current.innerText = 'Radio-Silence';
    radioSilenceRef.current.style.backgroundColor = 'rgb(153 27 27 / 1)';
    setIsNotRadioSilenced(true);
    return;
  };
  const isUserDetailsVisible = useSelector((state) => {
    return state.toggleViewReducersExport.valueIsDetailsVisible;
  });
  return (
    <>
      {isUserDetailsVisible && (
        <div className=' min-w-[27%] max-w-[30%] relative'>
          <div className='flex flex-col items-center gap-3  mx-2 border-b-2 justify-center  '>
            <img
              src={currentOpenedUser.imgUrl}
              className='w-24 h-24 mx-2 rounded-full cursor-pointer object-cover object-top'
              alt=''
            />
            <div className='flex flex-col gap-1 justify-center items-center w-full mb-3'>
              <h2 className='font-bold text-xl'>
                {currentOpenedUser.callSign}
              </h2>
              <p className='text-[12px] text-center'>
                {currentOpenedUser.regiment}
              </p>
            </div>
          </div>
          <div className='border-b-2 p-2 mx-2'></div>
          <div className='options pt-3 mx-1 overflow-y-auto h-[470px] w-full'>
            <div className='option bg-green-900 rounded-full px-[9px] py-[15px] mb-3'>
              <div className='title flex justify-between items-center'>
                <span className='text-lg'>Shared Docs</span>
                <img
                  src={toggleViewIcon}
                  className='invert w-6 h-6 mx-2 cursor-pointer'
                  alt=''
                  onClick={(e) =>
                    setToggleDocumentsListDetailsSection(
                      !toggleDocumentsListDetailsSection
                    )
                  }
                />
              </div>
            </div>
            {toggleDocumentsListDetailsSection && (
              <div className=' ml-4 photos overflow-y-auto max-h-[200px]'>
                {sharedDocumentsList.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className='photoItem border-2 border-black flex items-center gap-2 mb-1 w-72 cursor-pointer'
                    >
                      <img src={documentsIcon} className='w-6 h-6  ' alt='' />
                      <span className='text-[12px]'>{item.fileName}</span>
                    </div>
                  );
                })}
              </div>
            )}
            <div className='option bg-green-900 rounded-full px-[9px] py-[15px] mb-3'>
              <div className='title flex justify-between items-center'>
                <span className='text-lg'>Shared Audios</span>
                <img
                  src={toggleViewIcon}
                  className='invert w-6 h-6 mx-2 cursor-pointer'
                  alt=''
                  onClick={(e) =>
                    setToggleAudioListDetailsSection(
                      !toggleAudioListDetailsSection
                    )
                  }
                />
              </div>
            </div>
            {toggleAudioListDetailsSection && (
              <div className=' ml-4 photos overflow-y-auto max-h-[200px] cursor-pointer'>
                {sharedAudiosList.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className='photoItem border-2 border-black flex items-center gap-2 mb-1 w-72'
                    >
                      <img src={microphoneIcon} className='w-6 h-6  ' alt='' />
                      <span className='text-[14px] break-words '>{item.audioFileName || 'untitled'}</span>
                    </div>
                  );
                })}
              </div>
            )}
            <div className='option bg-green-900 rounded-full px-[9px] py-[15px] mb-3'>
              <div className='title flex justify-between items-center'>
                <span className='text-lg'>Shared Images</span>
                <img
                  src={toggleViewIcon}
                  className='invert w-6 h-6 mx-2 cursor-pointer'
                  alt=''
                  onClick={(e) =>
                    setToggleImgListDetailsSection(!toggleImgListDetailsSection)
                  }
                />
              </div>
            </div>

            {toggleImgListDetailsSection && (
              <div className=' ml-4 photos overflow-y-auto max-h-[200px]'>
                {sharedImagesList.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className='photoItem flex items-center gap-8 mb-2 w-72 cursor-pointer'
                    >
                      <img
                        src={item.image}
                        className='w-8 h-8 rounded-full object-cover'
                        alt=''
                      />
                      <span className='text-[14px]'>
                        {item?.imageName || 'untitled'}
                      </span>
                      <img
                        src={showImageInChatIcon}
                        className='w-5 h-5 ml-6 cursor-pointer '
                        alt=''
                      />
                    </div>
                  );
                })}
              </div>
            )}
            <div className='option bg-green-900 rounded-full px-[9px] py-[15px] mb-3'>
              <div className='title flex justify-between items-center'>
                <span className='text-lg'>Shared Videos</span>
                <img
                  src={toggleViewIcon}
                  className='invert w-6 h-6 mx-2 cursor-pointer'
                  alt=''
                  onClick={(e) =>
                    setToggleVideosListDetailsSection(
                      !toggleVideosListDetailsSection
                    )
                  }
                />
              </div>
            </div>
            {toggleVideosListDetailsSection && (
              <div className=' ml-4 photos overflow-y-auto max-h-[200px]'>
                {sharedVideosList.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className='photoItem flex items-center gap-2 mb-2 cursor-pointer'
                    >
                      <img
                        src={videoIcon}
                        className='w-6 h-6 rounded-full'
                        alt=''
                      />
                      <span className='text-[14px]'>{item.videoName || 'untitled'}</span>
                      <img
                        src={showImageInChatIcon}
                        className='w-5 h-5 ml-8 cursor-pointer '
                        alt=''
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {/* <div
            ref={radioSilenceRef}
            className='radioSilence bg-red-800 rounded-xl px-[9px] py-[11px] text-center absolute bottom-3 w-full mx-3'
            onClick={() => radioSilenceChat()}
          >
            Radio Silence
          </div> */}
        </div>
      )}
    </>
  );
}

export default Details;
