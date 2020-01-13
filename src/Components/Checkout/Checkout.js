import React, {useState, useEffect} from 'react';
import './Scss/checkout.scss';
import {Link} from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const Checkout = (props) => {
    const [total, setTotal] = useState(0);
    const MySwal = withReactContent(Swal);

    let checkedCart = props.cart.map((item) => {
        let cost = 0
        return cost += +item.price
    }).reduce((acc, curr) => {
        return acc + curr
    }, 0)



    useEffect(() => {
        setTotal(checkedCart)
    }, [checkedCart.length])

    const onToken = (token) => {
        const {consumer} = props.consumer
        // console.log(token)
        let amount = total
        amount /= 100
        // console.log(amount);
        token.card = void 0
        axios.post(`/api/cart/checkout/${consumer.consumer_id}`, {token, amount: amount}).then(res => {
            // console.log(res)
            MySwal.fire({
                icon: 'success',
                title: 'Congrats...',
                text: 'Item has been purchased!',
                footer: 'Your reciept is in your email.'
            })
            setTotal(0)
            props.history.push('/home')
        })
    }

    // console.log(total);
    // console.log(props.consumer.consumer);
    // let checkOutCart = props.cart.map((e, i) => {e.price})
    console.log(total);
   return (
        <div className='purchase-container'>
            <h2>Click the button below to checkout...</h2>
            <StripeCheckout 
                name='Class'
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
                token={onToken}
                amount={total*100}
                allowRememberMe
            />
            <h3>Or</h3>
            <Link to='/home'>
                <button>Add More to Cart</button>
            </Link>
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return {
        consumer: reduxState.consumer
    }
}


export default withRouter(connect(mapStateToProps)(Checkout));