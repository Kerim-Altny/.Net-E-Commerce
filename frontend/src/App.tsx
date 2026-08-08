import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout';
import RequireAdmin from './components/RequireAdmin';
import Home from './pages/customer/Home';
import ProductDetails from './pages/customer/ProductDetails';
import Cart from './pages/customer/Cart';
import OrderSuccess from './pages/customer/OrderSuccess';
import Dashboard from './pages/admin/Dashboard';
import CategoryList from './pages/admin/CategoryList';
import CategoryForm from './pages/admin/CategoryForm';
import ProductList from './pages/admin/ProductList';
import ProductForm from './pages/admin/ProductForm';
import OrderList from './pages/admin/OrderList';
import OrderDetails from './pages/admin/OrderDetails';
import UserList from './pages/admin/UserList';
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
          <Route path="order-success" element={<OrderSuccess />} />
          <Route path="identity/login" element={<Login />} />
          <Route path="identity/register" element={<Register />} />
        </Route>
        <Route path="/admin" element={<RequireAdmin />}>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="category" element={<CategoryList />} />
            <Route path="category/create" element={<CategoryForm />} />
            <Route path="category/update/:id" element={<CategoryForm />} />
            <Route path="product" element={<ProductList />} />
            <Route path="product/upsert" element={<ProductForm />} />
            <Route path="product/upsert/:id" element={<ProductForm />} />
            <Route path="order" element={<OrderList />} />
            <Route path="order/details/:id" element={<OrderDetails />} />
            <Route path="user" element={<UserList />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
