import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import { getErrorMessage } from '../../utils/getErrorMessage';
import type { Category } from '../../types/Category';

export default function CategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [name, setName] = useState('');
  const [displayOrder, setDisplayOrder] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (!id) return;
    axiosClient
      .get<Category>(`/api/categories/${id}`)
      .then((res) => {
        setName(res.data.name);
        setDisplayOrder(res.data.displayOrder);
        setLoading(false);
      })
      .catch(() => {
        setError('Kategori yüklenirken bir hata oluştu.');
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (isEdit) {
        await axiosClient.put(`/api/categories/${id}`, { name, displayOrder });
      } else {
        await axiosClient.post('/api/categories', { name, displayOrder });
      }
      navigate('/admin/category');
    } catch (err) {
      setError(getErrorMessage(err, 'Kategori kaydedilirken bir hata oluştu.'));
    }
  };

  if (loading) {
    return <div className="container-fluid py-4">Yükleniyor...</div>;
  }

  return (
    <div className="container-fluid py-4">
      <div className="card border shadow-sm overflow-hidden" style={{ maxWidth: '480px' }}>
        <div className="card-header text-white py-3 px-4" style={{ background: 'linear-gradient(to right, #065f46, #282828, #191414)' }}>
          <h5 className="mb-0 fw-bold">{isEdit ? 'Edit Category' : 'New Category'}</h5>
        </div>
        <div className="card-body p-4">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Category Name</label>
              <input className="form-control" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Display Order</label>
              <input type="number" className="form-control" value={displayOrder} onChange={e => setDisplayOrder(Number(e.target.value))} min={0} required />
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-accent">Save</button>
              <Link to="/admin/category" className="btn btn-outline-secondary">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
