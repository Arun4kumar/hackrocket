import React from 'react'

const Product = ({ product }) => {
    return (
        <div className="flex flex-col shadow-xl justify-center gap-2 p-8 items-center bg-blue-200 rounded-lg overflow-hidden">
            <img
                className="w-full object-cover rounded-sm"
                src={
                    product.image ||
                    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0533%2F2089%2Ffiles%2Fplaceholder-images-product-3_large.png%3Fformat%3Djpg%26quality%3D90%26v%3D1530129341&f=1&nofb=1'
                }
            ></img>
            <h1 className="text-blue-700 text-lg">
                {product.name || 'product'}
            </h1>
            <h1 className="text-blue-500 text-2xl">
                {product.cost_price || 0}
            </h1>
        </div>
    )
}

export default Product
