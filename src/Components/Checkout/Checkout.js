import React from 'react';
import './Scss/checkout.scss';
import {Link} from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';


const Checkout = (props) => {
    const onToken = (token) => {
        console.log(token)
        let {price} = props.cart.price
        // price /= 100
        console.log(price)
        token.card = void 0
        axios.post('/api/cart/checkout', {token, price: props.cart.price}).then(res => {
            console.log(res)
            alert(`Card has been charged $${price}`)
        })
    }

   return (
        <div className='purchase-container'>
            <h2>Click the button below to checkout...</h2>
            <StripeCheckout 
                name={props.cart.product_title}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
                token={onToken}
                billingAddress
                shippingAddress
                price={props.cart.price}
                allowRememberMe
            />
            <h3>Or</h3>
            <Link to='/home'>
                <button>Add More to Cart</button>
            </Link>
        </div>
    )
}


export default Checkout;