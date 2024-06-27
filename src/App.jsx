import { useState } from 'react';
import './App.css';

import TitleBar from './components/TitleBar';
import List from './components/List';
import Details from './components/Details';
import Chats from './components/Chats';
import Login from './components/Login';

function App() {
  const [count, setCount] = useState(0);
  const user = false;
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
              <Details />{' '}
            </>
          ) : (
            <Login />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
