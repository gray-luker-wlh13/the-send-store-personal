import React from 'react';
import './Scss/cart.scss';
import {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Cart = (props) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        console.log('hit')
        console.log(props.consumer.consumer.consumer_order_id);
        axios.get(`/api/cart/${props.consumer.consumer.consumer_order_id}`).then(res => {
            setCart(res.data);
        })
    }, [])

    let mappedCart = cart.map((e, i) => {
        return (
            <div className='cart' key={i}>
                {console.log(e)}
                <img src={e.product_img} alt='item-img'/>
                <div className='item-info'>
                    <h3>{e.product_title}</h3>
                    <h4>${e.price}</h4>
                    <div id='item-condition'>
                        <label className='item-labels'>Condition:</label>{e.condition}
                    </div>
                    <label className='item-labels'>Description:</label>
                    <div id='item-description'>
                        {e.product_description}
                    </div>
                </div>
                <div id='remove-button-container'>
                    <button id='remove-from-cart'>
                        Remove From Cart
                    </button>
                </div>
            </div>
        )
    })

    
    return(
        <div className='cart-container'>
            {mappedCart[0] ? (
                mappedCart
            ): (
                <div className='empty-cart'>
                    <h2>Your cart is currently empty, go to <Link to='/home' id='home-link'>Home</Link> for products.</h2>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return {
        products: reduxState.products,
        consumer: reduxState.consumer
    }
}

export default connect(mapStateToProps)(Cart);