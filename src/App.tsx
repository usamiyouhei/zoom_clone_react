
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Meeting from './pages/Meeting'
import Settings from './pages/Settings'
import { useState, useEffect } from 'react'
import { authRepository } from './modules/auth/auth.repository'
import { useSetAtom } from 'jotai'
import { currentUserAtom } from './modules/auth/current-user.state'
import AuthGuard from './components/AuthGuard'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const setCurrentUser = useSetAtom(currentUserAtom);

  useEffect(() => {
    fetchCurrentUser();
  }, [])


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

  if(isLoading) return <div/>;

  return <BrowserRouter>
  <Routes>
    <Route path='/login' element={<Login />}/>
    <Route path='/signup' element={<Signup />}/>
    <Route path='/' element={<AuthGuard />}>
      <Route index element={<Home />}/>
      <Route path='/meetings/:id' element={<Meeting />}/>
      <Route path='/settings' element={<Settings />}/>
    </Route>
  </Routes>
  </BrowserRouter>

}

export default App
