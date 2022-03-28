import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer } from './reducers/userReducer'
import {
    productCreateReducer,
    productDetailsReducer,
    productListReducer,
} from './reducers/productReducer'
import { cartReducer } from './reducers/cartReducer'
const reducer = combineReducers({
    userLogin: userLoginReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productCreate: productCreateReducer,
    cart: cartReducer,
})

const middleware = [thunk]

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage },
}

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
