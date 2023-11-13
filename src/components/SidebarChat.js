import React from 'react'
import "./SidebarChat.css"
import { Avatar } from '@mui/material'

const SidebarChat = ( props) => {
  return (
    <div className="sidebarChat" onClick={()=>props.setCurrentConversation({conversationId: props.conversationId, toId: props.toId})}>
      <Avatar />
      <div className="sidebarChat__info">
        <h2>{props.contactName}</h2>
        <p>{props.lastMessage}</p>
      </div>
    </div>
  )
}

export default SidebarChat
