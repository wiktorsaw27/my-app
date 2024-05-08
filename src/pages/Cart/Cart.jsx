import React, { useContext } from 'react'
import './Cart.css'
import { PRODUCTS } from '../../Products'
import {ShopContext} from '../../Context/ShopContext'
import { CartItem } from './CartItem'
import {useNavigate} from 'react-router-dom'

export const Cart = () => {

    const { cartItems, getTotalCartAmount } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();
    const navigate = useNavigate()

  return (
    <div className='cart'>
        <div>
            <h1>Twój Koszyka</h1>
        </div>
        <div className="cart-items">
            {PRODUCTS.map((product) => {
                if (cartItems[product.id] !== 0){
                    return <CartItem data={product} />
                }
            })}
        </div>
        {totalAmount > 0 ? (
        <div className="checkOut">
            <p>Total: {totalAmount} zł</p>
            <button onClick={() => navigate('/')}>Kontynuuj zakupy</button>
            <button>Zapłać</button>
        </div>
        ) : (
            <h1>Twój koszyk jest pusty</h1>
        )}
    </div>
  )
}
