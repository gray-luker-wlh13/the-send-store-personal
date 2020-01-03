import React, {useState, useEffect} from 'react';
import './Scss/post.scss';
import axios from 'axios';
import {connect} from 'react-redux';

const Post = (props) => {
    const [img, setImg] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [condition, setCondition] = useState('New');
    const [description, setDescrip] = useState('');


    let addProduct = (props) => {
        axios.post('/api/products', {
            consumer_id: props.consumer.consumer.consumer_id,
            img,
            title,
            price,
            condition,
            description
        }).then(res => {
            props.getFn(res.data)
            cancel()
        })
    }

    let cancel = () => {
        setImg('')
        setTitle('')
        setPrice('')
        setCondition('New')
        setDescrip('')
        props.setNewProduct(false)
        props.setEditProduct(false)
    }

    let handleSave = () => {
        const {product_id} = props.editItem
        props.updateFn(product_id, {img, title, price, condition, description})
        props.getFn()
        cancel() 
    }



    const conditionData = [
        {name: 'New'},
        {name: 'Used'}
    ];
    const conditionOptions = conditionData.map((e, i) => {
        return (
            <option value={i} key={i}>
                {e.name}
            </option>
        )
    })

    console.log(props.editProduct)
    return (
        <div className='post-container'>
           <div className='new-product'>
                <img 
                    src={img ? img : 'https://spacenews.com/wp-content/plugins/events-calendar-pro/src/resources/images/tribe-event-placeholder-image.svg'} alt='profile-pic'
                />
                <div className='product-input'>
                    <label>Product Image:</label>
                    <input 
                        value={img}
                        type='url'
                        placeholder='Product URL here...'
                        onChange={(e) => setImg(e.target.value)}
                    />
                </div>
                <div className='product-input'>
                    <label>Title:</label>
                    <input
                        value={title}
                        type='text'
                        placeholder='Product Title'
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='product-input'>
                    <label>Price:</label>
                    <input 
                        value={price}
                        type='number'
                        placeholder='$0.00'
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className='product-input'>
                    <label>Condition:</label>
                    <div className='custom-select'>
                        <select
                            value={condition}
                            onChange={(e) => setCondition(e.target.value)}
                        >
                            <option value='Select Condition'>Select Condition</option>
                            {conditionOptions}
                        </select>
                    </div>
                </div>
                <div className='product-input'>
                    <label>Description:</label>
                    <input 
                        id='description'
                        value={description}
                        type='text'
                        placeholder='More about your product...'
                        onChange={(e) => setDescrip(e.target.value)}
                    />
                </div>
           <div className='add-button'>
               {!props.editProduct ? <button onClick={() => addProduct()}>Add Product</button> : <button onClick={() => handleSave()}>Save Changes</button>}
               <button onClick={() => cancel()}>Cancel and Go Back</button>
           </div>
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

export default connect(mapStateToProps)(Post);