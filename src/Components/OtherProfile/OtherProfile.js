import React, {useState, useEffect} from 'react';
import './Scss/otherProfile.scss';
import axios from 'axios';
import {connect} from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const OtherProfile = (props) => {
    const [user, setUser] = useState([]);
    const [theirProducts, setTheirProducts] = useState([])
    const [desClicked, setDesClicked] = useState(false);
    const [viewDescrip, setViewDescrip] = useState(0);
    
    const {id} = props.match.params;
    const MySwal = withReactContent(Swal);
    const {username, consumer_order_id} = props.consumer.consumer;

    useEffect(() => {
        getProfile(id)
        getTheirProducts(id)
    }, [user.username, theirProducts.length])
    
    let getProfile = (id) => {
        axios.get(`/api/otherprofile/${id}`).then(res => {
            setUser(res.data)
        })
    }

    let getTheirProducts = (id) => {
        axios.get(`/api/products/${id}`).then(res => {
            setTheirProducts(res.data)
        })
    }

    let seeMore = (product_id) => {
        setDesClicked(!desClicked)
        setViewDescrip(product_id)
    }

    let addToCart = (product_id, price) => {
        if(username){
            axios.post('/api/cart', {
                consumer_order_id: consumer_order_id,
                product_id,
                price
            }).then(res => {
                // getProducts(res.data)
                    MySwal.fire({
                        icon: 'success',
                        title: 'Item successfully added!'
                    })
            })
        }                                 
    } 

    let userProducts = theirProducts.sort((a, b) => a.product_id - b.product_id).map((product, i) => {
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
                    <button id='add-to-cart'
                    onClick={() => addToCart(product.product_id, product.price)}>
                        Add To Cart
                    </button>
                    </div>
                </div>
            </div>
        )
    })

    let mappedUser = user.map((users, i) => {
        return (
            <div className='profile' key={i}>
                <img src={users.profile_img} alt='profile-img'/>
                <h3>{users.username}</h3>
                <div className='favorite-climb'>
                    <label>Favorite Climb:</label><div>{users.favorite_climb}</div>
                </div>
                <button id='go-back' onClick={() => props.history.goBack()}>Go Back</button>
            </div>
        )
    })

    let mappedUsernameProducts = user.map((users, i) => <h1 key={i}>{users.username}'s Products:</h1>)

    let mappedUsernameNo = user.map((user, i) => <h2 key={i}>{user.username} has no Products</h2>)

    // console.clear()
    // console.log(user)
    // console.log(theirProducts)
    return (
        <div className='profile-container'>
            {mappedUser}
            <div className='consumer-products-container'>
                {mappedUsernameProducts}
                <div className='consumer-products'>
                    {theirProducts[0] ? 
                    <>
                        {userProducts}
                    </> : (
                        <div className='empty-products'>
                            {mappedUsernameNo}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return {
        products: reduxState.products,
        consumer: reduxState.consumer
    }
}

export default connect(mapStateToProps)(OtherProfile);