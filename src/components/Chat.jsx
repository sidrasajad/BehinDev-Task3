import React, { useContext } from 'react'
import Cam from "../img/cam.png"
import Add from "../img/add.png"
import More from "../img/more.png"
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'

function Chat() {
  const { data } = useContext(ChatContext);
  return (
    <div className='chat col-8'>
      <div className="chatInfo d-flex bg-secondary align-items-center p-2">
        <span className='fs-5 '>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="" width='24px' height='24px' className='mx-2'/>
          <img src={Add} alt="" width='24px' height='24px' className='mx-2'/>
          <img src={More} alt="" width='24px' height='24px' className='mx-2'/>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat