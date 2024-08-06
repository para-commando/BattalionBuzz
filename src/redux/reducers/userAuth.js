import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
export const loginUser = createAsyncThunk(
  'userAuth/loginUser',
  async (data) => {
    return {
      data: {
        name: 'Major Vihaan',
        profileImg:
          'https://i.pinimg.com/550x/7d/b1/f1/7db1f1ee7dfcb3795d4ef2db6b8bb3df.jpg',
      },
      chats: [
        {
          name: 'Major Videep',
          hasSentMessage: true,
          profileImg:
            'https://preview.redd.it/a-commando-from-the-elite-garud-special-forces-of-the-air-v0-ubqtdla4toja1.jpg?width=1080&crop=smart&auto=webp&s=c5dbb3466fef9dd74a111bf9df83e470c8917f43',
        },
        {
          name: 'Major Aarav',
          hasSentMessage: true,
          profileImg: 'https://i.redd.it/z2evjlhpobm51.jpg',
        },
        {
          name: 'Major Arjun',
          hasSentMessage: true,
          profileImg:
            'https://img.freepik.com/premium-photo/indian-army-commando_964707-24.jpg',
        },
        {
          name: 'Major Rohan',
          hasSentMessage: true,
          profileImg:
            'https://girlandworld.com/wp-content/uploads/2017/09/576732_407229076040431_2039671248_n.jpg?w=768',
        },
        {
          name: 'Major Sandeep',
          hasSentMessage: false,
          profileImg:
            'https://girlandworld.com/wp-content/uploads/2017/09/nsg-commando-2.jpg?w=768',
        },
        {
          name: 'Major Amit',
          hasSentMessage: false,
          profileImg:
            'https://thelogicalindian.com/h-upload/2020/04/08/170917-armyweb.jpg',
        },
        {
          name: 'Major Karan',
          hasSentMessage: false,
          profileImg:
            'https://akm-img-a-in.tosshub.com/indiatoday/images/photogallery/201305/uniform-1-5_051913114609.jpg?VersionId=NtSbHqYyRNAev91xGpKRX6RIRMExJNdI&size=686:*',
        },
        {
          name: 'Major Manish',
          hasSentMessage: false,
          profileImg:
            'https://e0.pxfuel.com/wallpapers/314/341/desktop-wallpaper-royal-marine-indian-army-special-forces-royal-marine-commando-marine-commandos.jpg',
        },
        {
          name: 'Major Vijay',
          hasSentMessage: false,
          profileImg:
            'https://www.iadb.in/wp-content/uploads/2021/05/Indian-Special-Forces-scaled.jpeg',
        },
        {
          name: 'Major Rajesh',
          hasSentMessage: false,
          profileImg:
            'https://www.mathrubhumi.com/image/contentid/policy:1.4871015:1644554133/image.jpg?$p=0f6e831&&q=0.8',
        },
      ],
    };
  }
);
export const fetchUserDetails = createAsyncThunk(
  'userAuth/fetchUserDetails',
  async (data) => {
    return new Promise(async (resolve, reject) => {
      if (!data || !data.uid) {
        resolve({
          data: { id: '' },
        });
      }
      const docRef = doc(db, 'users', data.uid);
      const docSnap = await getDoc(docRef);
      console.log('🚀 ~ returnnewPromise ~ docSnap:', docSnap);
      if (docSnap.exists()) {
        resolve({
          data: docSnap.data(),
        });
      } else {
        reject({
          msg: 'no data found',
        });
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
          videoName=null
        }) => {
          if (video) {
            state.sharedVideos.push({video,videoName});
          }
          if (audioURL) {
            state.sharedAudios.push({ audioURL, audioFileName });
          }
          if (image) {
            state.sharedImages.push({image,imageName});
          }
          if (pdf) {
            state.sharedDocuments.push({ pdf, fileName });
          }
        }
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        console.log('🚀 ~ .addCase ~ state1:', state);
        // state.valueIsSubmitting = true;
      })
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
        debugger;
        console.log('promise rejected in fetchUserDetails');
        console.log('🚀 ~ .addCase ~ state2:', state);
        state.valueUserData = {};
        state.valueIsUserValidated = false;
        state.valueIsSubmitting = false;
        state.valueScreenLoading = false;
        alert('Something went wrong, please try again');
        //  state.valueIsSubmitting = false;
      });
  },
});

export const {
  isUserNew,
  isUserValidated,
  isUserSubmitting,
  currentLoggedInUser,
  setSharedChatData,
} = userAuthReducers.actions;
export default userAuthReducers.reducer;
