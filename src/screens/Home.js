import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { listProducts } from '../actions/productActions'
import Product from '../Components/Product'

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.userLogin)
    const { products } = useSelector((state) => state.productList)
    const [recomandation, setRecomand] = useState()
    useEffect(() => {
        !userInfo && navigate('/login')
        dispatch(listProducts())
    }, [])

    return (
        <div className="w-full p-8">
            <h1 className="text-bold font-thin my-4  text-4xl text-blue-500">
                Recomandation
            </h1>
            <div className="grid grid-cols-6 gap-8  ">
                {products &&
                    products.map((product) => (
                        <div key={product.skv}>
                            <Link to={`/products/${product.id}`}>
                                <Product product={product} />
                            </Link>
                        </div>
                    ))}
            </div>
            <h1 className="text-bold font-thin  my-4 text-4xl text-blue-500">
                Trendings
            </h1>
            <div className="grid grid-cols-6 gap-8  ">
                {products &&
                    products.map((product) => (
                        <div key={product.skv}>
                            <Link to={`/products/${product.id}`}>
                                <Product product={product} />
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Home
