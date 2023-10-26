import React from 'react';
import './ChatMessage.css';

const ChatMessage = ( props) => {
  const chatMessage = 'chat__message ' + [props.type ? 'chat__receiver' : '']
  return (
    <p className={chatMessage}>
      <span className="chat__name">{props.name}</span>
      {props.message}
       <span className="chat__timestamp">
         {props.timestamp}
       </span>
    </p>
  )
}

export default ChatMessage
