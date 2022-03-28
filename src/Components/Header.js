import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <div className="flex flex-row justify-between items-center text-2xl h-12 px-8 py-4 bg-blue-300 text-white shadow-lg shadow-blue-500/50">
            <h1
                onClick={() => navigate('/')}
                className="text-bold cursor-pointer"
            >
                Logo
            </h1>
            <div className="flex flex-row text-lg">
                <h1
                    onClick={() => navigate('/profile')}
                    className="px-2 hover:bg-blue-500 rounded-lg cursor-pointer"
                >
                    Profile
                </h1>
                <h1
                    onClick={() => navigate('/cart')}
                    className="px-2 hover:bg-blue-500 rounded-lg cursor-pointer"
                >
                    Cart
                </h1>
                <h1
                    onClick={() => navigate('/products/add')}
                    className="px-2 hover:bg-blue-500 rounded-lg cursor-pointer"
                >
                    Extra
                </h1>
                <h1
                    onClick={() =>
                        userLogin.userInfo
                            ? logoutHandler()
                            : navigate('/login')
                    }
                    className="px-2 hover:bg-blue-500 rounded-lg cursor-pointer"
                >
                    {userLogin.userInfo ? 'Logout' : 'Login'}
                </h1>
            </div>
        </div>
    )
}

export default Header
