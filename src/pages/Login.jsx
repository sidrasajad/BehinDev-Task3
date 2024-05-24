import React, { useState } from 'react';
import {useNavigate, Link} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";


function Login() {
  
  const [err,setErr] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async(e) =>
  {
    e.preventDefault()
    const email = e.target[0].value;
    const password = e.target[1].value;

    try
    {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
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
            <span className='title text-muted fs-5 fw-bold'>Sign In</span>
            <form onSubmit={handleSubmit} className='d-flex flex-column gap-3 mt-3'>
                <input className='p-2 border-0 border-bottom border-2' type="email" placeholder='Email:'/>
                <input className='p-2 border-0 border-bottom border-2' type="password" placeholder='Password:'/>
                <button type="submit" className='btn btn-primary fw-bold mt-2'>Sign In</button>
                {err && <span style={{color: "red"}}>Error logging user</span>}
            </form>
            <p className='text-muted mt-2'>Not registered? Click<Link to="/register" className='fw-bold mx-2 text-decoration-none'>here</Link>to register</p>
        </div>
    </div>
  )
}

export default Login