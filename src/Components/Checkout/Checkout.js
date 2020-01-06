import React, {useState, useEffect} from 'react';
import './Scss/checkout.scss';
import {Link} from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';


const Checkout = (props) => {
    const [total, setTotal] = useState(0);

    let checkedCart = props.cart.map((item) => {
        return +item.price
    })

    // useEffect(() => {
    //     setTotal(checkedCart)
    // }, [checkedCart.length])

    const onToken = (token) => {
        console.log(token)
        let amount = total[0]
        // amount /= 100
        console.log(amount);
        token.card = void 0
        axios.post('/api/cart/checkout', {token, amount: {total}}).then(res => {
            console.log(res)
            alert(`Card has been charged $${amount}`)
        })
    }

    console.log(total[0]);
    // let checkOutCart = props.cart.map((e, i) => {e.price})
   return (
        <div className='purchase-container'>
            <h2>Click the button below to checkout...</h2>
            <StripeCheckout 
                name='Class'
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
                token={onToken}
                amount={total[0]*100}
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