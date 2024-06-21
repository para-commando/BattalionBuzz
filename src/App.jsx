import { useState } from 'react';
import './App.css';


import TitleBar from './components/TitleBar';
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TitleBar />
      <div className='bodyContainer-base-styles'>

      </div>
    </>
  );
}

export default App;
