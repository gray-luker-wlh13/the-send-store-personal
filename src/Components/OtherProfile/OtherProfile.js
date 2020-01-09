import React, {useState, useEffect} from 'react';
import './Scss/otherProfile.scss';
import axios from 'axios';
import {connect} from 'react-redux';

const OtherProfile = (props) => {
    const [user, setUser] = useState({});
    const [theirProducts, setTheirProducts] = useState([])
    const [desClicked, setDesClicked] = useState(false);
    const [viewDescrip, setViewDescrip] = useState(0);
    
    const {id} = props.match.params;

    useEffect(() => {
        getProfile(id);
    }, [theirProducts.length])
    
    let getProfile = (id) => {
        axios.get(`/api/otherprofile/${id}`).then(res => {
            setTheirProducts(res.data)
        })
    }

    let seeMore = (product_id) => {
        setDesClicked(!desClicked)
        setViewDescrip(product_id)
    }

    let consumerProducts = theirProducts.sort((a, b) => a.product_id - b.product_id).map((product, i) => {
        return (
            <div className='my-products' key={i}>
                <img src={product.product_img} alt='my-product-img'/>
                <div className='my-product-info'>
                    <div className='user-id'>
                        <img src={product.profile_img}/>
                        <h3>{product.username}</h3>
                    </div>
                    <h3>{product.product_title}</h3>
                    <h4>${product.price}</h4>
                    <div id='my-product-condition'>
                        <label className='my-product-labels'>Condition:</label>{product.condition}
                    </div>
                    <label className='my-product-labels'>Description:</label>
                    {desClicked && viewDescrip === product.product_id ? ( <>
                            <div id='product-description'>
                                {product.product_description}
                            </div>
                            <button id='read' onClick={() => seeMore(product.product_id)}>Read Less -</button>
                        </>
                    ) : (
                        <button id='read' onClick={() => seeMore(product.product_id)}>Read More +</button>
                    )}
                    <div className='buttons-container'>
                        <button>Add to Cart</button>
                    </div>
                </div>
            </div>
        )
    })

    console.clear()
    console.log(theirProducts)
    return (
        <div className='profile-container'>
            <div className='profile'>
                <img src={theirProducts[0].profile_img} alt='profile-img'/>
                <h3>{theirProducts[0].username}</h3>
                <div className='favorite-climb'>
                    <label>Favorite Climb:</label><div>{theirProducts[0].favorite_climb}</div>
                </div>
            </div>
            <div className='consumer-products-container'>
                <h1>{theirProducts[0].username}'s Products:</h1>
                <div className='consumer-products'>
                    {theirProducts[0] ? 
                    <>
                        {consumerProducts}
                    </> : (
                        <div className='empty-products'>
                            <h2>{theirProducts[0].username} has no Products!</h2> 
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return {
        products: reduxState.products
    }
}

export default connect(mapStateToProps)(OtherProfile);