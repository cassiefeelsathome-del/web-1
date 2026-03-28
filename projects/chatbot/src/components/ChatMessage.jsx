import UserImage from '../assets/user.webp';
import ChatBotImage from '../assets/chatbot.png';
import './ChatMessage.css';

export function ChatMessage({message, sender}){

  
  return(
    <div className={
      sender === 'User' 
      ? 'chat-message-user' 
      : 'chat-message-chatbot'
    }>
      {sender === 'ChatBot' &&  (
        <img className ="chat-message-profile" src ={ChatBotImage}/>
      )}
      <div className= "chat-message-text">
        {message}
      </div>
      {sender === 'User' && (
        <img className ="chat-message-profile" src = {UserImage} />
        )}
    </div>

  )
};