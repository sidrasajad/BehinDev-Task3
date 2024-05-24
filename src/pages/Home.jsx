import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'

function Home() {
    return (
        <div className='home bg-success d-flex align-items-center justify-content-center'>
            <div className='Container border border-white rounded-1 d-flex overflow-hidden'>
                <Sidebar />
                <Chat />    
            </div>
        </div>
    )
}

export default Home