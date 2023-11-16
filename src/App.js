import React  from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Login from './components/Login';
import WhatsappContent from './components/WhatsappContent';

const App =() => {
  const isAuth = useSelector(state => state.app.isAuth);

  return (
      <div className="app">
        <div className="app__body">
          {!isAuth && <Login/>}
          {isAuth && <WhatsappContent/>}
        </div>
      </div>
  );
}

export default App;
