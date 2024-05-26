import React, { useContext } from 'react';
import './Cart.css';
import { PRODUCTS } from '../../Products';
import { ShopContext } from '../../Context/ShopContext';
import { CartItem } from './CartItem';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
    const { cartItems, getTotalCartAmount } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();
    const navigate = useNavigate();

    const makePayment = () => {
        // Replace with your actual Stripe payment link
        const paymentLink = 'https://buy.stripe.com/test_cN2dRb1XrcNfcHmcMM';
        window.location.href = paymentLink;
    };

    return (
        <div className='cart'>
            <div>
                <h1>Twój Koszyk</h1>
            </div>
            <div className="cart-items">
                {PRODUCTS.map((product) => {
                    if (cartItems[product.id] !== 0) {
                        return <CartItem key={product.id} data={product} />;
                    }
                })}
            </div>
            {totalAmount > 0 ? (
                <div className="checkOut">
                    <p>Total: {totalAmount} zł</p>
                    <button onClick={() => navigate('/')}>Kontynuuj zakupy</button>
                    <button onClick={makePayment}>Zapłać</button>
                </div>
            ) : (
                <h1>Twój koszyk jest pusty</h1>
            )}
        </div>
    );
};
