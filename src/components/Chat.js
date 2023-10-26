import React from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import MicIcon from '@mui/icons-material/Mic';
import ChatMessage from './ChatMessage.js';

const Chat = () => {
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
        <ChatMessage 
          name='Solid Snake'
          message='Kept you waiting huh?!'
          timestamp={new Date().toUTCString()}
        />
        <ChatMessage 
          type='receiver'
          name='Big Boss'
          message='hi thats my line !'
          timestamp={new Date().toUTCString()}
        />
        <ChatMessage 
          name='Solid Snake'
          message='MGS1 Was the first game not MGS3'
          timestamp={new Date().toUTCString()}
        />
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
