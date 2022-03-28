import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createProduct } from '../actions/productActions'

const ProductCreate = () => {
    const name = useRef()
    const qty = useRef()
    const desc = useRef()
    const ImgUrl = useRef()
    const type = useRef()
    const price = useRef()
    const navigate = useNavigate()
    const categoryCode = useRef()
    const dispatch = useDispatch()
    const [image, setImage] = useState('')
    const [url, setUrl] = useState('')
    const uploadImage = () => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'w7hxy9dv')
        data.append('cloud_name', 'deydakovl')
        fetch('  https://api.cloudinary.com/v1_1/breellz/image/upload', {
            method: 'post',
            body: data,
        })
            .then((resp) => resp.json())
            .then((data) => {
                setUrl(data.url)
            })
            .catch((err) => console.log(err))
    }
    const addProductHandler = () => {
        const data = {
            name: name.current.value,
            category_code: 'default',
            type: type.current.value,
            qty: qty.current.value,
            description: (desc.current && desc.current.value) || 'random desc',
            image_url: ImgUrl.current.value,
            cost_price: price.current.value,
            sku: `${(name.current.value + Math.random() * 100).slice(0, 6)}`,
        }
        console.log(data)
        dispatch(createProduct(data))
    }
    return (
        <div className="flex flex-col bg-blue-200 p-8 justify-center items-center w-6/12">
            <button
                className="px-4 py-2 my-4 self-start rounded-md max-w-fit bg-blue-400 hover:bg-blue-500 shadow-lg text-white outline-none"
                onClick={() => navigate(-1)}
            >
                go back
            </button>
            <input
                className="px-4 py-2 my-1 rounded-md outline-none"
                ref={name}
                type="text"
                placeholder="Name"
            />
            <input
                className="px-4 py-2 my-1 rounded-md outline-none"
                ref={qty}
                type="text"
                placeholder="Qantity"
            />
            <input
                className="px-4 py-2 my-1 rounded-md outline-none"
                ref={type}
                type="text"
                placeholder="Single or Multiple"
            />
            <input
                className="px-4 py-2 my-1 rounded-md outline-none"
                ref={desc}
                type="text"
                placeholder="Description"
            />
            <input
                className="px-4 py-2 my-1 rounded-md outline-none"
                ref={price}
                type="text"
                placeholder="Price"
            />
            <input
                className="px-4 py-2 my-1 rounded-md outline-none"
                ref={ImgUrl}
                type="text"
                placeholder="Image url"
            />
            <input
                className="px-4 py-2 my-1 rounded-md outline-none"
                ref={categoryCode}
                type="categoryCode"
                placeholder="Category"
            />
            {/* <div>
        <input type="file" onChange={(e) => setImage(e.target.files[ 0 ])}>
        </input>
        {url && <img src={url} />}
        <button onClick={uploadImage}>Upload</button>

      </div> */}
            <button
                className="px-4 py-2 my-4 rounded-md max-w-fit bg-blue-600 hover:bg-blue-700 shadow-lg text-white outline-none"
                onClick={addProductHandler}
            >
                Add Product
            </button>
        </div>
    )
}

export default ProductCreate
