import React, { useEffect, useState } from 'react'
import { Avatar, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import MicIcon from '@mui/icons-material/Mic';
import ChatMessage from './ChatMessage.js';
import './Chat.css'
import axios from 'axios';
import URL from '../services/httpService';


const Chat = ( props) => {
  const [ messageList, setMessagesList ] = useState([]);
  
  useEffect(()=>{
    if(props.conversationID){
      axios.get(`${URL}/conversations/${props.conversationID}/sync-messages`,
      {headers: {'authorization':props.userData._id}})
      .then(result => {
        setMessagesList(result.data);
      }).catch(err => {
        console.log(err);
      });
    }
  },[props]);


  const sendMessage = (event) =>{
    event.preventDefault();
    const fd = new FormData(event.target);
    const data  = Object.fromEntries(fd.entries());
    setMessagesList( (old)=>{
      const timestamp = Date.now();
      const createdAt = new Date(timestamp).toISOString();
      return [...old,{
        'conversation_id':"bbfea4b1-d130-47a7-9af9-2f35be6ea805",
        "from": {
          "_id": props.userData.user_id._id,
          "firstName": props.userData.user_id.firstName,
          "lastName": props.userData.user_id.lastName,
          "phoneNumber": props.userData.user_id.phoneNumber
        },
        "message": data.message,
        "createdAt": createdAt
      }];
    })
    axios.post(`${URL}/conversations/${props.conversationID}/send-message`,data,
    {headers: {'authorization':props.userData._id},
    })
    .catch(err => {
      console.log(err);
    });
  }
  const chatRoom = <>
    {messageList.map((data) =>{
      return <ChatMessage
          userId={props.userData.user_id._id} 
          senderId={data.from._id}
          key={data._id}
          name={data.from.firstName+' '+data.from.lastName}
          message={data.message}
          timestamp={data.createdAt}
        />
    })}
  </>

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seen at...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {chatRoom}
      </div>
      <div className="chat__footer">
        <SentimentSatisfiedAltIcon />
        <form onSubmit={(event) => sendMessage(event)}>
          <input name="message" placeholder="Type a message" type="text" />
          <button type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  )
}

export default Chat
