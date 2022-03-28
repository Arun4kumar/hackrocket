import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeFromCart } from '../actions/cartActions'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

const Cart = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { cartItems } = useSelector((state) => state.cart)
    console.log(cartItems)
    const deleteHandler = (id) => {
        console.log(id)
        dispatch(removeFromCart(id))
    }
    const checkOutHandler = () => {
        console.log('checkout clicked')
    }

    const clearCart = () => {
        dispatch({ type: CART_CLEAR_ITEMS })
    }

    return (
        <div className="w-full p-8 items-center flex flex-col text-blue-500">
            <button
                className="px-4 block py-2 my-4 self-start rounded-md max-w-fit bg-blue-400 hover:bg-blue-500 shadow-lg text-white outline-none"
                onClick={() => navigate(-1)}
            >
                Go Back
            </button>
            <button
                className="px-4 block py-2 my-4 self-start rounded-md max-w-fit bg-red-400 hover:bg-red-500 shadow-lg text-white outline-none"
                onClick={clearCart}
            >
                Clear Cart
            </button>
            <div className="flex flex-row justify-between w-9/12 gap-x-24">
                <div className="w-full ">
                    {cartItems.length == 0 && (
                        <h1 className="text-blue-500">
                            Your Cart is Empty add some products
                        </h1>
                    )}
                    {cartItems &&
                        cartItems.map((product) => (
                            <div
                                className="flex mb-4 flex-row items-center grow px-8"
                                key={product.id}
                            >
                                <img
                                    className={
                                        'w-16 h-16 object-cover rounded-md'
                                    }
                                    src={
                                        product.image ||
                                        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0533%2F2089%2Ffiles%2Fplaceholder-images-product-3_large.png%3Fformat%3Djpg%26quality%3D90%26v%3D1530129341&f=1&nofb=1'
                                    }
                                />
                                <h1 className="ml-4">{product.name}</h1>
                                <h1 className="ml-auto ">
                                    {product.cost_price}
                                </h1>
                                X<h1>{product.orderQty}</h1>
                                <button
                                    className="px-4 py-2 my-4 ml-auto rounded-md max-w-fit bg-red-600 hover:bg-red-700 shadow-lg text-white outline-none"
                                    onClick={() => deleteHandler(product.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                </div>

                <div>
                    <div>
                        <h2>
                            Subtotal (
                            {cartItems.reduce(
                                (acc, item) => acc + Number(item.orderQty),
                                0
                            )}
                            ) items
                        </h2>
                        Rs{' '}
                        {cartItems
                            .reduce(
                                (acc, item) =>
                                    acc +
                                    Number(item.orderQty) *
                                        Number(
                                            item.cost_price || item.mrp || 100
                                        ),
                                0
                            )
                            .toFixed(2)}
                    </div>
                    <button
                        disabled={cartItems.length == 0}
                        className={`${
                            cartItems.length == 0 && 'opacity-50'
                        } px-4 py-2 my-4 rounded-md max-w-fit bg-blue-600 hover:bg-blue-700 shadow-lg text-white outline-none `}
                        onClick={checkOutHandler}
                    >
                        CheckOut
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cart
