import React ,{ useState, useEffect} from 'react';
import './App.css';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
// import { socket } from './socket';

const App =() => {
  const [user, setUser] = useState({});
  // const [isConnected, setIsConnected] = useState(socket.connected);
  // const [fooEvents, setFooEvents] = useState([]);
  // useEffect(() => {
  //   function onConnect() {
  //     setIsConnected(true);
  //   }

  //   function onDisconnect() {
  //     setIsConnected(false);
  //   }

  //   function onFooEvent(value) {
  //     setFooEvents(previous => [...previous, value]);
  //   }

  //   socket.on('connect', onConnect);
  //   socket.on('disconnect', onDisconnect);
  //   socket.on('foo', onFooEvent);

  //   return () => {
  //     socket.off('connect', onConnect);
  //     socket.off('disconnect', onDisconnect);
  //     socket.off('foo', onFooEvent);
  //   };
  // }, []);

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
