import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './Scss/profile.scss';
import useToggle from '../../hooks/useToggle';
import {connect} from 'react-redux';
import {logout, getConsumer} from '../../redux/reducers/getConsumerReducer';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Post from './Post/Post';
import Flip from 'react-reveal/Flip';
import {v4 as randomString} from 'uuid';
import Dropzone from 'react-dropzone';

const Profile = (props) => {
    const [myProducts, setMyProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(false);
    const [newProduct, setNewProduct] = useState(false);
    const [editItem, setEditItem] = useState({});
    // const [editProfile, setEditProfile] = useState(false);
    const [profileImg, setProfileImg] = useState('');
    const [favoriteClimb, setFavClimb] = useState('');
    const [desClicked, setDesClicked] = useState(false);
    const [viewDescrip, setViewDescrip] = useState(0);

    const [editProfile, toggleEditProfile] = useToggle(false);


    // this.state = {myProducts: []}

    const {consumer} = props.consumer;

    useEffect(() => {
        getMyProducts(consumer.consumer_id)
    }, [myProducts.length])

    useEffect(() => {
        setProfileImg(consumer.profile_img)
        setFavClimb(consumer.favorite_climb)
    }, [consumer.profile_img, consumer.favorite_climb])
    


    let getMyProducts = (id) => {
        axios.get(`/api/products/${id}`).then(res => {
            setMyProducts(res.data)
        })
    }

    let deleteProduct = (id) => {
        axios.delete(`/api/products/${id}`).then(res => {
            return (
                getMyProducts(consumer.consumer_id)
            )
        })
    }

    let updateItem = (product_id, body) => {
        axios.put(`/api/products/${product_id}`, body).then(res => {
            return (
                getMyProducts(consumer.consumer_id)
            )
        })
    }

    let updateProfile = (id, body) => {
        axios.put(`/api/profile/${id}`, body).then(res => {
            props.getConsumer(res.data[0])
            // console.log(res.data)
        })
    }

    let select = (i) => {
        setEditItem(i)
        setEditProduct(!editProduct)
    }

    let cancelEdit = () => {
        setProfileImg('')
        setFavClimb('')
        toggleEditProfile()
    }

    let saveChange = () => {
        updateProfile(consumer.consumer_id, {profileImg, favoriteClimb})
        cancelEdit()
    }

    let seeMore = (product_id) => {
        setDesClicked(!desClicked)
        setViewDescrip(product_id)
    }


    let logout = async () => {
         await axios.post('/api/auth/logout').then(res => {
             console.log(res)
        })
        props.logout({})
        // console.log(consumer);
    }

    let getSignedRequest = ([file]) => {
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;

        axios.get('/api/signs3', {
            params: {
                'file-name': fileName,
                'file-type': file.type
            }
        }).then(res => {
            const {signedRequest, url} = res.data;
            uploadFile(file, signedRequest, url);
        })
        .catch(err => {console.log(err)})
    };

    let uploadFile = (file, signedRequest, url) => {
        const options = {
        headers: {
            'Content-Type': file.type,
        },
        };

        axios.put(signedRequest, file, options).then(res => {
            setProfileImg(url);
        })
        .catch(err => {
            if (err.res.status === 403) {
            alert(
                `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
                err.stack
                }`
            );
            } else {
            alert(`ERROR: ${err.status}\n ${err.stack}`);
        }   
        });
    };

    let consumerProducts = myProducts.sort((a, b) => a.product_id - b.product_id).map((product, i) => {
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
                        <button onClick={() => select(product)}>Edit</button>
                        <button onClick={() => deleteProduct(product.product_id)}>Delete</button>
                    </div>
                </div>
            </div>
        )
    })

    

   
    // console.clear();
    // console.log(consumer);
    // console.log(editProduct)
    // console.log(newProduct)
    // console.log(myProducts)
    // console.log(props);
    return(
        <div className='profile-container'>
            {editProduct || newProduct ? (
                <>
                <Flip right delay={100} duration={1000}>
                    <Post 
                        getFn={getMyProducts} 
                        myProducts={myProducts}
                        newProduct={newProduct}
                        setNewProduct={setNewProduct} 
                        editProduct={editProduct}
                        setEditProduct={setEditProduct}
                        editItem={editItem} 
                        setEditItem={setEditItem}
                        updateFn={updateItem}
                    /> 
                </Flip>
                </>
            ) : (
                <Flip left delay={100} duration={1000}>
                    <div className='profile'>
                        <img src={consumer.profile_img} alt='profile-img'/>
                        <h3>{consumer.username}</h3>
                        <div className='favorite-climb'>
                            <label>Favorite Climb:</label><div>{consumer.favorite_climb}</div>
                        </div>
                        <div className='buttons-container'>
                            <Link to='/'><button onClick={logout}>Log Out</button></Link>
                            <button onClick={toggleEditProfile}>Edit Profile</button>
                        </div>
                    </div>
                </Flip>
            )}
           
           {!editProfile ? (
            <Flip right delay={100} duration={1000}>
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
                    <button id='create' onClick={() => setNewProduct(!newProduct)}>Create New Product</button>
                </div>
            </Flip>
            ) : (
                <>
                <Flip left delay={100} duration={1000}>
                    <div className='profile'>
                        <img src={profileImg} alt='profile-img'/>
                        <label>Profile Img:</label>
                        <Dropzone
                            onDropAccepted={getSignedRequest}
                            accept='image/*'
                            multiple={false}
                        >
                            {({getRootProps, getInputProps}) => (
                                <div className="container">
                                    <div
                                        {...getRootProps({
                                            className: 'dropzone',
                                            onDrop: event => event.stopPropagation()
                                        })}
                                    >
                                        <input {...getInputProps()} />
                                        <p>Drop files here, or click to select files</p> 
                                    </div>
                                </div>
                            )}  
                        </Dropzone>
                        <h3>{consumer.username}</h3>
                        <div className='favorite-climb'>
                            <label>Favorite Climb:</label>
                            <input 
                                value={favoriteClimb}
                                type='text'
                                placeholder='Type here...'
                                onChange={(e) => setFavClimb(e.target.value)}
                            />
                        </div>
                        <div className='buttons-container'>
                            <button onClick={() => cancelEdit()}>Cancel</button>
                            <button onClick={() => saveChange()}>Save Changes</button>
                        </div>
                    </div>
                </Flip>
                </>
            )}
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return {
        consumer: reduxState.consumer,
        products: reduxState.products
    }
}

export default withRouter(connect(mapStateToProps, {logout, getConsumer})(Profile));