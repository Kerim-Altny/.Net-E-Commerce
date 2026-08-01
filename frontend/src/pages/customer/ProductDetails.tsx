import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import { isAuthenticated } from '../../utils/auth';
import type { Product } from '../../types/Product';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axiosClient
      .get<Product>(`/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setError('Ürün yüklenirken bir hata oluştu.'));
  }, [id]);

  const handleAddToCart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    if (!isAuthenticated()) {
      navigate('/identity/login');
      return;
    }

    try {
      await axiosClient.post('/api/cart/items', { productId: product.id, quantity: count });
      navigate('/cart');
    } catch {
      setError('Sepete eklenirken bir hata oluştu.');
    }
  };

  if (error) {
    return <div className="container py-4"><div className="alert alert-danger">{error}</div></div>;
  }

  if (!product) {
    return <div className="container py-4">Yükleniyor...</div>;
  }

  return (
    <div className="container py-4">
      <form onSubmit={handleAddToCart}>
        <div className="mb-3">
          <Link to="/" className="text-decoration-none text-secondary small fw-medium d-inline-flex align-items-center gap-1">
            <i className="bi bi-arrow-left"></i> Back to all books
          </Link>
        </div>

        <div className="card border shadow-sm overflow-hidden">
          <div className="row g-0">
            {/* Image */}
            <div className="col-lg-5 d-flex align-items-stretch" style={{ background: 'linear-gradient(135deg, #1e293b, #334155, #475569)', minHeight: '480px' }}>
              {product.imageUrl ? (
                <img src={product.imageUrl} className="w-100" style={{ objectFit: 'cover' }} alt={product.title} />
              ) : (
                <div className="d-flex flex-column align-items-center justify-content-center w-100">
                  <i className="bi bi-book" style={{ fontSize: '8rem', color: '#64748b' }}></i>
                  <p className="text-secondary small mt-3">No Image Available</p>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="col-lg-7 p-4 p-lg-5">
              <span className="badge mb-3" style={{ background: 'rgba(23,163,74,0.1)', color: '#17A34A' }}>
                <i className="bi bi-bookmark me-1"></i> {product.category.name}
              </span>
              <h1 className="h3 fw-bold mb-1">{product.title}</h1>
              <p className="text-secondary mb-2">by <span className="fw-medium text-dark">{product.author}</span></p>
              <p className="text-secondary small mb-4">ISBN: {product.isbn}</p>

              <div className="d-flex align-items-baseline gap-2 mb-4">
                <span className="h3 fw-bold mb-0" style={{ color: '#17A34A' }}>${product.price.toFixed(2)}</span>
                <span className="text-decoration-line-through text-secondary">${product.listPrice.toFixed(2)}</span>
              </div>

              {/* Volume Discounts */}
              <div className="border rounded p-3 mb-4 bg-light">
                <p className="text-uppercase fw-bold text-secondary mb-3" style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}>
                  <i className="bi bi-stack me-1" style={{ color: '#17A34A' }}></i> Volume Discounts
                </p>
                <div className="row g-2 text-center">
                  <div className="col-4">
                    <div className="bg-white border rounded p-2 shadow-sm h-100 d-flex flex-column align-items-center justify-content-center">
                      <p className="text-uppercase text-secondary mb-1" style={{ fontSize: '0.6rem', fontWeight: 700 }}>1-50 Units</p>
                      <p className="fw-bold mb-0" style={{ color: '#17A34A' }}>${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="bg-white border rounded p-2 shadow-sm h-100 d-flex flex-column align-items-center justify-content-center" style={{ borderColor: 'rgba(23,163,74,0.3) !important' }}>
                      <p className="text-uppercase text-secondary mb-1" style={{ fontSize: '0.6rem', fontWeight: 700 }}>51-100 Units</p>
                      <p className="fw-bold mb-0" style={{ color: '#17A34A' }}>${product.price50.toFixed(2)}</p>
                      <span className="badge mt-1" style={{ fontSize: '0.55rem', background: 'rgba(23,163,74,0.1)', color: '#17A34A' }}>SAVE</span>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="bg-white border rounded p-2 shadow-sm h-100 d-flex flex-column align-items-center justify-content-center" style={{ borderColor: '#17A34A !important' }}>
                      <p className="text-uppercase text-secondary mb-1" style={{ fontSize: '0.6rem', fontWeight: 700 }}>100+ Units</p>
                      <p className="fw-bold mb-0" style={{ color: '#17A34A' }}>${product.price100.toFixed(2)}</p>
                      <span className="badge text-white mt-1" style={{ fontSize: '0.55rem', background: '#17A34A' }}>BEST</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-secondary small mb-4" dangerouslySetInnerHTML={{ __html: product.description ?? '' }}></div>

              <div className="d-flex align-items-center gap-2">
                <div className="input-group" style={{ width: '140px' }}>
                  <span className="input-group-text fw-semibold small" style={{ background: '#17A34A', color: '#fff' }}>Qty</span>
                  <input type="number" className="form-control text-center fw-medium" value={count} onChange={(e) => setCount(Number(e.target.value))} min={1} />
                </div>
                <button type="submit" className="btn btn-accent flex-grow-1 fw-semibold py-2">
                  <i className="bi bi-cart-plus me-1"></i> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
