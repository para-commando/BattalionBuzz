import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const loginUser = createAsyncThunk(
  'userAuth/loginUser',
  async (data) => {
    // const response = await fetch('http://127.0.0.1:8080/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.kBZIPlziE8JB1qhEwtl6KGvG8Xu9whXzcE1lvpeUTSM`,
    //   },
    //   body: JSON.stringify(data),
    // }); // replace with your API endpoint
    // const resp = await response.json();

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
export const userAuthReducers = createSlice({
  name: 'userAuth',
  initialState: {
    valueIsUserNew: false,
    valueIsUserValidated: false,
    valueUserData: {
      data: {},
      chats: [],
    },
    valueIsSubmitting: false,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('🚀 ~ .addCase ~ action:', action.payload);
        console.log(
          '🚀 ~ .addCase ~ state.valueUserData:',
          state.valueUserData
        );
        if (action.payload.data) {
          state.valueUserData = action.payload;
        } else {
          alert('Invalid Credentials. Please try again');
        }
      })

      .addCase(loginUser.rejected, (state, action) => {
        alert('something went wrong. Please try again');
      });
  },
});

export const { isUserNew, isUserValidated, isUserSubmitting } =
  userAuthReducers.actions;
export default userAuthReducers.reducer;
