import React, {useState, useEffect} from 'react';
import './Scss/post.scss';
import axios from 'axios';
import {connect} from 'react-redux';
import {v4 as randomString} from 'uuid';
import Dropzone from 'react-dropzone';

const Post = (props) => {
    const [img, setImg] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [condition, setCondition] = useState('New');
    const [description, setDescrip] = useState('');

    const {consumer} = props.consumer;

    useEffect(() => {
        setImg(props.editItem.product_img)
        setTitle(props.editItem.product_title)
        setPrice(props.editItem.price)
        setCondition(props.editItem.condition)
        setDescrip(props.editItem.product_description)
    }, [props.editItem.product_img, props.editItem.product_title, props.editItem.price, props.editItem.condition, props.editItem.product_description])

    let addProduct = () => {
        axios.post('/api/products', {
            consumer_id: consumer.consumer_id,
            img,
            title,
            price,
            condition,
            description
        }).then(res => {
            props.getFn(consumer.consumer_id)
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
        props.setEditItem({})
    }

    let handleSave = () => {
        const {product_id} = props.editItem
        props.updateFn(product_id, {img, title, price, condition, description})
        props.getFn(consumer.consumer_id)
        cancel() 
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
            setImg(url);
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



    const conditionData = [
        {name: 'New'},
        {name: 'Used'}
    ];
    const conditionOptions = conditionData.map((e, i) => {
        return (
            <option value={e.name} key={i}>
                {e.name}
            </option>
        )
    })

    // console.log(props.editProduct)
    // console.log(img, title, price, condition, description, props.editItem.product_id)
    console.clear();
    // console.log(props.newProduct);
    // console.log(props.editProduct);
    return (
        <div className='post-container'>
           <div className='new-product'>
                <img 
                    src={img ? img : 'https://spacenews.com/wp-content/plugins/events-calendar-pro/src/resources/images/tribe-event-placeholder-image.svg'} alt='profile-pic'
                />
                <div className='product-input-img'>
                    <label>Product Image:</label>
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