import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import NavBar from './Components/NavBar/NavBar'
import NavBar from './Components/features/NavBar/NavBar'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './Components/features/Product/ComponnentsNavBar/Home'
import About from './Components/features/Product/ComponnentsNavBar/About'
import ProductShow from './Components/features/Product/ComponnentsNavBar/ProductShow'
// import Login from './Components/features/Product/ComponnentsNavBar/Login'
import Contact from './Components/features/Product/ComponnentsNavBar/Contact'
// import LoginShow from './Components/features/Login/LoginShow'// import ProductShow from './Components/features/Product/ProductShow'
import AddProduct from './Components/features/Product/AddProduct'
import UpdateProducts from './Components/features/Product/UdateProduct'
import AddToCart from './Components/features/Cart/Cart'
import Users from './Components/features/Users/UsersShow'
import Login from './Components/features/Login/LoginShow'
import { Provider } from 'react-redux'
import store from './Components/app/Store'
import SignUp from './Components/features/Login/SignUp'
import Pay from './Components/features/Cart/Pay'
import Orderhistory from './Components/features/Product/ComponnentsNavBar/Orderhistory'
function App() {
  const [count, setCount] = useState(0)

// useEffect(() => {
//   fetch('http://localhost:3001/api/products')
//     .then(res => res.json())
//     .then(data => setProducts(data));
// }, []);
useEffect(() => {
  fetch(`${process.env.REACT_APP_API_URL}/api/products`)
    .then(res => res.json())
    .then(data => setProducts(data));
}, []);

  return (

    
  <Provider store={store}>
    {/* <LoginShow></LoginShow> */}
    {/* <ProductShow></ProductShow> */}

    <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        {/* <Route path={""} element={<Home></Home>}></Route> */}
        <Route path={"Home"} element={<Home></Home>}></Route>
        <Route path={"Pay/:id"} element={<Pay></Pay>}></Route>
        <Route path={"Orderhistory"} element={<Orderhistory></Orderhistory>}></Route>
        <Route path={"About"} element={<About></About>}></Route>
        <Route path={"Contact"} element={<Contact></Contact>}></Route>
        <Route path="ProductShow/:type" element={<ProductShow />} />
        <Route path={"Login"} element={<Login></Login>}></Route>
        <Route path={"AddProduct"} element={<AddProduct></AddProduct>}></Route>
        <Route path={"UpdateProduct/:id"} element={<UpdateProducts></UpdateProducts>}></Route>
        <Route path={"AddToCart/:id"} element={<AddToCart></AddToCart>}></Route>
        <Route path={"Users"} element={<Users></Users>}></Route>
        <Route path={"SignUp"} element={<SignUp></SignUp>}></Route>

      </Routes>
    </BrowserRouter>
  </Provider>

  )
}

export default App
