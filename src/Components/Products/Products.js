import React from 'react';
import './Scss/products.scss';

const Products = (props) => {
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
                    <button id='add-to-cart'>Add To Cart</button>
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

export default Products;