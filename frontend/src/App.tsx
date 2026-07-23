import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout';
import Home from './pages/customer/Home';
import ProductDetails from './pages/customer/ProductDetails';
import Cart from './pages/customer/Cart';
import Dashboard from './pages/admin/Dashboard';
import CategoryList from './pages/admin/CategoryList';
import ProductList from './pages/admin/ProductList';
import OrderList from './pages/admin/OrderList';
import Login from './pages/identity/Login';
import Register from './pages/identity/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="customer/product/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="identity/login" element={<Login />} />
          <Route path="identity/register" element={<Register />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="category" element={<CategoryList />} />
          <Route path="product" element={<ProductList />} />
          <Route path="order" element={<OrderList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
