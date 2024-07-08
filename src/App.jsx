import { useState } from 'react';
import './App.css';

import TitleBar from './components/TitleBar';
import List from './components/List';
import Details from './components/Details';
import Chats from './components/Chats';
import LandingPage from './components/LandingPage';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const user = useSelector((state) => {
    console.log('🚀 ~ App ~ state:', state);
    return state.userAuthReducerExport.valueIsUserValidated;
  });
  const isUserDetailsVisible = useSelector((state) => {
    return state.toggleViewReducersExport.valueIsDetailsVisible;
  });

  return (
    <>
      <TitleBar />
      <div className='bodyContainer-base-styles'>
        <div className='background-overlay'></div>
        <div className='content flex justify-center'>
          {user ? (
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
