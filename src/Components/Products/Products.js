import React from 'react';
import {useEffect} from 'react';
import './Scss/products.scss';
import axios from 'axios';
import {connect} from 'react-redux';
import {getProducts} from '../../redux/reducers/getProductsReducer';


const Products = (props) => {
    const {username, consumer_order_id} = props.consumer.consumer;

    useEffect(() => {
        getProducts();
    }, [props.products.length])

    let getProducts = () => {
        axios.get('/api/products').then(res => {
            props.getProducts(res.data)
        })
    }

    let addToCart = (product_id, price) => {
        if(username){
            axios.post('/api/cart', {
                consumer_order_id: consumer_order_id,
                product_id,
                price
            }).then(res => {
                console.log(res)
            })
        }                                 
    }     
    
    // console.log(props.products.products)
    const {products} = props.products;
    let allProducts = products.map((e, i) => {
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
    return {
        products: reduxState.products,
        consumer: reduxState.consumer
    };
}

export default connect(mapStateToProps, {getProducts})(Products);