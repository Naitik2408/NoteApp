import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Dashboard from './component/Dashboard';
import AddNote from './component/AddNote'
import ProfileInProfile from './component/ProfileInProfile';
import { useDispatch } from 'react-redux';
import { loadUserData } from './app/authSlice';
import Verify from './pages/Verify';


 

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(loadUserData());
  }, [dispatch]);

  // Rest of your component
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<Verify/>} />
        <Route path="/profile" element={<Profile />}>
          <Route path='/profile/' element={<Dashboard/>} />
          <Route path='/profile/addNote' element={<AddNote/>} />
          <Route path='/profile/myProfile' element={<ProfileInProfile/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;