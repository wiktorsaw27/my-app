import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import {ShoppingCart} from 'phosphor-react'
import './navbar.css'
import logo from '../Assets/iFirma-logo.webp'
import {ShopContext} from '../Context/ShopContext'


export const Navbar = () => {

  const [menu, setMenu] = useState('shop');
  const { getActuallItemAmount } = useContext(ShopContext);
  const actualAmount = getActuallItemAmount();

  return (
    <div className='navbar'>
      <img src={logo}/>
        <div className="links">
            <ul className='nav-menu'>
            <li onClick={()=>{setMenu('shop')}}><Link style={{textDecoration: 'none'}} to='/'> Sklep </Link>{menu==='shop'?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu('aboutUs')}}><Link style={{textDecoration: 'none'}} to='/onas'> O nas </Link>{menu==='aboutUs'?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu('contact')}}><Link style={{textDecoration: 'none'}} to='/blog'> Kontakt </Link>{menu==='contact'?<hr/>:<></>}</li>
            </ul>
            <div className="shopping-cart">
                <Link style={{textDecoration: 'none'}} to='/login'><button> Zaloguj </button></Link>
                <Link style={{textDecoration: 'none'}} to='/cart'>
                    <ShoppingCart className='cart-icon' size={33}/>
                </Link>
                <div className="nav-cart-count">{actualAmount}</div>
            </div>
        </div>
    </div>
  )
}
