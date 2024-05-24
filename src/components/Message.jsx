import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Message = ({message}) => {

  const {currentUser} = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({behavior:"smooth"})
  }, [message]);

  console.log(message);
  return (
    <div ref = {ref} 
    className= {`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className="messageInfo d-flex flex-column text-secondary"> 
        <img 
          src={
            message.senderId === currentUser.uid 
            ? currentUser.photoURL 
            : data.user.photoURL
          } 
          alt="Profile Picture" className='rounded-5 object-fit-cover' width='40px' height='40px'
        />
        <span>just now</span>
      </div>
      <div className="messageContent d-flex flex-column w-100 gap-2 align-items-end">
        <p className='bg-info text-white rounded-3 py-2' style={{padding: "10px 20px", width: "auto"}}>{message.text}</p>
      {message.img && <img 
        src={message.img} 
        alt="Profile Picture" 
        width='200px' height='150px'
      />}
      </div>
    </div>
  )
}
export default Message