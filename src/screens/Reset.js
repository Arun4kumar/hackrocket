import React, { useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
const Reset = () => {
    const email = useRef()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.userLogin)

    useEffect(() => {
        userInfo && navigate('/')
    }, [userInfo])

    const resetHandler = () => {}
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

            <button
                className="px-4 py-2 my-4 rounded-md max-w-fit bg-blue-600 hover:bg-blue-700 shadow-lg text-white outline-none"
                onClick={resetHandler}
            >
                Reset
            </button>
            <p>
                <h1 className="text-blue-600 underline decoration-dashed">
                    <Link to={'/signup'}>Register</Link>{' '}
                    <h1 className="decoration-none">{'&'}</h1>
                    <Link to={'/reset'}>Reset Password</Link>
                </h1>
                <h1></h1>
            </p>
        </div>
    )
}

export default Reset
