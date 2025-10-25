
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Meeting from './pages/Meeting'
import Settings from './pages/Settings'
import { useState } from 'react'
import { authRepository } from './modules/auth/auth.repository'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const setCurrentUser = useSetAtom(currentUserAtom);

  const fetchCurrentUser = async() => {
    try {
      const user = await authRepository.getCurrentUser();
      setCurrentUser(user)
    } catch (error) {
      console.log(error);
      
    }finally{
      setIsLoading(false)
    }
  }

  return <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/login' element={<Login />}/>
    <Route path='/signup' element={<Signup />}/>
    <Route path='/meetings/:id' element={<Meeting />}/>
    <Route path='/settings' element={<Settings />}/>
  </Routes>
  </BrowserRouter>

}

export default App
