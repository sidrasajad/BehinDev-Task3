import React, { useRef, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Message = ({message}) => {

  const {currentUser} = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({behavior:"smooth"})
  }, [message]);

  // console.log(message);
  return (
    <div ref = {ref} 
    className= {`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className="messageInfo"> 
        <img 
          src={
            message.senderId === currentUser.uid 
            ? currentUser.photoURL 
            : data.user.photoURL
          } 
          alt="Profile Picture" width='40px' height='40px'
        />
        <span>Just now</span>
      </div>
      <div className="messageContent">
        <p className=''>{message.text}</p>
      {message.img && <img 
        src={message.img} 
        alt="Profile Picture" 
      />}
      </div>
    </div>
  )
}
export default Message