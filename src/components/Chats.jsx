import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';

function Chats() 
{

    const [chats, setChats] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });
    
            return() => {
                unsub();
            };
        };

        currentUser.uid && getChats();      
    }, [currentUser.uid]);

    const handleSelect = (u) => 
    {
        dispatch({type: "CHANGE_USER", payload: u });
    };

  return (
    <div className="chats">
        {
            Object.entries(chats)
            ?.sort((a, b) => b[1].date - a[1].date)
            // .map((chat) => (
            .map(([key, chat]) => 
            {
                const userInfo = chat?.userInfo;
                if (!userInfo) return null; // Skip rendering if userInfo is undefined
      
                const photoURL = userInfo.photoURL || 'defaultPhotoURL'; // Default value for photoURL
      
                return (       
                    <div className="userChat p-2 d-flex align-items-center gap-2 text-white" 
                        key={key} 
                        onClick={() => handleSelect(userInfo)}>
                        <img 
                            src={photoURL} 
                            alt="Picture" 
                            className='rounded-5 object-fit-cover' width='50px' height='50px'
                        />
                        <div className="userChatInfo mt-3">
                            <span className='fs-6 fw-bold'>{userInfo.displayName || 'Unknown User' }</span>
                            <p className='fs-6 text-gray'>{chat.lastMessage?.text || ' ' }</p>
                        </div>
                    </div>
                );
            })
        }
    </div>
  );
};

export default Chats
