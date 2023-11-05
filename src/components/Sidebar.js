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

const Sidebar = ( props) => {
  const [ conversations, setConversations ] = useState([]);
  useEffect(()=>{
    console.log(props.userData._id)
    axios.get(`${URL}/recent-conversations`,
    {headers: {'authorization':props.userData._id}})
    .then( (res) => {
      console.log(res.data);
      setConversations(res.data.conversations);
      props.setCurrentConversation(res.data.conversations[0].conversation_id);
    }).catch(err => {
      console.log(err);
    });
  },[props]);

  const conversationBar = <>
    {conversations.map( (conversation) =>{
        return (
          <SidebarChat 
            conversationId={conversation.conversation_id}
            avatar="no image"
            contactName="Walid"
            lastMessage="Yow Man"
            timestamp={conversation.timestamp}
            getCurrentConversation={props.setCurrentConversation}
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
          { conversations.length === 0 ? 'You dont have conversations' : conversationBar}
        </div>
    </div>
  )
}

export default Sidebar
