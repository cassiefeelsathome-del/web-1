import { useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css';

function ChatMessages({chatMessages}) {
  const chatMesagesRef = useRef(null);

  useEffect(() =>{
    const containerElm = chatMesagesRef.current;
    if(containerElm){
      containerElm.scrollTop = containerElm.scrollHeight;
    }
  }, [chatMessages]);
  return(
    <div className="chat-messages-container"
    ref={chatMesagesRef}>
      {chatMessages.map((chatMessage) => {
        return(
          <ChatMessage 
          message = {chatMessage.message}
          sender = {chatMessage.sender} 
          key = {chatMessage.id}
          />
        );
      })}
    </div>
  ) 
}

export default ChatMessages;
