import { useState, useEffect } from 'react';
import './App.css';

import TitleBar from './components/TitleBar';
import List from './components/List';
import Details from './components/Details';
import Chats from './components/Chats';
import LandingPage from './components/LandingPage';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from './lib/firebase';
import {
  getAllUserIds,
  fetchUserDetails,
  getCurrentUsersChatList
} from './redux/reducers/userAuth';
import turbine from './assets/turbine.gif';
import combatChopper from './assets/combatChopper.png';

function App() {
  const isUserValidated = useSelector((state) => {
    return state.userAuthReducerExport.valueIsUserValidated;
  });
  const isLoading = useSelector((state) => {
    return state.userAuthReducerExport.valueScreenLoading;
  });
  const dispatch = useDispatch();

  useEffect(() => {
   // Adds an observer for changes to the user's sign-in state.

    const userAuthState = auth.onAuthStateChanged((user) => {
      console.log('🚀 ~ userAuthState ~ user:useeffffectttt', user);
      if (user) {
        // User is signed in, fetch and dispatch user details
        console.log('User signed in:', user);
        dispatch(fetchUserDetails(user));
        // storing all the user Id for better search results
        dispatch(getAllUserIds());
        // fetching current users chat list
        dispatch(getCurrentUsersChatList(user.uid));
      } else {
        // User is signed out, dispatch an action to handle this state
        console.log('User signed out or session expired');
        dispatch(fetchUserDetails(null)); // This action should handle the null case appropriately
      }
    });
    // cleanup function
    return () => {
      userAuthState();
    };
  }, []);

  // below one returns landing page
  return (
    <>
      <TitleBar />
      <div className='bodyContainer-base-styles'>
        <div className='background-overlay'></div>
        <div className='content flex justify-center'>
         {/* the below conditionals decide whether user is authenticated. */}
          {isLoading ? (
            <>
              <div className='loading text-white text-8xl mt-60 relative flex flex-col items-center'>
                <img src={turbine} className='absolute bottom-[268px]' alt='' />
                <img src={combatChopper} className='w-44 h-44' alt='' />
                <p>Loading...</p>
              </div>
            </>
          ) : isUserValidated ? (
            <>
              <List />
              <Chats />
              <Details />
            </>
          ) : (
            <LandingPage />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
