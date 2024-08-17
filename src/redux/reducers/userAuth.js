import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
export const getAllUserIds = createAsyncThunk(
  'userAuth/getAllUserIds',
  async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));

    const docIds = querySnapshot.docs.map((doc) => {
      return {
        id: doc.data().id,
        callSign: doc.data().callSign,
        img: doc.data().imgUrl,
      };
    });

    return docIds;
  }
);
export const getCurrentUsersChatList = createAsyncThunk(
  'userAuth/getCurrentUsersChatList',
  async (loggedInUserId) => {
    const chatMessages = collection(db, 'chatMessages');
    const docRef = doc(chatMessages, loggedInUserId);
    const docSnap = await getDoc(docRef);
    const chatsArray = docSnap.data() ? docSnap.data().chats : [];
    return chatsArray;
  }
);
export const fetchUserDetails = createAsyncThunk(
  'userAuth/fetchUserDetails',
  async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data || !data?.uid) {
          return resolve({
            data: { id: '' },
          });
        }

        const docRef = doc(db, 'users', data.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          return resolve({
            data: docSnap.data(),
          });
        } else {
          return reject({
            msg: 'no data found',
          });
        }
      } catch (error) {
        alert('something went wrong, please try again');
      }
    });
  }
);
export const userAuthReducers = createSlice({
  name: 'userAuth',
  initialState: {
    valueIsUserNew: false,
    valueIsUserValidated: false,
    valueUserData: {},
    valueIsSubmitting: false,
    valueCurrentUser: {},
    valueScreenLoading: true,
    sharedImages: [],
    sharedVideos: [],
    sharedAudios: [],
    sharedDocuments: [],
    allUserIds: [],
    currentUsersChatList: [],
  },
  reducers: {
    isUserNew: (state, action) => {
      state.valueIsUserNew = action.payload;
    },
    isUserValidated: (state, action) => {
      state.valueIsUserValidated = action.payload;
    },
    isUserSubmitting: (state, action) => {
      state.valueIsSubmitting = action.payload;
    },
    currentLoggedInUser: (state, action) => {
      state.valueCurrentUser = action.payload;
    },
    setScreenLoading: (state, action) => {
      state.valueScreenLoading = action.payload;
    },
    setSharedChatData: (state, action) => {
      if (action.payload.shouldItClear) {
        state.sharedVideos = [];
        state.sharedAudios = [];
        state.sharedImages = [];
        state.sharedDocuments = [];
        return;
      }
      action.payload.items.map(
        ({
          video = null,
          audioURL = null,
          image = null,
          pdf = null,
          fileName = null,
          audioFileName = null,
          imageName = null,
          videoName = null,
        }) => {
          if (video) {
            state.sharedVideos.push({ video, videoName });
          }
          if (audioURL) {
            state.sharedAudios.push({ audioURL, audioFileName });
          }
          if (image) {
            state.sharedImages.push({ image, imageName });
          }
          if (pdf) {
            state.sharedDocuments.push({ pdf, fileName });
          }
        }
      );
    },
    setCurrentUsersChatlist: (state, action) => {
      state.currentUsersChatList = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {})
      .addCase(fetchUserDetails.fulfilled, (state, action) => {

        if (action.payload.data.id) {
          state.valueUserData = action.payload.data;
          state.valueIsUserValidated = true;
        } else {
          state.valueUserData = {};
          state.valueIsUserValidated = false;
        }
        state.valueIsSubmitting = false;
        state.valueScreenLoading = false;
      })
      .addCase(fetchUserDetails.rejected, (state) => {
  
        state.valueUserData = {};
        state.valueIsUserValidated = false;
        state.valueIsSubmitting = false;
        state.valueScreenLoading = false;
        alert('Something went wrong, please try again');
        //  state.valueIsSubmitting = false;
      })
      .addCase(getAllUserIds.pending, (state) => {})
      .addCase(getAllUserIds.fulfilled, (state, action) => {
        // making sure the logged in user is not present in the list
        action.payload = action.payload.filter(
          (user) => user.id !== state.valueUserData.id
        );
        state.allUserIds = action.payload;
      })
      .addCase(getAllUserIds.rejected, (state) => {})
      .addCase(getCurrentUsersChatList.pending, (state) => {})
      .addCase(getCurrentUsersChatList.fulfilled, (state, action) => {
        const obje = action.payload.reduce((accumulator, currentValue) => {
          accumulator[currentValue.receiverId] = currentValue.chatId;
          return accumulator;
        }, {});

        state.currentUsersChatList = obje;
      })
      .addCase(getCurrentUsersChatList.rejected, (state) => {});
  },
});

export const {
  isUserNew,
  isUserValidated,
  isUserSubmitting,
  currentLoggedInUser,
  setSharedChatData,
  setCurrentUsersChatlist,
} = userAuthReducers.actions;
export default userAuthReducers.reducer;
