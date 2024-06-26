import React, { useContext } from 'react'
import './Cart.css'
import {ShopContext} from '../../Context/ShopContext'

export const CartItem = (props) => {

    const {id, productName, price, productImage} = props.data;
    const { cartItems, addToCart, removeFormCart, updateCartItemCount} = useContext(ShopContext);

  return (
    <div className='cart-item'>
        <img src={productImage}/>
        <div className="description">
            <p><b>{productName}</b></p>
            <p>{price} zł</p>
            <div className="count-handler">
                <button onClick={() => removeFormCart(id)}> - </button>
                <input value={cartItems[id]} onChange={(e) => updateCartItemCount(Number(e.target.value), id)}/>
                <button onClick={() => addToCart(id)}> + </button>
            </div>
        </div>
    </div>
  )
}
