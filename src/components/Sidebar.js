import React, { useState, useEffect} from 'react'
import './Sidebar.css'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, IconButton } from '@mui/material';
import SidebarChat from './SidebarChat';
import axios from 'axios';
import URL from '../services/httpService';
import Cookies from 'js-cookie';

const Sidebar = () => {
  const [ conversations, setConversations ] = useState([]);
  useEffect(()=>{
    axios.get(`${URL}/recent-conversations`,
    {headers: {'authorization': Cookies.get('token')}})
    .then( (res) => {
      setConversations(res.data.conversations);
    }).catch(err => {
      console.log(err);
    });
  },[]);

  const conversationBar = <>
    {conversations.map( (conversation) =>{
        return (
          <SidebarChat 
            key={conversation._id}
            conversationId={conversation.conversation_id}
            toId={conversation.users[0].user_id._id}
            avatar="no image"
            contactName={conversation.users[0].user_id.firstName+' '+conversation.users[0].user_id.lastName}
            lastMessage={conversation.message.message}
            timestamp={conversation.message.createdAt}
          />
        )}
    )}
  </>

  return (
    <div className="sidebar">
        <div className="sidebar__header">
          <Avatar />
          <div className="sidebar__headerRight">
            <IconButton>
              <DonutLargeIcon />
            </IconButton>
            <IconButton>
              <ChatIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
        <div className="sidebar__search">
          <div className="sidebar__searchContainer">
            <SearchIcon />
            <input type="text" placeholder='Search or start new chat' />
          </div>
        </div>
        <div className="sidebar__chats">
          { conversations.length === 0 && 'You don\'t have conversations'}
          { conversations.length !== 0 && conversationBar }
        </div>
    </div>
  )
}

export default Sidebar
