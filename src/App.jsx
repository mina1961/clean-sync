
import { Routes, Route } from 'react-router'
import Home from './pages/home/Home.jsx'
import './App.css'
import Header from './components/header/Header.jsx'
import Schedule from './pages/schedule/Schedule.jsx'
import Houses from './pages/houses/Houses.jsx'
import Register from './pages/register/Register.jsx'
import Login from './pages/login/Login.jsx'
import ProtectedRoute from './components/protected-route/ProtectedRoute';
import Dashboard from './pages/dashboard/CleaningDashboard.jsx';
import GuestRoute from './components/guest-route/GuestRoute';


function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/houses" element={<Houses />} />

        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>

    </>
  );
}

export default App
