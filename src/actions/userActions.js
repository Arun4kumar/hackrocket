import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
} from '../constants/userConstants'
import axios from 'axios'
import { CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        })

        const config = {
            method: 'post',
            url: 'https://apiv2.shiprocket.in/v1/external/auth/login',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({ email, password }),
        }

        const { data } = await axios(config)
        localStorage.setItem('userInfo', JSON.stringify(data))
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    dispatch({ type: USER_LOGOUT })
    localStorage.removeItem('userInfo')
    document.location.href = '/login'
}

export const getAddress = (pincode) => async (dispatch, getState) => {
    const state = getState()
    const config = {
        method: 'get',
        url: `https://apiv2.shiprocket.in/v1/external/open/postcode/details?postcode=${pincode}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.userLogin.userInfo.token}`,
        },
    }

    const { data } = await axios(config)

    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}
