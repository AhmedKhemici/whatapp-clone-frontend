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



const Chat = () => {
  const [ messageList, setMessagesList ] = useState([]);
  
  useEffect(()=>{
    axios.get('http://127.0.0.1:9000/api/v1/messages/sync').then(result => {
      console.log(`Messages Returned`);
      console.log(result);
      setMessagesList(result.data);
    }).catch(err => {
      console.log(err);
    });
  },[]);

  const chatRoom = <>
                {messageList.map((data) =>{
                  return <ChatMessage 
                      key={data._id}
                      name={data.name}
                      received={data.received}
                      message={data.message}
                      timestamp={data.timestamp}
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
        <form>
          <input placeholder="Type a message" type="text" />
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
