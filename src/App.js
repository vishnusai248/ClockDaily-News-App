import './App.scss';
import { createContext, useEffect,  useState } from 'react';
import Header from './Components/Header/Header';
import News from './Components/News/News';


export const ThemeContext=createContext();

function App() {
  const [isdarkmode,setdarkmode]=useState(false);
  return (
    <ThemeContext.Provider value={isdarkmode}>
      <div className={`App ${isdarkmode ? 'dark-theme' : 'light-theme'}`}>
        <div className='d-flex flex-column h-100'>
            <Header setdarkmode={setdarkmode}/>
            {/* <div className='appdiv h-100'> */}
              <News></News>
            {/* </div> */}
        </div>
      </div>

    </ThemeContext.Provider>
  );
}

export default App;
