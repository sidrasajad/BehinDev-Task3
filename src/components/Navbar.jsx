import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
// import Profile from './Profile'

function Navbar() {

  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar bg-dark d-flex align-items-center p-2 text-white'>
      <span className="logo fw-bold">Message Hub</span>
      <div className="user d-flex align-items-center gap-1">
        <img src={currentUser.photoURL} alt="Profile Picture" className='rounded-5 object-fit-cover' width='24px' height='24px'/>
        <span>{currentUser.displayName}</span>
        {/* <Profile /> */}
        <button onClick={()=>signOut(auth)} className='bg-secondary text-white border-0 rounded-1 p-1 px-2'>LogOut</button>
      </div>
    </div>
  )
}

export default Navbar