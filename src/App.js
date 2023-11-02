import React ,{ useState} from 'react';
import './App.css';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';

const App =() => {
  const [user, setUser] = useState({});
  const login = (data) => {
    setUser(data);
  }
  const LoginForm = (
    <>
      <Login login={login} />
    </>
  );

  const whatsAppBody = (
      <>
        <Sidebar userData={user} />
        <Chat userData={user} /> 
      </>
    );
  const body = [!user._id ? LoginForm : whatsAppBody]
  return (
    <div className="app">
      <div className="app__body">
        {body}
      </div>
    </div>
  );
}

export default App;
