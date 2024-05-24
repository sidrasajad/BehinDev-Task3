import { arrayUnion, updateDoc, doc, Timestamp, serverTimestamp } from 'firebase/firestore';
import React, { useContext } from 'react'
import { useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import Attach from "../img/attach.png"
import Image from "../img/image.png"
import { db, storage } from '../firebase';
import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

function Input() {
  const [ text, setText] = useState("");
  const [ img, setImg] = useState(null);

  const {currentUser} = useContext(AuthContext);
  const { data } = useContext(ChatContext); 

  const handleSend = async () => {
    if(img)
    {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        // 'state_changed',
        // null,
        (error) => {
          // setErr((error.message);
          // setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db,"chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img:downloadURL,
              }),
            });
          });
        }
      );
    }
    else
    {
      await updateDoc(doc(db,"chats", data.chatId),{
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid),{
      [data.chatId + ".lastMessage"] : {
        text,
      },
      [data.chatId + ".date"] : serverTimestamp()
    });

    await updateDoc(doc(db, "userChats", data.user.uid),{
      [data.chatId + ".lastMessage"] : {
        text,
      },
      [data.chatId + ".date"] : serverTimestamp()
    });

    setText("")
    setImg(null)
  };

  return (
    <div className='input bg-white p-2 d-flex align-items-center'>
      <input 
      type="text" 
      placeholder='Type something...' 
      onChange={e => setText(e.target.value)} 
      className='fs-5 border-0 w-75'
      value={text}
      />
      <div className="send d-flex align-items-center gap-1" style={{cursor: "pointer"}}>
        <img src={Attach} alt="" width={"20px"} height={"20px"}/>
        <input type="file" id="file" className='fs-5 border-0 w-75' style={{display: "none"}} onChange={e=>setImg(e.target.files[0])} />
        <label htmlFor="file">
          <img src={Image} alt="" width={"30px"} height={"30px"}/>
        </label>
        <button onClick={handleSend} className='btn btn-success'>Send</button>
      </div>
    </div>
  )
}

export default Input