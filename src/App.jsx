import NavBar from "./components/NavBar.jsx"
import ItemListContainer from "./components/ItemListContainer.jsx"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ItemDetailContainer from "./components/ItemDetailContainer.jsx"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import CartProvider from "./cartContext.jsx"
import Cart from "./components/Cart.jsx"
import Checkout from "./components/Checkout.jsx"
import OrderResume from "./components/OrderResume.jsx"

function App() {
  return (
    <BrowserRouter>
      <CartProvider >
      <NavBar />
      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/item/:id" element={<ItemDetailContainer />} />
        <Route path="/category/:categoryId" element={<ItemListContainer />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order/:orderId" element={<OrderResume />} />
      </Routes>
      </CartProvider>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
