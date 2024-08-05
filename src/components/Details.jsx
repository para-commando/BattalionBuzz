import React, { useState, useRef } from 'react';
import avatarIcon from '../assets/avatarIcon.png';
import toggleViewIcon from '../assets/unfold.png';
import { useSelector, useDispatch } from 'react-redux';
import documentsIcon from '../assets/docs.png';

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
  const sharedMediaList = [
    {
      imgLink:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imgName: 'Photo_2024_2.png',
    },
    {
      imgLink:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imgName: 'Photo_2024_2.png',
    },
    {
      imgLink:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imgName: 'Photo_2024_2.png',
    },
    {
      imgLink:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imgName: 'Photo_2024_2.png',
    },
    {
      imgLink:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imgName: 'Photo_2024_2.png',
    },
    {
      imgLink:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imgName: 'Photo_2024_2.png',
    },
    {
      imgLink:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imgName: 'Photo_2024_2.png',
    },
    {
      imgLink:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imgName: 'Photo_2024_2.png',
    },
    {
      imgLink:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imgName: 'Photo_2024_2.png',
    },
    {
      imgLink:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imgName: 'Photo_2024_2.png',
    },
    {
      imgLink:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      imgName: 'Photo_2024_2.png',
    },
  ];
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
              <div className=' ml-4 photos overflow-y-auto h-[200px]'>
                {sharedDocumentsList.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className='photoItem border-2 border-black flex items-center gap-2 mb-1 w-72'
                    >
                      <img
                        src={documentsIcon}
                        className='w-6 h-6  '
                        alt=''
                      />
                      <span className='text-[14px]'>{item.fileName}</span>
                   
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
              <div className=' ml-4 photos overflow-y-auto h-[200px]'>
                {sharedImagesList.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className='photoItem flex items-center gap-2 mb-2'
                    >
                      <img
                        src={item.image}
                        className='w-6 h-6 rounded-full'
                        alt=''
                      />
                      <span className='text-[14px]'>{'item.imgName'}</span>
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
              <div className=' ml-4 photos overflow-y-auto h-[200px]'>
                {sharedVideosList.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className='photoItem flex items-center gap-2 mb-2'
                    >
                      <img
                        src={item.video}
                        className='w-6 h-6 rounded-full'
                        alt=''
                      />
                      <span className='text-[14px]'>{'item.videoName'}</span>
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
