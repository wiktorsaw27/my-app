import React, { useContext, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Modal from 'react-modal';
import { ShopContext } from '../../Context/ShopContext';
import { CartItem } from './CartItem';
import { PRODUCTS } from '../../Products';

const stripePromise = loadStripe('pk_live_51PKU1WBkU57PHpMPCklH8ONun6fO6Dfh6PTBYUvW24uO0MZ6KcuqpAKiHRJxV3guVDW5a37ff0oGxLRp0QMVgiYH00u91cSihe');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const CheckoutForm = ({ cartItems, totalAmount, closeModal }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);
        setLoading(true);

        try {
<<<<<<< HEAD
            // Create a payment method
            const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
            });

            if (paymentMethodError) {
                setError(paymentMethodError.message);
=======
            // Wys³anie danych karty i zamówienia do backendu
            const response = await fetch('/api/stripe/process-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Referrer-Policy': 'no-referer-when-downgrade'
                },
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
            if (data.status !== 'success') {
                setError(data.status);
                // error response: {"status": "<error name (e.g. NOT FOUND)>", "message": "<error message>"}
>>>>>>> ea613dd76df33c52797e1f90d6ebb8d79b4a2aa2
                setLoading(false);
                return;
            }

<<<<<<< HEAD
            // Call the backend to create a payment intent
            const response = await fetch("/api/stripe/create-payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, cartItems, totalAmount }),
            });

            const { clientSecret, error: backendError } = await response.json();
            if (backendError) {
                setError(backendError);
=======
            if (data.status === 'success') {
                alert('Payment successful!');
>>>>>>> ea613dd76df33c52797e1f90d6ebb8d79b4a2aa2
                setLoading(false);
                return;
            }

            // Confirm the payment with the client secret
            const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
            });

            if (confirmError) {
                setError(confirmError.message);
                setLoading(false);
                setPaymentStatus('failed');
                return;
            }

            if (paymentIntent.status === 'succeeded') {
                setPaymentStatus('succeeded');

                await fetch('/api/stripe/payment-success', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, cartItems }),
                });

                setLoading(false);
                alert('Payment successful!');
                closeModal();
            }
        } catch (err) {
            setError(err.message);
            setLoading(false);
            setPaymentStatus('failed');
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
            {paymentStatus === 'succeeded' && <div>Payment was successful!</div>}
            {paymentStatus === 'failed' && <div>Payment failed. Please try again.</div>}
        </form>
    );
};

export const Cart = () => {
    const { cartItems, getTotalCartAmount } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

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
                    <button onClick={openModal}>Pay</button>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Payment Modal"
                    >
                        <h2>Enter Payment Details</h2>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm cartItems={cartItems} totalAmount={totalAmount} closeModal={closeModal} />
                        </Elements>
                    </Modal>
                </div>
            ) : (
                <h1>Your cart is empty</h1>
            )}
        </div>
    );
};
