import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Footer from './components/Footer';
import GuidesArticles from './components/pages/GuidesArticles';
import Help from './components/pages/Help';
import LoginSignup from './components/pages/LoginSignup';
import MainSearch from './components/pages/MainSearch';
import Profile from './components/pages/Profile';



function App() {
  return (
    <><Router>
      <Navbar />
      <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/GuidesArticles" element={<GuidesArticles/>}/>
       <Route path="/Help" element={<Help/>}/>
       <Route path="/sign-up" element={<LoginSignup/>}/>

       <Route path ="/search" element={<MainSearch/>}/>
       <Route path ="/profile" element={<Profile/>}/>
      </Routes>
      <Footer/>
      </Router>
      
      </>
  );
}

export default App;
