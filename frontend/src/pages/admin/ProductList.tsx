import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import { getErrorMessage } from '../../utils/getErrorMessage';
import type { Product } from '../../types/Product';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = () => {
    axiosClient
      .get<Product[]>('/api/products', { params: { pageNumber: 1, pageSize: 100 } })
      .then((res) => setProducts(res.data))
      .catch(() => setError('Ürünler yüklenirken bir hata oluştu.'));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) return;
    try {
      await axiosClient.delete(`/api/products/${id}`);
      loadProducts();
    } catch (err) {
      setError(getErrorMessage(err, 'Ürün silinirken bir hata oluştu.'));
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="card border shadow-sm overflow-hidden">
        <div className="card-header text-white py-3 px-4 d-flex align-items-center justify-content-between" style={{ background: 'linear-gradient(to right, #065f46, #282828, #191414)' }}>
          <div>
            <h5 className="mb-0 fw-bold"><i className="bi bi-grid me-2"></i>Products</h5>
            <p className="mb-0 small" style={{ color: '#1DB954' }}>Manage your products</p>
          </div>
          <Link to="/admin/product/upsert" className="btn btn-sm btn-outline-light fw-semibold d-inline-flex align-items-center gap-1">
            <i className="bi bi-plus-lg"></i> New Product
          </Link>
        </div>
        {error && <div className="alert alert-danger m-3 mb-0">{error}</div>}
        <div className="table-responsive p-3">
          <table className="table table-striped table-hover table-styled">
            <thead>
              <tr>
                <th>Title</th>
                <th>ISBN</th>
                <th>Price</th>
                <th>Author</th>
                <th>Category</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>{product.isbn}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.author}</td>
                  <td>{product.category.name}</td>
                  <td className="text-end">
                    <Link to={`/admin/product/upsert/${product.id}`} className="btn btn-sm btn-outline-success me-1">
                      <i className="bi bi-pencil-square"></i>
                    </Link>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(product.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
