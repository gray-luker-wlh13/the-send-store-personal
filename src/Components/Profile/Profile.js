import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './Scss/profile.scss';
import {connect} from 'react-redux';
import {logout} from '../../redux/reducers/getConsumerReducer';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Post from './Post/Post';

const Profile = (props) => {
    const [myProducts, setMyProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(false);
    const [editProfile, setEditProfile] = useState(false);
    const [newProduct, setNewProduct] = useState(false);

    const {consumer} = props.consumer;

    useEffect(() => {
        getMyProducts()
    }, [myProducts.length])


    let getMyProducts = () => {
        axios.get(`/api/products/${props.consumer.consumer.consumer_id}`).then(res => {
            setMyProducts(res.data)
        })
    }

    let deleteProduct = (id) => {
        axios.delete(`/api/products/${id}`).then(res => {
            return (
                getMyProducts(res.data)
            )
        })
    }


    let logout = async () => {
         await axios.post('/api/auth/logout').then(res => {
             console.log(res)
        })
        props.logout({})
        // console.log(consumer);
    }

    let consumerProducts = myProducts.map((product, i) => {
        return (
            <div className='my-products' key={i}>
                <img src={product.product_img} alt='my-product-img'/>
                <div className='my-product-info'>
                    <h3>{product.product_title}</h3>
                    <h4>${product.price}</h4>
                    <div id='my-product-condition'>
                        <label className='my-product-labels'>Condition:</label>{product.condition}
                    </div>
                    <label className='my-product-labels'>Description:</label>
                    <div id='my-product-description'>
                            {product.product_description}
                    </div>
                    <div className='buttons-container'>
                        <button onClick={() => setEditProduct(!editProduct)}>Edit</button>
                        <button onClick={() => deleteProduct(product.product_id)}>Delete</button>
                    </div>
                </div>
            </div>
        )
    })
    

   
    // console.clear();
    // console.log(consumer);
    return(
        <div className='profile-container'>
            {!newProduct ? (
                <div className='profile'>
                <img src={consumer.profile_img} alt='profile-img'/>
                <h3>{consumer.username}</h3>
                <div className='favorite-climb'>
                    <label>Favorite Climb:</label><div>{consumer.favorite_climb}</div>
                </div>
                <div className='buttons-container'>
                    <Link to='/'><button onClick={logout}>Log Out</button></Link>
                    <button onClick={() => setEditProfile(!editProfile)}>Edit Profile</button>
                </div>
            </div>
            ) : (
                <>
                <Post 
                    getFn={getMyProducts} 
                    myProducts={myProducts}
                    newProduct={newProduct}
                    setNewProduct={setNewProduct}    
                /> 
                </>
            )}
           
            <div className='consumer-products-container'>
                <h1>My Products:</h1>
                <div className='consumer-products'>
                    {myProducts[0] ? 
                        <>
                            {consumerProducts}
                        </> : (
                            <div className='empty-products'>
                                <h2>You have 0 Products!</h2> 
                            </div>
                        )}
                </div>
                <button onClick={() => setNewProduct(!newProduct)}>Create New Product</button>
            </div>
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return {
        consumer: reduxState.consumer,
        products: reduxState.products
    }
}

export default withRouter(connect(mapStateToProps, {logout})(Profile));