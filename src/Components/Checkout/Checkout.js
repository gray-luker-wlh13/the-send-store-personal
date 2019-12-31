import React from 'react';
import './Scss/checkout.scss';
import {Link} from 'react-router-dom';


const Checkout = () => {
   return (
        <div className='purchase-container'>
            <h2>Click the button below to checkout...</h2>
            <button>Checkout</button>
            <h3>Or</h3>
            <Link to='/home'>
                <button>Add More to Cart</button>
            </Link>
        </div>
    )
}


export default Checkout;