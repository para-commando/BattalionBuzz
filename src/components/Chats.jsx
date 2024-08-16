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
import downloadIcon from '../assets/download.png';
import deleteIcon from '../assets/delete.png';
import forwardMessageIcon from '../assets/forward.png';

import EmojiPicker from 'emoji-picker-react';
import {
  isDetailsVisible,
  isChatsVisible,
  isLandingPageVisible,
  setMessages,
} from '../redux/reducers/toggleViewReducers';
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../lib/firebase';
import { v4 as uuidv4 } from 'uuid';

import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { uploadData } from '../lib/upload.js';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import {
  setSharedChatData,
  setCurrentUsersChatlist,
} from '../redux/reducers/userAuth.js';
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
  const options = { hour: '2-digit', minute: '2-digit', hour12: true }; //

  // Format the time
  const formattedTime = date.toLocaleString('en-US', options);

  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short', // e.g., 'Jan'
    day: 'numeric', // e.g., 1
    year: 'numeric', // e.g., 2023
  });
  return `${formattedTime}, ${formattedDate}`;
}
function Chats() {
  const [showOptions, setShowOptions] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [userInputText, setUserInputText] = useState('');
  const messages = useSelector((state) => {
    return state.toggleViewReducersExport.messages;
  });
  const [messageToForward, setMessageToForward] = useState({});
  const usersList = useSelector(
    (state) => state.userAuthReducerExport.allUserIds
  );
  const [openedChatId, setOpenedChatId] = useState('second');
  const [imgToSend, setImgToSend] = useState({
    file: '',
    url: '',
    name: '',
  });
  const [videoToSend, setVideoToSend] = useState({
    file: '',
    url: '',
  });
  const [pdfFileToSend, setPdfFileToSend] = useState({
    file: '',
    fileName: '',
    url: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [messageIdToDelete, setMessageIdToDelete] = useState('false');

  const [isSendImageModalOpen, setIsSendImageModalOpen] = useState(false);
  const [isSendVideoModalOpen, setIsSendVideoModalOpen] = useState(false);
  const [isSendPdfModalOpen, setIsSendPdfModalOpen] = useState(false);
  const [isSendVoiceModalOpen, setIsSendVoiceModalOpen] = useState(false);
  const [isDeleteMessageModalOpen, setIsDeleteMessageModalOpen] =
    useState(false);
  const [isForwardDataModalOpen, setIsForwardDataModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedVideo, setSelectedVideo] = useState('');
  const [selectedPdfFile, setSelectedPdfFile] = useState('');

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
        // post the user to chat with is opened, whatever message he has sent must be marked as viewed
        matchedChat.hasSentMessage = false;
        updateDoc(docRef, {
          chats: arrayUnion(matchedChat),
        });
        if (matchedChat) {
          userChatId = matchedChat;
          setOpenedChatId(userChatId.chatId);
        }
      }
      // fetches the realtime chat messages as onSnapshot is used
      const unsubscribe = onSnapshot(
        doc(db, 'chats', userChatId.chatId),
        (res) => {
          const items = res.data().messages;
          // setting data in the details section, by first clearing of the previous data
          dispatch(setSharedChatData({ items: [], shouldItClear: true }));
          dispatch(setSharedChatData({ items, shouldItClear: false }));
          dispatch(setMessages(items));
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
  // function facilitating sending of image or video
  const handleSendImage = async (e) => {
    console.log('🚀 ~ handleSendImage ~ e:32rknfkefneor', e.target.files['0']);
    if (e.target.files['0'].size > 10000000) {
      alert('File size should be less than 10MB');

      return;
    }
    const imgFileType = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/gif',
      'video/mp4',
    ];
    if (!imgFileType.includes(e.target.files['0'].type)) {
      alert('File type should be one among: jpeg, png, jpg, gif, mp4');
      return;
    }
    if (e.target.files['0'].type.includes('image')) {
      setImgToSend({
        file: e.target.files['0'],
        url: URL.createObjectURL(e.target.files['0']),
        name: e.target.files['0'].name,
      });
      handleSendImageModal(URL.createObjectURL(e.target.files['0']));
    }
    if (e.target.files['0'].type.includes('video')) {
      setVideoToSend({
        file: e.target.files['0'],
        url: URL.createObjectURL(e.target.files['0']),
        name: e.target.files['0'].name,
      });
      handleSendVideoModal(URL.createObjectURL(e.target.files['0']));
    }
  };
  const handleSendPdfFiles = async (e) => {
    console.log('🚀 ~ handleSendImage ~ e:34543543543534', e.target.files['0']);

    if (e.target.files['0'].size > 10000000) {
      alert('File size should be less than 10MB');

      return;
    }
    const fileTypes = ['application/pdf', 'text/plain'];
    if (!fileTypes.includes(e.target.files['0'].type)) {
      alert('File type should be pdf only');
      return;
    }

    setPdfFileToSend({
      file: e.target.files['0'],
      fileName: e.target.files['0'].name,
      url: URL.createObjectURL(e.target.files['0']),
    });

    handleSendPdfModal(URL.createObjectURL(e.target.files['0']));
  };
  const handleSendMessage = async () => {
    if (
      !userInputText &&
      !imgToSend.file &&
      !videoToSend.file &&
      !pdfFileToSend.file &&
      !audioURL
    ) {
      alert('Please enter a valid item to send');
      return;
    }
    const uniqueId = uuidv4();
    setIsSendImageModalOpen(false);
    setIsSendVideoModalOpen(false);
    setIsSendPdfModalOpen(false);
    setIsSendVoiceModalOpen(false);
    setIsSending(true);
    // for the blinking effect on send button
    const interval = setInterval(() => {
      setIsInvert((prev) => !prev);
    }, 250);
    let imgUrl = '';
    let videoUrl = '';
    let pdfUrl = '';
    let audioUploadUrl = '';
    if (imgToSend.file) {
      imgUrl = await uploadData(imgToSend.file);
      console.log('🚀 ~ handleSendMessage ~ imgUrl:', imgUrl);
    }
    if (videoToSend.file) {
      videoUrl = await uploadData(videoToSend.file);
      console.log('🚀 ~ handleSendMessage ~ videoUrl:', videoUrl);
    }
    if (pdfFileToSend.file) {
      pdfUrl = await uploadData(pdfFileToSend.file);
      console.log('🚀 ~ handleSendMessage ~ pdfUrl:', pdfUrl);
    }
    if (audioURL) {
      audioUploadUrl = await uploadData(audioBlob.audioBlob);
      console.log('🚀 ~ handleSendMessage ~ audioUploadUrl:', audioUploadUrl);
    }
    try {
      console.log('🚀 ~ handleSendMessage ~ currentOpenedUser:', openedChatId);
      // updating message in the senders's chat list so that he is able to see the message sent
      await updateDoc(doc(db, 'chats', openedChatId), {
        messages: arrayUnion({
          mId: uniqueId,
          senderId: userData.id,
          receiverId: currentOpenedUser.id,
          image: imgUrl ? imgUrl : '',
          imageName: imgToSend?.name ? imgToSend?.name : '',
          video: videoUrl ? videoUrl : '',
          videoName: videoToSend?.name ? videoToSend?.name : '',
          audioURL: audioUploadUrl ? audioUploadUrl : '',
          audioFileName: audioBlob.audioFileName ? audioBlob.audioFileName : '',
          pdf: pdfUrl ? pdfUrl : '',
          fileName: pdfFileToSend?.fileName ? pdfFileToSend?.fileName : '',
          isUserMessage: true,
          username: currentOpenedUser.callSign
            ? currentOpenedUser.callSign
            : '',
          message: userInputText ? userInputText : '',
          time: formatChatTime(new Date()),
          updatedAt: Date.now(),
          hasSentMessage: true,
          isSeen: false,
        }),
      });
      // clearing the input box post adding chat in the opened user's window
      setUserInputText('');

      // updating message in the receiver's chat list so that he is able to see the message sent
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
      // if user is already added in the receiver's chat list then below conditional will be true, else false
      if (matchedChat) {
        console.log('🚀 ~ handleSendMessage ~ matchedChat:', matchedChat);
        // to make turn on message received indicator in receiver's chat list
        await updateDoc(docRef, {
          chats: arrayRemove(matchedChat),
        });
        matchedChat.hasSentMessage = true;
        matchedChat.updatedAt = Date.now();
        await updateDoc(docRef, {
          chats: arrayUnion(matchedChat),
        });

        // adding chat in the receiver's chat list
        updateDoc(doc(db, 'chats', matchedChat.chatId), {
          messages: arrayUnion({
            mId: uniqueId,
            image: imgUrl ? imgUrl : '',
            imageName: imgToSend?.name ? imgToSend?.name : '',
            video: videoUrl ? videoUrl : '',
            videoName: videoToSend?.name ? videoToSend?.name : '',
            audioURL: audioUploadUrl ? audioUploadUrl : '',
            audioFileName: audioBlob.audioFileName
              ? audioBlob.audioFileName
              : '',
            pdf: pdfUrl ? pdfUrl : '',
            fileName: pdfFileToSend?.fileName ? pdfFileToSend?.fileName : '',
            isUserMessage: false,
            message: userInputText ? userInputText : '',
            time: formatChatTime(new Date()),
            updatedAt: Date.now(),
            hasSentMessage: true,
            isSeen: false,
          }),
        });

        console.log('🚀 ~ handleSendMessage ~ matchedChat:', matchedChat);
      } else {
        // if the user is not present in the receiver's chat list then below conditional will be true

        const chats = collection(db, 'chats');
        console.log('🚀 ~ addUser ~ chats:', chats);
        const newChatRef = doc(chats);
        // creating a new chat document
        await setDoc(newChatRef, {
          createdAt: Date.now(),
          messages: [],
        });

        // updating a document with the receiver's id in the chatMessages collection and adding the newly created chat in the receiver's chat list

        await updateDoc(docRef, {
          chats: arrayUnion({
            chatId: newChatRef.id,
            hasSentMessage: true,
            lastMessage: '',
            receiverId: userData.id,
            updatedAt: Date.now(),
          }),
        });
        updateDoc(doc(db, 'chats', newChatRef.id), {
          messages: arrayUnion({
            mId: uniqueId,
            image: imgUrl ? imgUrl : '',
            imageName: imgToSend?.name ? imgToSend?.name : '',
            video: videoUrl ? videoUrl : '',
            videoName: videoToSend?.name ? videoToSend?.name : '',
            audioURL: audioUploadUrl ? audioUploadUrl : '',
            audioFileName: audioBlob.audioFileName
              ? audioBlob.audioFileName
              : '',
            pdf: pdfUrl ? pdfUrl : '',
            fileName: pdfFileToSend?.fileName ? pdfFileToSend?.fileName : '',
            isUserMessage: false,
            message: userInputText ? userInputText : '',
            time: formatChatTime(new Date()),
            updatedAt: Date.now(),
            hasSentMessage: true,
            isSeen: false,
          }),
        });
      }
      return;
    } catch (error) {
      debugger;
    } finally {
      setUserInputText('');
      clearInterval(interval);
      setIsSending(false);
      setIsInvert(false);
      imgUrl = '';
      videoUrl = '';
      pdfUrl = '';
      audioUploadUrl = '';
      setImgToSend({
        file: '',
        url: '',
        name: '',
      });
      setVideoToSend({
        file: '',
        url: '',
        name: '',
      });
      setPdfFileToSend({
        file: '',
        url: '',
        fileName: '',
      });
      setAudioURL('');
      setAudioBlob({
        audioBlob: null,
        audioFileName: '',
      });
    }
  };

  const handleViewImage = (url) => {
    setSelectedImage(url);
    setIsModalOpen(true);
  };

  const handleViewPdf = (url) => {
    setSelectedPdfFile(url);
    setIsPdfModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage('');
  };

  const handlePdfCloseModal = () => {
    setIsPdfModalOpen(false);
    selectedPdfFile('');
  };
  const handleCancelImageSending = () => {
    setIsSendImageModalOpen(false);
    setSelectedImage('');
    console.log('wefffffffffffffffffrwerwerweeeeeeeeeeeeeeeeeeeeeeee');
    setImgToSend({
      file: '',
      url: '',
      name: '',
    });
  };
  const handleCancelVideoSending = () => {
    setIsSendVideoModalOpen(false);
    setSelectedVideo('');
    setVideoToSend({
      file: '',
      url: '',
      name: '',
    });
  };

  const deleteMessageInReceiversChat = async (mId) => {
    const chatMessages = collection(db, 'chatMessages');
    const docRef = doc(chatMessages, currentOpenedUser.id);
    const openedUsersListOfChats = await getDoc(docRef);

    if (!openedUsersListOfChats.exists()) {
      console.log(`Receiver's chat doesn't exist`);
      return;
    }

    const chatsArray = openedUsersListOfChats.data().chats || [];
    const sendersChat = chatsArray.find(
      (chat) => chat.receiverId === userData.id
    );

    if (!sendersChat) {
      console.log(`Sender's chat was not found in the receiver's chat list`);
      return;
    }

    const docRef33 = doc(db, 'chats', sendersChat.chatId);
    const docSnap33 = await getDoc(docRef33);

    if (!docSnap33.exists()) {
      console.log(
        'No messages found in the receiver chat window for the current sender'
      );
      return;
    }

    const chatsArray33 = docSnap33.data().messages || [];
    const matchedReceiverMessage = chatsArray33.find(
      (chat) => chat.mId === mId
    );

    if (matchedReceiverMessage) {
      await updateDoc(docRef33, {
        messages: arrayRemove(matchedReceiverMessage),
      });
      console.log(
        'Receiver message deleted successfully from sender’s chat list'
      );
    } else {
      console.log('Receiver message not found in sender’s chat list');
    }
  };

  // Step 2: Delete the message from the receiver's chat list (i.e., the receiver's view of the chat with the current user)
  const deleteMessageInSendersChat = async (mId) => {
    const chatMessages22 = collection(db, 'chats');
    const docRef22 = doc(chatMessages22, openedChatId);
    const docSnap22 = await getDoc(docRef22);

    if (!docSnap22.exists()) {
      console.log(
        `Receiver's chat doesn't exist in the sender's list of chats`
      );
      return;
    }

    const chatsArray22 = docSnap22.data().messages || [];
    const matchedSenderMessage = chatsArray22.find((chat) => chat.mId === mId);

    if (matchedSenderMessage) {
      await updateDoc(docRef22, {
        messages: arrayRemove(matchedSenderMessage),
      });
      console.log(
        'Sender message deleted successfully from receiver’s chat list'
      );
    } else {
      console.log('Sender message not found in receiver’s chat list');
    }
    return;
  };
  const handleDeleteMessageForSelf = async () => {
    try {
      await deleteMessageInSendersChat(messageIdToDelete);
    } catch (error) {
      alert('something went wrong, please try again');
    } finally {
      setIsDeleteMessageModalOpen(false);
      setMessageIdToDelete('');
    }
  };
  const handleDeleteMessageForBoth = async () => {
    try {
      await deleteMessageInReceiversChat(messageIdToDelete);
      await deleteMessageInSendersChat(messageIdToDelete);
    } catch (error) {
      alert('something went wrong, please try again');
    } finally {
      setIsDeleteMessageModalOpen(false);
      setMessageIdToDelete('');
    }
  };

  const handleCloseDeleteMessageModal = () => {
    setIsDeleteMessageModalOpen(false);
    setMessageIdToDelete('');
  };

  const handleCloseForwardDataModal = () => {
    setIsForwardDataModalOpen(false);
  };

  const handleCancelPdfSending = () => {
    setIsSendPdfModalOpen(false);
    setSelectedPdfFile('');

    setPdfFileToSend({
      file: '',
      fileName: '',
      url: '',
    });
  };

  const handleCancelAudioRecording = () => {
    mediaRecorder.current.stop();
    setIsRecording(false);
    setIsSendVoiceModalOpen(false);
  };

  const handleSendImageModal = (url) => {
    setSelectedImage(url);
    setIsSendImageModalOpen(true);
  };
  const handleSendVideoModal = (url) => {
    setSelectedVideo(url);
    setIsSendVideoModalOpen(true);
  };

  const handleSendPdfModal = (url) => {
    setSelectedPdfFile(url);
    setIsSendPdfModalOpen(true);
  };

  const handleForwardDataModal = (url) => {
    console.log('🚀 ~ handleForwardDataModal ~ url:', url);
    setMessageToForward(url);
    setIsForwardDataModalOpen(true);
  };
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [audioBlob, setAudioBlob] = useState({
    audioBlob: null,
    audioFileName: '',
  });
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const handleMicrophoneClick = () => {
    setIsSendVoiceModalOpen(true);
  };
  const streamRef = useRef(null); // To store the media stream

  const startRecording = async (e) => {
    try {
      debugger;
      console.log('🚀 ~ startRecording ~ e:', e);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream; // Store the stream to stop it later

      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(audioChunks.current, { type: 'audio/wav' });
        setAudioBlob({
          audioBlob: blob,
          audioFileName: new Date().toISOString(),
        });
        setAudioURL(URL.createObjectURL(blob));
        audioChunks.current = [];
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      alert('something went wrong, please check microphone access');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop()); // Stop the media stream
      streamRef.current = null; // Clear the reference
    }
    setShowSendButton(true);
    setIsRecording(false);
  };
  const handleDeleteMessageModal = async (mId) => {
    setIsDeleteMessageModalOpen(true);
    setMessageIdToDelete(mId);
  };
  const loggedInUsersChatList = useSelector(
    (state) => state.userAuthReducerExport.currentUsersChatList
  );
  const handleForwardMessage = async (params) => {
    try {
      debugger;
      console.log(
        '🚀 ~ handleForwardMessage ~ params:6777777777777777777777777',
        params
      );
      const uniqueId = uuidv4();
      const newMsg = { ...messageToForward };
      newMsg.mId = uniqueId;
      newMsg.isUserMessage = true;
      setMessageToForward(newMsg);

      // receiver is already present in the list of chats of the user then below conditional will be true
      if (loggedInUsersChatList[params.id]) {
        await updateDoc(doc(db, 'chats', loggedInUsersChatList[params.id]), {
          messages: arrayUnion(newMsg),
        });
      } else {
        // receiver is not present in the list of chats of the user then this will be executed
        debugger;
        // creating a new chat id for the receiver
        const chats = collection(db, 'chats');
        console.log('🚀 ~ addUser ~ chats:', chats);
        const newChatRef = doc(chats);
        await setDoc(newChatRef, {
          createdAt: Date.now(),
          messages: [],
        });
        const chatMessages = collection(db, 'chatMessages');
        const docRef = doc(chatMessages, userData.id);
        // adding that newly created chatId in the chatMessages collection so that he will be visible in the list of chats of the user
        await updateDoc(docRef, {
          chats: arrayUnion({
            chatId: newChatRef.id,
            receiverId: params.id,
            hasSentMessage: false,
            lastMessage: '',
            updatedAt: Date.now(),
          }),
        });
        // adding new user in the redux reducer

        const newList = { ...loggedInUsersChatList };

        // adding new user in the redux reducer
        newList[params.id] = newChatRef.id;
        dispatch(setCurrentUsersChatlist(newList));
      }

      setIsForwardDataModalOpen(false);
      debugger;
      // updating the chats in the receiver's list
      const chatMessages = collection(db, 'chatMessages');
      const docRef = doc(chatMessages, params.id);

      const docSnap = await getDoc(docRef);
      // getting the receiver's chat list from chatMessages collection
      const chatsArray = docSnap.data().chats;
      console.log(
        '🚀 ~ handleForwardMessage ~ docSnap.data():',
        docSnap.data()
      );

      // checking if the sender's chat is already present in the chatMessages document of the receiver
      const matchedChat = chatsArray.length
        ? await chatsArray.find((chat) => chat.receiverId === userData.id)
        : null;
      if (matchedChat) {
        // updating chatMessages collection for the document to turn on the latest message identification
        console.log('🚀 ~ handleSendMessage ~ matchedChat:', matchedChat);
        await updateDoc(docRef, {
          chats: arrayRemove(matchedChat),
        });
        matchedChat.hasSentMessage = true;
        matchedChat.updatedAt = Date.now();
        await updateDoc(docRef, {
          chats: arrayUnion(matchedChat),
        });
        // adding chat in the receiver's chat list
        // since the message will now be sent to receiver hence its receiverId needs to be changed
        newMsg.isUserMessage = false;
        updateDoc(doc(db, 'chats', matchedChat.chatId), {
          messages: arrayUnion(newMsg),
        });

        console.log('🚀 ~ handleSendMessage ~ matchedChat:', matchedChat);
      } else {
        // creating a new chat and then adding it in the chatMessages collection's document matching the receiver's id
        const chats = collection(db, 'chats');
        console.log('🚀 ~ addUser ~ chats:', chats);
        const newChatRef = doc(chats);
        await setDoc(newChatRef, {
          createdAt: Date.now(),
          messages: [],
        });

        const chatMessagesDoc = collection(db, 'chatMessages');
        console.log('🚀 ~ addUser ~ chats:', chats);
        const newChatMessagesRef = doc(chatMessagesDoc, params.id);

        await updateDoc(newChatMessagesRef, {
          chats: arrayUnion({
            chatId: newChatRef.id,
            receiverId: userData.id,
            hasSentMessage: true,
            lastMessage: '',
            updatedAt: Date.now(),
          }),
        });
        // since the message will now be sent to receiver hence its receiverId needs to be changed
        newMsg.isUserMessage = false;
        updateDoc(doc(db, 'chats', newChatRef.id), {
          messages: arrayUnion(newMsg),
        });
      }
    } catch (error) {
      setIsForwardDataModalOpen(false);
      setMessageToForward({});
      console.log('🚀 ~ handleForwardMessage ~ error:', error);
      debugger;
    }
  };
  const [showSendButton, setShowSendButton] = useState(false);
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
          <Modal
            isOpen={isSendImageModalOpen}
            onRequestClose={handleCancelImageSending}
            style={customStyles}
            contentLabel='Send Image Modal'
            ariaHideApp={false}
          >
            <div className='relative z-[1001]'>
              <img
                src={closeButton}
                alt='Back'
                className='w-12 h-12 p-2 cursor-pointer'
                onClick={handleCancelImageSending}
              />
              <div className='relative'>
                <img src={selectedImage} alt='Full View' className='' />
              </div>
              <div
                title='Send'
                className='SendButton flex justify-between border-4 border-black h-12'
              >
                <span
                  className='bg-red-500 px-10 pt-2 text-center w-1/2 cursor-pointer'
                  onClick={handleCancelImageSending}
                >
                  Cancel
                </span>
                <span
                  className='bg-green-400 px-10 pt-2 text-center w-1/2 cursor-pointer'
                  onClick={handleSendMessage}
                >
                  Send
                </span>
              </div>
            </div>
          </Modal>
          <Modal
            isOpen={isSendVideoModalOpen}
            onRequestClose={handleCancelVideoSending}
            style={customStyles}
            contentLabel='Send Video Modal'
            ariaHideApp={false}
          >
            <div className='relative z-[1001]'>
              <img
                src={closeButton}
                alt='Back'
                className='w-12 h-12 p-2 cursor-pointer'
                onClick={handleCancelVideoSending}
              />
              <div className='relative'>
                <video width='600' controls>
                  <source src={selectedVideo} type='video/mp4' />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div
                title='Send'
                className='SendButton flex justify-between border-4 border-black h-12'
              >
                <span
                  className='bg-red-500 px-10 pt-2 text-center w-1/2 cursor-pointer'
                  onClick={handleCancelVideoSending}
                >
                  Cancel
                </span>
                <span
                  className='bg-green-400 px-10 pt-2 text-center w-1/2 cursor-pointer'
                  onClick={handleSendMessage}
                >
                  Send
                </span>
              </div>
            </div>
          </Modal>
          <Modal
            isOpen={isPdfModalOpen}
            onRequestClose={handlePdfCloseModal}
            style={customStyles}
            contentLabel='Image View Modal'
            ariaHideApp={false}
          >
            <div className='relative z-[1001]'>
              <img
                src={closeButton}
                alt='Back'
                className='w-12 h-12 p-2 cursor-pointer'
                onClick={handlePdfCloseModal}
              />

              <div className='relative h-[900px] w-[900px]'>
                <iframe
                  src={selectedPdfFile}
                  className='border-0 h-full w-full bg-white'
                  title='PDF Viewer'
                ></iframe>
              </div>
            </div>
          </Modal>
          <Modal
            isOpen={isSendPdfModalOpen}
            onRequestClose={handleCancelPdfSending}
            style={customStyles}
            contentLabel='Send PDF Modal'
            ariaHideApp={false}
          >
            <div className='relative z-[1001] h-[900px] w-[900px]'>
              <img
                src={closeButton}
                alt='Back'
                className='w-12 h-12 p-2 cursor-pointer'
                onClick={handleCancelPdfSending}
              />
              <div className='relative h-[570px] w-[900px] overflow-auto'>
                <iframe
                  src={selectedPdfFile}
                  className='border-0 h-full w-full bg-white'
                  title='PDF Viewer'
                ></iframe>
              </div>
              <div
                title='Send'
                className='relative SendButton flex justify-between border-4 border-black h-12'
              >
                <span
                  className='bg-red-500 px-10 pt-2 text-center w-1/2 cursor-pointer'
                  onClick={handleCancelPdfSending}
                >
                  Cancel
                </span>
                <span
                  className='bg-green-400 px-10 pt-2 text-center w-1/2 cursor-pointer'
                  onClick={handleSendMessage}
                >
                  Send
                </span>
              </div>
            </div>
          </Modal>
          <Modal
            isOpen={isSendVoiceModalOpen}
            onRequestClose={handleCancelAudioRecording}
            contentLabel='Record Voice Message'
            ariaHideApp={false}
            style={customStyles}
          >
            <h2 className='text-lg font-semibold mb-4 relative p-3'>
              Record Voice Message
            </h2>
            <div className='flex flex-col items-center relative p-3'>
              {isRecording ? (
                <button
                  className='bg-red-500 text-white px-4 py-2 rounded-2xl cursor-pointer relative'
                  onClick={stopRecording}
                >
                  Stop Recording
                </button>
              ) : (
                <button
                  className='bg-green-500 text-white px-4 py-2 cursor-pointer relative rounded-2xl'
                  onClick={startRecording}
                >
                  Start Recording
                </button>
              )}
              {audioURL && (
                <div className='mt-4 flex flex-col items-center'>
                  <span className='text-sm font-semibold mb-2'>
                    Recorded Audio:
                  </span>
                  <div className='w-full max-w-sm p-4 border rounded-lg shadow-md bg-gray-50'>
                    <audio controls src={audioURL} className='w-full mb-2'>
                      Your browser does not support the audio element.
                    </audio>
                    <span className='text-xs text-gray-600'>
                      file name: {audioBlob.audioFileName}
                    </span>
                  </div>
                </div>
              )}
              {!isRecording && showSendButton && (
                <div
                  className='bg-emerald-950 text-white px-6 py-1 text-center rounded-2xl cursor-pointer mt-2'
                  onClick={handleSendMessage}
                >
                  Send
                </div>
              )}
            </div>
          </Modal>
          <Modal
            isOpen={isDeleteMessageModalOpen}
            onRequestClose={handleCloseDeleteMessageModal}
            style={customStyles}
            contentLabel='Delete message Modal'
            ariaHideApp={false}
          >
            <div className='relative z-[1001] w-72'>
              <img
                src={closeButton}
                alt='Back'
                className='w-12 h-12 p-2 cursor-pointer'
                onClick={handleCloseDeleteMessageModal}
              />

              <div
                title='Send'
                className='SendButton flex justify-between border-4 border-black h-12'
              >
                <span
                  className='bg-red-500 px-10 pt-2 text-[10px] text-center w-1/2 cursor-pointer'
                  onClick={handleDeleteMessageForSelf}
                >
                  Delete For Self
                </span>
                <span
                  className='bg-green-400 px-10 pt-2 text-[10px] text-center cursor-pointer'
                  onClick={handleDeleteMessageForBoth}
                >
                  Delete for both
                </span>
              </div>
            </div>
          </Modal>
          <Modal
            isOpen={isForwardDataModalOpen}
            onRequestClose={handleCloseForwardDataModal}
            style={customStyles}
            contentLabel='Forward data Modal'
            ariaHideApp={false}
          >
            <div className='relative z-[1001] w-72 h-auto'>
              <img
                src={closeButton}
                alt='Back'
                className='w-12 h-12 p-2 cursor-pointer'
                onClick={handleCloseForwardDataModal}
              />

              <div
                title='Send'
                className='SendButton  justify-between border-4 border-black h-21 overflow-y-auto'
              >
                {usersList &&
                  usersList.map((e) => {
                    // Truncate the callSign if it exceeds the maximum length
                    const truncatedCallSign =
                      e.callSign.length > 15
                        ? e.callSign.slice(0, 15) + '...'
                        : e.callSign;

                    return (
                      <div
                        title={e.callSign}
                        key={e.id}
                        className='user p-2 details flex gap-2 items-center justify-center cursor-pointer'
                        onClick={() => {
                          handleForwardMessage(e);
                        }}
                      >
                        <img
                          src={e.img}
                          className='w-7 h-7 mx-2 rounded-full cursor-pointer object-cover object-top'
                          alt=''
                        />
                        <span className='w-15'>{truncatedCallSign}</span>
                        <img
                          title='Forward'
                          src={forwardMessageIcon}
                          alt=''
                          className={'w-5 h-5 cursor-pointer'}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </Modal>
          <div
            className={
              isUserDetailsVisible
                ? 'border-r-2 border-l-2 min-w-[73%] max-w-[80%] px-2 relative flex flex-col items-center'
                : 'border-r-2 border-l-2 min-w-[95%] max-w-[100%] px-2 relative flex flex-col items-center'
            }
          >
            <div className='flex w-full justify-between border-b-2 pb-4 relative'>
              <div className='UserInfoInChatsWindow flex items-center gap-3'>
                <div
                  className='name flex flex-col justify-start items-start'
                  onClick={() => {
                    dispatch(setMessages([]));
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

            <div className='UserChatDetailsInChatsWindow relative w-full flex flex-col gap-2 overflow-y-auto   rounded-xl h-[525px] mt-2 pb-2'>
              {messages.map((message, index) => {
                console.log(
                  '🚀 ~ {messages.map ~ messagepppppppppppppppddddddffff:',
                  message
                );

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
                        <div>
                          <p
                            className={
                              message.isUserMessage
                                ? 'bg-green-950 text-white rounded-3xl p-2 break-words'
                                : 'bg-green-800 text-white rounded-3xl p-2 break-words'
                            }
                          >
                            {message.message}
                          </p>
                        </div>
                      )}
                      {message?.audioURL && (
                        <div className='mt-4 flex flex-col items-center w-96 pb-2'>
                          <div className='w-full max-w-sm p-4 border rounded-lg shadow-md bg-gray-50'>
                            <audio
                              controls
                              src={message.audioURL}
                              className='w-full mb-2'
                            />
                            <span className='text-xs text-gray-600'>
                              file name: {message.audioFileName}
                            </span>
                          </div>
                        </div>
                      )}
                      {message?.video && (
                        <div className='pb-2'>
                          <video width='600' controls>
                            <source src={message.video} type='video/mp4' />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      )}
                      {message?.image && (
                        <div className='flex flex-col gap-[2px]'>
                          <img
                            title='Image in chats'
                            src={message.image}
                            className='max-w-80 max-h-80 mx-2 cursor-pointer rounded-lg mt-1 object-contain bg-gray-300'
                            onClick={() => handleViewImage(message.image)}
                            alt='image in chats'
                          />
                          <div className='self-center mb-1'>
                            <a
                              href={message?.image}
                              download={message?.image}
                              className='text-blue-500 hover:underline'
                              target='_blank'
                            >
                              <img
                                src={downloadIcon}
                                alt=''
                                className='w-5 h-5'
                              />
                            </a>
                          </div>
                        </div>
                      )}
                      {message?.pdf && (
                        <div className='flex flex-col gap-[2px]'>
                          <div className='pdf-preview-container p-4 border rounded-lg shadow-md bg-white max-w-3xl mx-auto my-4 cursor-pointer'>
                            <div className='pdf-preview-header mb-4'>
                              <h2 className='text-lg font-semibold text-gray-800'>
                                {message.fileName}
                              </h2>
                            </div>
                            <div className='pdf-preview-body flex items-center justify-center bg-gray-100 border rounded-lg p-4'>
                              <span
                                className='text-gray-500 text-center'
                                onClick={() => handleViewPdf(message.pdf)}
                              >
                                📄 Click to open
                              </span>
                            </div>
                          </div>
                          <div className='mb-1'>
                            <a
                              href={message?.pdf}
                              download={message?.fileName}
                              target='_blank'
                              className='text-blue-500 hover:underline'
                            >
                              <img
                                src={downloadIcon}
                                alt=''
                                className='w-5 h-5'
                              />
                            </a>
                          </div>
                        </div>
                      )}

                      <div className='flex gap-7'>
                        <span className='text-white text-[12px] ml-3'>
                          {message.time}
                        </span>
                        <img
                          src={deleteIcon}
                          alt=''
                          className={
                            message.isUserMessage
                              ? 'w-5 h-5 cursor-pointer'
                              : 'hidden'
                          }
                          onClick={() => handleDeleteMessageModal(message.mId)}
                        />
                        <img
                          src={forwardMessageIcon}
                          alt=''
                          className='w-5 h-5 cursor-pointer'
                          onClick={() => handleForwardDataModal(message)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}

              <div ref={showLatestMessage}></div>
            </div>

            <div className='UserInputInChatsWindow flex justify-between items-center bg-green-950 rounded-full px-2 h-14  box-border w-[95%] absolute bottom-2  '>
              <input
                type='text'
                value={userInputText}
                onChange={(e) => setUserInputText(e.target.value)}
                className='w-[70%] rounded-full pl-4 text-black h-9 text-lg'
                placeholder='Your Intel goes here...'
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    !isSending && handleSendMessage();
                  }
                }}
              />
              <div className='flex items-center gap-5 mr-2'>
                <div title='microphone' className='Microphone invert'>
                  <img
                    src={microphoneIcon}
                    className='w-7 h-7 mx-2 cursor-pointer'
                    alt='microphone'
                    onClick={handleMicrophoneClick}
                  />
                </div>
                <div title='Documents' className='DocumentOption invert'>
                  <label htmlFor='file'>
                    <img
                      src={documentsIcon}
                      className='w-7 h-7 mx-1 cursor-pointer'
                      alt='Documents'
                    />
                  </label>
                  <input
                    type='file'
                    id='file'
                    className='hidden'
                    onChange={handleSendPdfFiles}
                  />
                </div>
                <div
                  ref={emojiPickerRef}
                  title='emojis'
                  className='emojisOption'
                >
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
                <div title='Media' className='Media invert'>
                  <label htmlFor='mediaFile'>
                    <img
                      src={mediaIcon}
                      className='w-7 h-7 mx-2 cursor-pointer'
                      alt='Media'
                    />
                  </label>
                  <input
                    type='file'
                    id='mediaFile'
                    className='hidden'
                    onChange={handleSendImage}
                  />
                </div>
                <div
                  title='Send'
                  className='SendButton'
                  onClick={!isSending ? handleSendMessage : undefined}
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
          </div>
        </>
      )}
    </>
  );
}

export default Chats;
