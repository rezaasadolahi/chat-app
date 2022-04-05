import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// Components
import MainForm from './Components/MainForm'
import ChatRoom from './Components/ChatRoom'




function App() {
  return (
    <div className='bg-light text-dark d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
      <BrowserRouter>
        <Routes>
          <Route index element={<MainForm />} />
          <Route path='/chat/:roomName' element={<ChatRoom />} />
          <Route path='*' element={<h1>404 not found !</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App