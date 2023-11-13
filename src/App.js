import React ,{ useState} from 'react';
import './App.css';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';

const App =() => {
  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  const [user, setUser] = useState(userData);
  const conData = JSON.parse(localStorage.getItem('conversationData')) || {};
  const [conversationData, setConversationData] = useState(conData);
  
  const login = (data) => {
    setUser(data);
  }
  const setCurrentConversation = ( conversationData) =>{
    if(conversationData){
      localStorage.setItem('conversationData', JSON.stringify(conversationData));
      setConversationData(conversationData);
    }
  }
  const LoginForm = (
    <>
      <Login login={login} />
    </>
  );

  const whatsAppBody = (
      <>
        <Sidebar userData={user} setCurrentConversation={setCurrentConversation} />
        <Chat userData={user} conversationData={conversationData} /> 
      </>
    );
  return (
    <div className="app">
      <div className="app__body">
        {!user._id ? LoginForm : whatsAppBody}
      </div>
    </div>
  );
}

export default App;
