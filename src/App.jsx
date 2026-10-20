
import { Routes, Route } from 'react-router'
import Home from './pages/home/Home.jsx'
import './App.css'
import Header from './components/header/Header.jsx'
import Schedule from './pages/schedule/Schedule.jsx'
import Houses from './pages/houses/Houses.jsx'
import Register from './pages/register/Register.jsx'
import Login from './pages/login/Login.jsx'
import GuestRoute from './components/guest-route/GuestRoute';
import HouseDetails from "./pages/house-details/HouseDetails";

import CleaningDetails from "./pages/cleaning-details/CleaningDetails";


function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/houses" element={<Houses />} />
        <Route path="/houses/:houseId" element={<HouseDetails />} />
        <Route path="/cleanings/:cleaningId" element={<CleaningDetails />}/>

        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

      </Routes>

    </>
  );
}

export default App
