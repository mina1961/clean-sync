
import { Routes, Route } from 'react-router'
import Home from './pages/home/Home.jsx'
import './App.css'
import Hero from './components/hero/Hero.jsx'
import Header from './components/header/Header.jsx'
import Schedule from './pages/schedule/Schedule.jsx'
import Houses from './pages/houses/Houses.jsx'

function App() {

  return (
    <>
    <Header />
   
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/houses" element={<Houses />} />
    </Routes>

    </>
  )
}

export default App
