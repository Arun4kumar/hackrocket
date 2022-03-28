import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './screens/Home'
import Login from './screens/Login'
import ProductCreate from './screens/ProductCreate'
import ProductDetails from './screens/ProductDetails'
import Header from './Components/Header'
import Cart from './screens/Cart'
import Profile from './screens/Profile'
import SignUp from './screens/SignUp'
import Reset from './screens/Reset'

function App() {
    return (
        <div className="h-screen w-screen box-border">
            <BrowserRouter>
                <Header></Header>
                <div className="bg-blue-100 flex justify-center items-center">
                    <Routes>
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/profile" element={<Profile />} />
                        <Route exact path="/cart" element={<Cart />} />
                        <Route exact path="/signup" element={<SignUp />} />
                        <Route exact path="/reset" element={<Reset />} />
                        <Route
                            exact
                            path="/products/add"
                            element={<ProductCreate />}
                        />
                        <Route
                            path={`/products/:id`}
                            element={<ProductDetails />}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App
