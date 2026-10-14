
import { Routes, Route } from 'react-router'
import Home from './pages/home/Home.jsx'
import './App.css'
import Header from './components/header/Header.jsx'
import Schedule from './pages/schedule/Schedule.jsx'
import Houses from './pages/houses/Houses.jsx'
import Register from './pages/register/Register.jsx'
import Login from './pages/login/Login.jsx'


function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/houses" element={<Houses />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </>
  )
}

export default App
