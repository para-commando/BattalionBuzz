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
  getCurrentUsersChatList,
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
       if (user) {
        // User is signed in, fetch and dispatch user details
         dispatch(fetchUserDetails(user));
        // storing all the user Id for better search results
        dispatch(getAllUserIds());
        // fetching current users chat list
        dispatch(getCurrentUsersChatList(user.uid));
      } else {
        // User is signed out, dispatch an action to handle this state
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
              <div className='loading text-white text-3xl mt-60 relative flex flex-col items-center'>
                <div className='relative'>
                {/* left-1/2 puts the left edge of the element at the middle of the parent container.
                transform: translateX(-50%) shifts the whole element back, placing the center of the element in the middle of the container. */}
                  <img
                    src={turbine}
                    className='absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32'
                    alt=''
                  />
                  <img src={combatChopper} className='w-40 h-40' alt='' />
                </div>
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
