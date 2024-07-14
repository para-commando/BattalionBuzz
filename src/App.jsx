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
  isUserValidated,
  currentLoggedInUser,
  fetchUserDetails,
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
    const userAuthState = auth.onAuthStateChanged((user) => {
      console.log('🚀 ~ userAuthState ~ user:useeffffectttt', user);
      dispatch(fetchUserDetails(user));
    });
    return () => {
      userAuthState();
    };
  }, [auth, dispatch,fetchUserDetails]);

  return (
    <>
      <TitleBar />
      <div className='bodyContainer-base-styles'>
        <div className='background-overlay'></div>
        <div className='content flex justify-center'>
          {isLoading ? (
            <>
              <div className='loading text-white text-8xl mt-60 relative flex flex-col items-center'> 
                <img src={turbine} className='absolute bottom-[268px]' alt="" />
                <img src={combatChopper} className='w-44 h-44' alt="" />
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
