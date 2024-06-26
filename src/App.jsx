import { useState } from 'react';
import './App.css';

import TitleBar from './components/TitleBar';
import List from './components/List';
import Details from './components/Details';
import Chats from './components/Chats';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TitleBar />
      <div className='bodyContainer-base-styles'>
        <div className="background-overlay"></div>
        <div className="content flex justify-center">
          <List />
          <Chats />
          <Details />
        </div>
      </div>
    </>
  );
}

export default App;
