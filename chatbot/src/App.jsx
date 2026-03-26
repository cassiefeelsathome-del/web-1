import { useState, useRef, useEffect } from 'react'
import './App.css'
import { Chatbot } from 'supersimpledev';

function ChatInput({chatMessages, setChatMessages}){
  const [inputText, setInputText] = useState('');

  function saveInputText(event){
    setInputText(event.target.value);
    

  }

  function sendMessage(){
    const newChatMessages = [
        ...chatMessages,
        {
          message: inputText,
          sender: 'User',
          id: crypto.randomUUID()

        }
    ]

      setChatMessages(newChatMessages);

    const response = Chatbot.getResponse(inputText);
    setChatMessages([
        ...newChatMessages,
        {
          message: response,
          sender: 'ChatBot',
          id: crypto.randomUUID()

        }
    ]);
    
    setInputText('');        
  }

  return(
    <div className="chat-input-container">
      <input 
        placeholder="Send a message..." 
        size = "50"
        onChange={saveInputText}
        value = {inputText}
        className = "chat-textbox"
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            sendMessage();
          }
        }}
      />
      <button
        onClick = {sendMessage}
        className = 'send-button'
      >Send</button>
    </div>
  );
};

function ChatMessage({message, sender}){

  
  return(
    <div className={
      sender === 'User' 
      ? 'chat-message-user' 
      : 'chat-message-chatbot'
    }>
      {sender === 'ChatBot' &&  (
        <img className ="chat-message-profile" src ="https://i.pinimg.com/originals/ff/65/de/ff65def7e836801cf919bbe03e0c3dce.png"/>
      )}
      <div className= "chat-message-text">
        {message}
      </div>
      {sender === 'User' && (
        <img className ="chat-message-profile" src ="https://fivepointsdentalnj.com/wp-content/uploads/2015/11/anonymous-user.png" />
        )}
    </div>

  )
};

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

function App() {
         const [chatMessages, setChatMessages] = useState([]);
        // above is const [chatMessages, setChatMessages] = array;
        
        return (
          <div className="app-container">
            <ChatMessages 
              chatMessages ={chatMessages}
            />            

            <ChatInput 
              chatMessages ={chatMessages}
              setChatMessages = {setChatMessages}
            />

          </div>
        );
      }

export default App
