import React, { useEffect, useState } from 'react'
import { Avatar, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import MicIcon from '@mui/icons-material/Mic';
import ChatMessage from './ChatMessage';
import './Chat.css'
import axios from 'axios';
import URL from '../services/httpService';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

const Chat = ( props) => {
  const conversationData = useSelector(state => state.app.conversationData);
  const userData = useSelector(state => state.app.userData);
  const [ messageList, setMessagesList ] = useState([]);
  
  useEffect(()=>{
    if( conversationData.conversationId){
      axios.get(`${URL}/conversations/${conversationData.conversationId}/sync-messages`,
      {headers: {'authorization': Cookies.get('token')}})
      .then(result => {
        setMessagesList(result.data);
      }).catch(err => {
        console.log(err);
      });
    }
  },[conversationData]);

  useEffect(()=> {
    if(props.socketMessage !== null){
      setMessagesList( (old)=>{
        return [...old, props.socketMessage];
      });
    }
  },[props.socketMessage]);

  const sendMessage = (event) =>{
    event.preventDefault();
    const fd = new FormData(event.target);
    const data  = Object.fromEntries(fd.entries());
    data.to = conversationData.toId;
    setMessagesList( (old)=>{
      const timestamp = Date.now();
      const createdAt = new Date(timestamp).toISOString();
      return [...old,{
        "conversation_id":"bbfea4b1-d130-47a7-9af9-2f35be6ea805",
        "from": {
          "_id": userData._id,
          "firstName": userData.firstName,
          "lastName": userData.lastName,
          "phoneNumber": userData.phoneNumber
        },
        "message": data.message,
        "createdAt": createdAt
      }];
    })
    axios.post(`${URL}/conversations/${conversationData.conversationId}/send-message`,data,
    {headers: {'authorization':Cookies.get('token')},
    })
    .catch(err => {
      console.log(err);
    });
  }
  const chatRoom = <>
    {messageList.map((data) =>{
      return <ChatMessage
          userId={userData._id} 
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
