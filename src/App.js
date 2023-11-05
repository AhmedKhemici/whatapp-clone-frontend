import React ,{ useState} from 'react';
import './App.css';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';

const App =() => {
  const [user, setUser] = useState({});
  const [conversationId, setConversationId] = useState('');
  const login = (data) => {
    setUser(data);
  }
  const setCurrentConversation = ( conversation_id) =>{
    if(conversation_id) setConversationId(conversation_id);
  }
  const LoginForm = (
    <>
      <Login login={login} />
    </>
  );

  const whatsAppBody = (
      <>
        <Sidebar userData={user} setCurrentConversation={setCurrentConversation} />
        <Chat userData={user} conversationID={conversationId} /> 
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
