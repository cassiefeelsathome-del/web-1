import { useState } from 'react'
import { Chatbot } from 'supersimpledev';
import './ChatInput.css';


export function ChatInput({chatMessages, setChatMessages}){
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