import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import { getErrorMessage } from '../../utils/getErrorMessage';
import type { Product } from '../../types/Product';
import type { Category } from '../../types/Category';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [listPrice, setListPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [price50, setPrice50] = useState(0);
  const [price100, setPrice100] = useState(0);
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    axiosClient.get<Category[]>('/api/categories').then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    if (!id) return;
    axiosClient
      .get<Product>(`/api/products/${id}`)
      .then((res) => {
        const p = res.data;
        setTitle(p.title);
        setAuthor(p.author);
        setIsbn(p.isbn);
        setDescription(p.description ?? '');
        setImageUrl(p.imageUrl ?? '');
        setListPrice(p.listPrice);
        setPrice(p.price);
        setPrice50(p.price50);
        setPrice100(p.price100);
        setCategoryId(p.category.id);
        setLoading(false);
      })
      .catch(() => {
        setError('Ürün yüklenirken bir hata oluştu.');
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const payload = {
      title,
      author,
      isbn,
      description: description || null,
      imageUrl: imageUrl || null,
      listPrice,
      price,
      price50,
      price100,
      categoryId,
    };

    try {
      if (isEdit) {
        await axiosClient.put(`/api/products/${id}`, payload);
      } else {
        await axiosClient.post('/api/products', payload);
      }
      navigate('/admin/product');
    } catch (err) {
      setError(getErrorMessage(err, 'Ürün kaydedilirken bir hata oluştu.'));
    }
  };

  if (loading) {
    return <div className="container-fluid py-4">Yükleniyor...</div>;
  }

  return (
    <div className="container-fluid py-4">
      <div className="card border shadow-sm overflow-hidden" style={{ maxWidth: '640px' }}>
        <div className="card-header text-white py-3 px-4" style={{ background: 'linear-gradient(to right, #065f46, #282828, #191414)' }}>
          <h5 className="mb-0 fw-bold">{isEdit ? 'Edit Product' : 'New Product'}</h5>
        </div>
        <div className="card-body p-4">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Title</label>
                <input className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Author</label>
                <input className="form-control" value={author} onChange={e => setAuthor(e.target.value)} required />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">ISBN</label>
                <input className="form-control" value={isbn} onChange={e => setIsbn(e.target.value)} required />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Category</label>
                <select className="form-select" value={categoryId} onChange={e => setCategoryId(Number(e.target.value))} required>
                  <option value="" disabled>Select category</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Image URL</label>
              <input className="form-control" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className="row">
              <div className="col-6 col-md-3 mb-3">
                <label className="form-label">List Price</label>
                <input type="number" step="0.01" className="form-control" value={listPrice} onChange={e => setListPrice(Number(e.target.value))} required />
              </div>
              <div className="col-6 col-md-3 mb-3">
                <label className="form-label">Price (1-50)</label>
                <input type="number" step="0.01" className="form-control" value={price} onChange={e => setPrice(Number(e.target.value))} required />
              </div>
              <div className="col-6 col-md-3 mb-3">
                <label className="form-label">Price (51-100)</label>
                <input type="number" step="0.01" className="form-control" value={price50} onChange={e => setPrice50(Number(e.target.value))} required />
              </div>
              <div className="col-6 col-md-3 mb-3">
                <label className="form-label">Price (100+)</label>
                <input type="number" step="0.01" className="form-control" value={price100} onChange={e => setPrice100(Number(e.target.value))} required />
              </div>
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-accent">Save</button>
              <Link to="/admin/product" className="btn btn-outline-secondary">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
