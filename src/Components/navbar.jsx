import React, { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {ShoppingCart} from 'phosphor-react'
import './navbar.css'
import logo from '../Assets/iFirma-logo.webp'
import {ShopContext} from '../Context/ShopContext'
import nav_burger from '../Assets/menu.png'


export const Navbar = () => {

  const [menu, setMenu] = useState('shop');
  const { getActuallItemAmount } = useContext(ShopContext);
  const actualAmount = getActuallItemAmount();
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }

  return (
    <div className='navbar'>
      <Link onClick={()=>{setMenu('shop')}} to='/'><img src={logo}/></Link>
        <div className="links">
          <img className='burger' onClick={dropdown_toggle} src={nav_burger} alt="" />
            <ul ref={menuRef} className='nav-menu'>
            <li onClick={()=>{setMenu('shop')}}><Link style={{textDecoration: 'none'}} to='/'> Sklep </Link>{menu==='shop'?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu('aboutUs')}}><Link style={{textDecoration: 'none'}} to='/onas'> O nas </Link>{menu==='aboutUs'?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu('contact')}}><Link style={{textDecoration: 'none'}} to='/blog'> Kontakt </Link>{menu==='contact'?<hr/>:<></>}</li>
            </ul>
            <ul ref={menuRef} className='sidebar'>
            <li onClick={dropdown_toggle}><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></li>  
            <li onClick={()=>{setMenu('shop')}}><Link style={{textDecoration: 'none'}} to='/'> Sklep </Link>{menu==='shop'?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu('aboutUs')}}><Link style={{textDecoration: 'none'}} to='/onas'> O nas </Link>{menu==='aboutUs'?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu('contact')}}><Link style={{textDecoration: 'none'}} to='/blog'> Kontakt </Link>{menu==='contact'?<hr/>:<></>}</li>
            </ul>
            <div className="shopping-cart">
                <Link style={{textDecoration: 'none'}} to='/login'><button onClick={()=>{setMenu('log')}}> Zaloguj </button></Link>{menu==='log'?<></>:<></>}
                <Link style={{textDecoration: 'none'}} to='/cart' onClick={()=>{setMenu('crt')}}>
                    <ShoppingCart className='cart-icon' size={33} />
                </Link>
                <div className="nav-cart-count">{actualAmount}</div>
            </div>{menu==='crt'?<></>:<></>}
        </div>
    </div>
  )
}
