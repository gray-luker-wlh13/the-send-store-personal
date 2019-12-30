import React from 'react';
import './Scss/products.scss';
import axios from 'axios';
import {connect} from 'react-redux';

const Products = (props) => {
    let addToCart = (id, price) => {
        if(props.consumer.username){
            axios.post('/api/cart', {
                consumer_order_id: props.consumer.consumer_order_id,
                product_id: id,
                price
            }).then(res => {
                console.log(res)
            })
        }
    }

    let allProducts = props.products.map((e, i) => {
        return (
            <div className='products' key={i}>
                <img src={e.product_img} alt='product-img'/>
                <div className='product-info'>
                    <h3>{e.product_title}</h3>
                    <h4>${e.price}</h4>
                    <div id='product-condition'>
                        <label className='product-labels'>Condition:</label>{e.condition}
                    </div>
                    <label className='product-labels'>Description:</label>
                    <div id='product-description'>
                            {e.product_description}
                    </div>
                </div>
                <div id='add-button-container'>
                    <button id='add-to-cart'
                    onClick={() => addToCart(e.product_id, e.price)}>
                        Add To Cart
                    </button>
                </div>
            </div>
        )
    })

    return (
        <div className='products-container'>
            {allProducts}
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapStateToProps)(Products);