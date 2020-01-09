import React, {useState, useEffect} from 'react';
import './Scss/search.scss';
import useInput from '../../../hooks/useInput';
import {cancelToggle} from '../../../redux/reducers/searchReducer';
import {connect} from 'react-redux';
import axios from 'axios';
import {getProducts} from '../../../redux/reducers/getProductsReducer';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Slide from 'react-reveal/Slide';

const Search = (props) => {
    const [search, bindSearch] = useInput('');
    const [desClicked, setDesClicked] = useState(false);
    const [viewDescrip, setViewDescrip] = useState(0);

    const MySwal = withReactContent(Swal);
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
                getProducts(res.data)
                    MySwal.fire({
                        icon: 'success',
                        title: 'Item successfully added!'
                    })
            })
        }                                 
    }

    let seeMore = (product_id) => {
        setDesClicked(!desClicked)
        setViewDescrip(product_id)
    }

    const {products} = props.products;
    // console.log(products);
    let allProducts = products.sort((a, b) => a.product_id - b.product_id).filter((e) => {
        if(!search || e.product_title.includes(search) || e.username.includes(search) || e.price.includes(search) || e.condition.includes(search) || e.product_description.includes(search)){
            return true
        }
    }).map((e, i) => {
        return (
            <div className='products' key={i}>
                <img src={e.product_img} alt='product-img'/>
                <div className='product-info'>
                    <div className='user-id'>
                        <img src={e.profile_img}/>
                        <h3>{e.username}</h3>
                    </div>
                    <h3>{e.product_title}</h3>
                    <h4>${e.price}</h4>
                    <div id='product-condition'>
                        <label className='product-labels'>Condition:</label>{e.condition}
                    </div>
                    <label className='product-labels'>Description:</label>
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
                <div id='add-button-container'>
                    <button id='add-to-cart'
                    onClick={() => addToCart(e.product_id, e.price)}
                    >
                        Add To Cart
                    </button>
                </div>
            </div>
        )
    })

    return (
        <div className='search-container'>
            <Slide top delay={100} duration={1000}>
                <div className='search'>
                    <input 
                        {...bindSearch}
                        type='text'
                        placeholder='Search for anything...'
                    />
                    <button onClick={props.cancelToggle}>X</button>
                </div>
            </Slide>
            <Slide bottom delay={100} duration={1000}>
                {allProducts}
            </Slide>
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return {
        products: reduxState.products,
        search: reduxState.search,
        consumer: reduxState.consumer
    }
}

export default connect(mapStateToProps, {cancelToggle, getProducts})(Search);