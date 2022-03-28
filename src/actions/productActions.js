import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
} from '../constants/productConstants'
import { logout } from './userActions'

export const listProducts = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const state = getState()

        var config = {
            method: 'get',
            url: 'https://apiv2.shiprocket.in/v1/external/products',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${state.userLogin.userInfo.token}`,
            },
        }

        const { data } = await axios(config)

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const listProductDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const state = getState()

        var config = {
            method: 'get',
            url: `https://apiv2.shiprocket.in/v1/external/products/show/${id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${state.userLogin.userInfo.token}`,
            },
        }

        const { data } = await axios(config)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.data,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const createProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST,
        })
        const state = getState()

        var config = {
            method: 'post',
            url: 'https://apiv2.shiprocket.in/v1/external/products',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${state.userLogin.userInfo.token}`,
            },
            data: JSON.stringify(product),
        }

        const { data } = await axios(config)

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: message,
        })
    }
}
