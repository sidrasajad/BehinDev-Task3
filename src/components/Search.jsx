import React, { useState, useContext } from 'react';
import { collection, query, where, getDocs, setDoc, updateDoc, serverTimestamp, getDoc, doc } from "firebase/firestore";
import {db} from "../firebase"
import { AuthContext } from '../context/AuthContext';

function Search() {

  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const {currentUser} = useContext(AuthContext)

  const handleSearch = async() => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
      );

      try 
      {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      }
      catch(err)
      {
        setErr(true);
      }

  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async() =>
  {
    // check weather the group(chats in firestore) exists, if not created
    const combinedId = 
    currentUser.uid > user.uid 
    ? currentUser.uid + user.uid 
    : user.uid + currentUser.uid;

    try
    {
      const res = await getDoc(doc(db, "chats", combinedId));

      if(!res.exists())
      {
        //create a chat in chat collection
        await setDoc(doc(db, "chats", combinedId),
        { 
          messages: [] 
        });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid),{
          [combinedId+".userInfo"]: {
            uid:user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId+".date"]: serverTimestamp()
        });

        //create user chats
        await updateDoc(doc(db, "userChats", user.uid),{
          [combinedId+".userInfo"]: {
            uid:currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId+".date"]: serverTimestamp()
        });

      }
    }
    catch(err) {}

    setUser(null);
    setUsername("")

  };

  return (
    <div className="search  border-bottom border-secondary ">
      <div className="searchForm p-2">
        <input type="text" name="" id="" placeholder='Search' 
          onKeyDown={handleKey} 
          // oninput={handleSearch()}
          onChange={(e) => setUsername(e.target.value)} 
          value = {username}
          className='bg-transparent border-0 text-white outline-none'
        />
      </div>
      {err && <span>User not founs!</span>}
      {user && <div  onClick={handleSelect} className="userChat p-2 d-flex align-items-center gap-2 text-white">
        <img src={user.photoURL} 
        alt="Picture"
        className='rounded-5 object-fit-cover' width='50px' height='50px'/>
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search