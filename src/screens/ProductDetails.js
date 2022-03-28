import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { listProductDetails } from '../actions/productActions'
import { addToCart } from '../actions/cartActions'

const ProductDetails = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const orderQty = useRef()
    const { product } = useSelector((state) => state.productDetails)
    const { image } = product
    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, orderQty: orderQty.current.value }))
        navigate('/cart')
    }
    useEffect(() => {
        dispatch(listProductDetails(params.id))
    }, [params])
    return (
        <div className="w-full p-8 flex flex-col justify-center items-center ">
            <button
                className="px-4 block py-2 my-4 self-start rounded-md max-w-fit bg-blue-400 hover:bg-blue-500 shadow-lg text-white outline-none"
                onClick={() => navigate(-1)}
            >
                Go Back
            </button>

            <div className="flex flex-row gap-16">
                <div>
                    <img
                        className="object-cover "
                        src={
                            image ||
                            product.image_url ||
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0533%2F2089%2Ffiles%2Fplaceholder-images-product-3_large.png%3Fformat%3Djpg%26quality%3D90%26v%3D1530129341&f=1&nofb=1'
                        }
                    />
                </div>
                <div className="py-8 ">
                    <h1 className="text-sky-500 text-2xl">
                        {product.name || 'product'}
                    </h1>
                    <h1 className="text-blue-500 text-2xl">
                        <span className="text-sky-600 text-lg ">Price</span> Rs.{' '}
                        {product.cost_price || '1000'} /-
                    </h1>
                    <h1 className="text-blue-500 text-2xl">
                        <span className="text-sky-600 text-lg ">Available</span>{' '}
                        {product.quantity || '1000'}
                    </h1>

                    <h1 className="text-cyan-400 text-xl">
                        {product.description || 'some random description'}
                    </h1>
                </div>
                <div className="py-8">
                    <input
                        className="px-4 py-2 my-1 rounded-md outline-none"
                        type="number"
                        min={1}
                        ref={orderQty}
                        max={product.quantity}
                        placeholder="quantity"
                    ></input>
                    <button
                        className="px-4 py-2 my-4 rounded-md max-w-fit bg-blue-600 hover:bg-blue-700 shadow-lg text-white outline-none"
                        onClick={addToCartHandler}
                    >
                        Add 2 Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
