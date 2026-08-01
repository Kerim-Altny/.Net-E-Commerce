import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import { getErrorMessage } from '../../utils/getErrorMessage';
import type { Category } from '../../types/Category';

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = () => {
    axiosClient
      .get<Category[]>('/api/categories')
      .then((res) => setCategories(res.data))
      .catch(() => setError('Kategoriler yüklenirken bir hata oluştu.'));
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) return;
    try {
      await axiosClient.delete(`/api/categories/${id}`);
      loadCategories();
    } catch (err) {
      setError(getErrorMessage(err, 'Kategori silinirken bir hata oluştu.'));
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="card border shadow-sm overflow-hidden">
        <div className="card-header text-white py-3 px-4 d-flex align-items-center justify-content-between" style={{ background: 'linear-gradient(to right, #065f46, #282828, #191414)' }}>
          <div>
            <h5 className="mb-0 fw-bold"><i className="bi bi-grid me-2"></i>Categories</h5>
            <p className="mb-0 small" style={{ color: '#1DB954' }}>Manage your product categories</p>
          </div>
          <Link to="/admin/category/create" className="btn btn-sm btn-outline-light fw-semibold d-inline-flex align-items-center gap-1">
            <i className="bi bi-plus-lg"></i> New Category
          </Link>
        </div>
        {error && <div className="alert alert-danger m-3 mb-0">{error}</div>}
        <div className="table-responsive">
          <table className="table-styled table">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Display Order</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="fw-medium" style={{ color: '#1e293b' }}>{category.name}</td>
                  <td><span className="badge bg-light text-dark border">{category.displayOrder}</span></td>
                  <td className="text-end">
                    <Link to={`/admin/category/update/${category.id}`} className="btn btn-sm btn-outline-success me-1">
                      <i className="bi bi-pencil-square me-1"></i>Edit
                    </Link>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(category.id)}>
                      <i className="bi bi-trash me-1"></i>Delete
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
