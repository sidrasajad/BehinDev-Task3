import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import Add from "../img/avatar.jpg"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from 'firebase/firestore';
import {useNavigate, Link} from "react-router-dom";

function Register() {

  const [err,setErr] = useState(null);
  const navigate = useNavigate()

  const handleSubmit = async(e) =>
  {
    e.preventDefault()
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try
    {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      
      const storageRef = ref(storage, `${displayName}_${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          // setErr((error.message);
          setErr(true);
        },
        async () => {
          try 
          {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid),
            {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");

            console.log('User profile updated successfully');
          } 
          catch (err) 
          {
            console.error('Error updating profile:', err);
            // setErr(err.message);
          }
        }
      );
    }
    catch(err)
    {
      console.error('Error creating user:', err);
      // setErr(err.message);
      setErr(true);
    }      
  };

  return (
    <div className='formContainer bg-info d-flex align-items-center justify-content-center'>
        <div className='formWrapper bg-white px-5 py-4 rounded-3 d-flex flex-column gap-2 align-items-center'>
            <span className='logo text-muted fs-3 fw-bold'>Message Hub</span>
            <span className='title text-muted fs-5 fw-bold'>Sign Up</span>
            <form onSubmit={handleSubmit} className='d-flex flex-column gap-3'>
                <input className='p-2 border-0 border-bottom border-2' type="text" placeholder='Username:' />
                <input className='p-2 border-0 border-bottom border-2' type="email" placeholder='Email:' />
                <input className='p-2 border-0 border-bottom border-2' type="password" placeholder='Password:' />
                <input className='p-2' type="file" id='file' style={{display: "none"}}/>
                <label htmlFor="file">
                  <img src={Add} alt="Avatar" width={"40px"} height={"40px"}/>
                  <span className='text-muted m-3'>Add an avatar</span>
                </label>
                <button type="submit" className='btn btn-primary fw-bold mt-2'>Sign Up</button>
                {/* {err && <span style={{ color: 'red' }}>Error: {err}</span>} */}
                {err && <span style={{color: "red"}}>Error registering user</span>}
            </form>
            <p className='text-muted mt-2'>Already have an acccount?<Link to="/login" className='fw-bold mx-2 text-decoration-none'>LogIn</Link></p>
        </div>
    </div>
  )
}

export default Register