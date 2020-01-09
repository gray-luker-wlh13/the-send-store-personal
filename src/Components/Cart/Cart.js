import React from 'react';
import './Scss/cart.scss';
import Checkout from '../Checkout/Checkout';
import {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Slide from 'react-reveal/Slide';

const Cart = (props) => {
    const [cart, setCart] = useState([]);
    const [desClicked, setDesClicked] = useState(false);
    const [viewDescrip, setViewDescrip] = useState(0);

    useEffect(() => {
        // console.log('hit')
        // console.log(props.consumer.consumer.consumer_order_id);
        getCart()
        // console.log('hit twice')
    }, [cart.length])


    let getCart = () => {
        axios.get(`/api/cart/${props.consumer.consumer.consumer_order_id}`).then(res => {
            setCart(res.data);
        })
    }

    let removeOrder = (id) => {
        axios.delete(`/api/cart/${id}`).then(res => {
            return (
                getCart(res.data)
            )
        })
    }

    let seeMore = (product_id) => {
        setDesClicked(!desClicked)
        setViewDescrip(product_id)
    }

    let mappedCart = cart.sort((a, b) => a.product_id - b.product_id).map((e, i) => {
        return (
            <div className='cart' key={i}>
                <img src={e.product_img} alt='item-img'/>
                <div className='item-info'>
                    <div className='user-id'>
                        <img src={e.profile_img}/>
                        <h3>{e.username}</h3>
                    </div>
                    <h3>{e.product_title}</h3>
                    <h4>${e.price}</h4>
                    <div id='item-condition'>
                        <label className='item-labels'>Condition:</label>{e.condition}
                    </div>
                    <label className='item-labels'>Description:</label>
                    {desClicked && viewDescrip === e.product_id ? ( <>
                            <div id='product-description'>
                                {e.product_description}
                            </div>
                            <button onClick={() => seeMore(e.product_id)}>Read Less -</button>
                        </>
                    ) : (
                        <button onClick={() => seeMore(e.product_id)}>Read More +</button>
                    )}
                </div>
                <div id='remove-button-container'>
                    <button id='remove-from-cart'
                            onClick={() => removeOrder(e.order_item_id)}
                    >
                        Remove From Cart
                    </button>
                </div>
            </div>
        )
    })

    
    // console.log(cart)
    // console.log(props.consumer.consumer);
    return(
        <div className='cart-container'>
                {mappedCart[0] ? ( <>
                <Slide left delay={100} duration={1000}>
                    <div className='cart-items'>
                        {mappedCart}
                    </div>
                </Slide>
                <Slide right delay={100} duration={1000}>
                    <Checkout cart={cart} setCart={setCart}/>
                </Slide>
                </>
            ): (
                <Slide top delay={100} duration={1000}>
                    <div className='empty-cart'>
                        <h2>Your cart is currently empty, go to <Link to='/home'    id='home-link'>Home</Link> for products.</h2>
                    </div>
                </Slide>
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