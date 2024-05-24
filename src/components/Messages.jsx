import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { ChatContext } from '../context/ChatContext';
import Message from './Message';
import { db } from '../firebase';

function Messages() {

  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })

    return () => {
      unSub()
    }
  }, [data.chatId])

  console.log(messages);
  return (
    <div className='messages p-2'>
      {messages.map(m=>(
        <Message message = {m} key={m.id}/>
      ))}
    </div>
  );
};

export default Messages
