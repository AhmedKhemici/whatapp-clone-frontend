import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar';
import Chat from './Chat'; 
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';

const WhatsappContent = () => {
  const [ socketMessage, setSocketMessage ] = useState(null);

  useEffect(()=>{
    const URL = process.env.NODE_ENV === 'production' ? undefined : 'ws://127.0.0.1:9000';
    const socket = io(URL,{
        query: {
            token: Cookies.get('token')
        }
    });
    socket.on("connection", (socket) => {
        console.log('Socket Connected'); 
    });
    socket.on('message_received', (socket)=>{
        if(socket !== null){
            console.log(socket);
            setSocketMessage({
                "conversation_id":socket._id,
                "from": {
                    "_id": socket.from._id,
                    "firstName": socket.from.firstName,
                    "lastName": socket.from.lastName,
                    "phoneNumber": socket.from.phoneNumber
                },
                "message": socket.message,
                "createdAt": socket.createdAt
            });
        }
    });
  },[])

  return (
    <>
      <Sidebar socketMessage={socketMessage}/>
      <Chat socketMessage={socketMessage}/>
    </>
  )
}

export default WhatsappContent
