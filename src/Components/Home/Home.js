import React from 'react';
import './Scss/home.scss';
import Products from '../Products/Products';
import {useState, useEffect} from 'react';
import axios from 'axios';


const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])

    let getProducts = () => {
        axios.get('/api/products').then(res => {
            setProducts(res.data)
        })
    }


    return(
        <div className='home'>
            <Products 
                products={products}
            />
        </div>
    )
}

export default Home;