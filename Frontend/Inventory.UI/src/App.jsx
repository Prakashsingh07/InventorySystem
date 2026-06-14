import { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import ProtectedRoute from './routes/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

function App() {

  return (
    <BrowserRouter>
    <Routes>

      <Route path='/' element={<Login/>}/>
      <Route path='/dashboard' element={
        <ProtectedRoute> <Dashboard/> </ProtectedRoute>
      }/>

      </Routes>
      </BrowserRouter>
  )
}

export default App
