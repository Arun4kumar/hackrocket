import React, { useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SignUp = () => {
    const email = useRef()
    const password = useRef()
    const conPassword = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userInfo } = useSelector((state) => state.userLogin)

    useEffect(() => {
        userInfo && navigate('/')
    })

    const SignUpHandler = () => {
        if (
            !email.current.value ||
            !password.current.value ||
            !conPassword.current.value ||
            conPassword.current.value !== password.current.value
        )
            return
        dispatch(SignUp(email.current.value, password.current.value))
    }
    return (
        <div className="flex flex-col bg-blue-200 p-8 justify-center items-center w-6/12">
            <button
                className="px-4 block py-2 my-4 self-start rounded-md max-w-fit bg-blue-400 hover:bg-blue-500 shadow-lg text-white outline-none"
                onClick={() => navigate(-1)}
            >
                Go Back
            </button>
            <input
                className="px-4 py-2 my-1 rounded-md outline-none"
                ref={email}
                type="text"
                placeholder="email"
            />
            <input
                className="px-4 py-2 my-1 rounded-md outline-none"
                ref={password}
                type="password"
                placeholder="password"
            />
            <input
                className="px-4 py-2 my-1 rounded-md outline-none"
                ref={conPassword}
                type="password"
                placeholder="Conform Password"
            />
            <button
                className="px-4 py-2 my-4 rounded-md max-w-fit bg-blue-600 hover:bg-blue-700 shadow-lg text-white outline-none"
                onClick={SignUpHandler}
            >
                SignUp
            </button>
            <p>
                <h1 className="text-blue-600 underline decoration-dashed">
                    <Link to={'/login'}>Login</Link>{' '}
                    <h1 className="decoration-none">{'&'}</h1>
                    <Link to={'/reset'}>Reset Password</Link>
                </h1>
                <h1></h1>
            </p>
        </div>
    )
}

export default SignUp
