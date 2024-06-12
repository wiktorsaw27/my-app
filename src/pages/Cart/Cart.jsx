import React, { useContext, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ShopContext } from '../../Context/ShopContext';
import { CartItem } from './CartItem';
import { PRODUCTS } from '../../Products';

const stripePromise = loadStripe('your-publishable-key-here');

const CheckoutForm = ({ cartItems, totalAmount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);
        setLoading(true);

        try {
            // Wys³anie danych karty i zamówienia do backendu
            const response = await fetch('/api/stripe/process-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    email,
                    cartItems,
                    card: {
                        number: cardElement.value.cardNumber,
                        exp_month: cardElement.value.expMonth,
                        exp_year: cardElement.value.expYear,
                        cvc: cardElement.value.cvc
                    }
                }),
            });

            const data = await response.json();
            if (data.error) {
                setError(data.error);
                setLoading(false);
                return;
            }

            if (data.paymentIntentStatus === 'succeeded') {
                alert('Payment successful!');
                setLoading(false);
            }
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <CardElement />
            {error && <div>{error}</div>}
            <button type="submit" disabled={!stripe || loading}>
                Pay {totalAmount} USD
            </button>
        </form>
    );
};

export const Cart = () => {
    const { cartItems, getTotalCartAmount } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();

    return (
        <div className='cart'>
            <div>
                <h1>Your Cart</h1>
            </div>
            <div className="cart-items">
                {Object.keys(cartItems).map(key => (
                    cartItems[key] > 0 && (
                        <CartItem key={key} data={PRODUCTS.find(p => p.id === Number(key))} />
                    )
                ))}
            </div>
            {totalAmount > 0 ? (
                <div className="checkOut">
                    <p>Total: {totalAmount} USD</p>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm cartItems={cartItems} totalAmount={totalAmount} />
                    </Elements>
                </div>
            ) : (
                <h1>Your cart is empty</h1>
            )}
        </div>
    );
};
