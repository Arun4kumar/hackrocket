import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAddress } from '../actions/userActions'

const Profile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.userLogin)
    const { shippingAddress } = useSelector((state) => state.cart)
    const [savedAddress, setSave] = useState()
    useEffect(() => {
        shippingAddress &&
            shippingAddress.postcode_details &&
            setSave(shippingAddress.postcode_details)
    }, [shippingAddress])
    const address = useRef()
    const addressHandler = () => {
        dispatch(getAddress(address.current.value))
    }
    return (
        <div className="w-full p-8 items-center flex flex-col flex-wrap">
            <button
                className="px-4 block py-2 my-4 self-start rounded-md max-w-fit bg-blue-400 hover:bg-blue-500 shadow-lg text-white outline-none"
                onClick={() => navigate(-1)}
            >
                Go Back
            </button>

            <div className="flex flex-row justify-between  gap-x-24 ">
                <div className="bg-blue-300 rounded-lg p-8 ">
                    <h1 className="text-bold font-thin my-4  text-4xl text-blue-500">
                        User Details
                    </h1>
                    <h1 className="text-sky-500 text-2xl">
                        Name : {userInfo.first_name} {userInfo.last_name}
                    </h1>
                    <h1 className="text-sky-500 text-2xl">
                        Email : {userInfo.email}
                    </h1>
                </div>
                <div className=" bg-blue-300 rounded-lg p-8 ">
                    <h1 className="text-bold font-thin my-4  text-4xl text-blue-500">
                        Shipping Address
                    </h1>
                    <div className="bg-grey-400 ">
                        <input
                            className="px-4 py-2 my-1 rounded-md outline-none"
                            ref={address}
                            type="text"
                            placeholder="Postal Code"
                        />
                        <button
                            className="px-4 py-2 my-4 ml-4 rounded-md max-w-fit bg-blue-600 hover:bg-blue-700 shadow-lg text-white outline-none"
                            onClick={addressHandler}
                        >
                            Get Address
                        </button>
                    </div>
                    {savedAddress && (
                        <div>
                            <h1 className="text-sky-500 text-2xl">
                                Postal Code : {savedAddress.postcode}
                            </h1>
                            <h1 className="text-sky-500 text-2xl">
                                City : {savedAddress.city}
                            </h1>
                            <h1 className="text-sky-500 text-2xl">
                                State : {savedAddress.state}{' '}
                                {savedAddress.state_code}
                            </h1>
                            <h1 className="text-sky-500 text-2xl">
                                Country : {savedAddress.country}
                            </h1>
                            <h1 className="text-sky-500 justify-start items-center flex flex-row flex-wrap text-2xl">
                                Localities :{' '}
                                {savedAddress.locality.map((local) => (
                                    <p className="px-4 py-2 my-4 ml-4 rounded-md max-w-fit bg-blue-600 hover:bg-blue-700 shadow-lg text-white outline-none">
                                        {local}
                                    </p>
                                ))}
                            </h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile
