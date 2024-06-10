import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom"
import React from 'react'
import {Navbar} from './Components/navbar';
import { Shop } from './pages/Shop/Shop';
import { Cart } from './pages/Cart/Cart';
import { ShopContextProvider } from './Context/ShopContext';
import { Footer } from './Components/Footer';
import { Login } from './pages/LoginSignup/Login';
import VerifyRegistrationPage from './pages/LoginSignup/VerifyRegistrationPage';


const App = () => {
  return (
    <div className='App'>
      <ShopContextProvider>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Shop/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path="/verify-registration" element={<VerifyRegistrationPage/>}/>
          </Routes>
          <Footer/>
        </BrowserRouter>
      </ShopContextProvider>
    </div>
  )
}

export default App

