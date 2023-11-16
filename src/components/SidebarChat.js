import React from 'react'
import "./SidebarChat.css"
import { Avatar } from '@mui/material'
import { useDispatch } from 'react-redux'
import { appActions } from '../store/redux'

const SidebarChat = ( props) => {
  const dispatch = useDispatch()
  const setCurrentConversation = (data)=>{
    dispatch(appActions.setConversationData(data))
  }
  return (
    <div className="sidebarChat" onClick={()=>setCurrentConversation({conversationId: props.conversationId, toId: props.toId})}>
      <Avatar />
      <div className="sidebarChat__info">
        <h2>{props.contactName}</h2>
        <p>{props.lastMessage}</p>
      </div>
    </div>
  )
}

export default SidebarChat
