import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import type { Product } from '../../types/Product';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axiosClient
      .get<Product[]>('/api/products', { params: { pageNumber: 1, pageSize: 20 } })
      .then((res) => setProducts(res.data))
      .catch(() => setError('Kitaplar yüklenirken bir hata oluştu.'));
  }, []);

  return (
    <>
      <section className="position-relative overflow-hidden" style={{ background: '#191414' }}>
        <div className="position-absolute top-0 end-0 bottom-0 d-none d-lg-block" style={{ width: '45%', background: 'linear-gradient(160deg, #1DB954, #17A34A)', clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
        <div className="container position-relative py-5" style={{ zIndex: 2 }}>
          <div className="row align-items-center g-5">
            <div className="col-lg-6 text-center text-lg-start">
              <p className="text-uppercase small fw-semibold mb-3" style={{ color: '#1DB954', letterSpacing: '0.25em', fontSize: '0.75rem' }}>
                <i className="bi bi-star me-1"></i> Editor's Pick &mdash; January 2025
              </p>
              <h1 className="display-4 fw-bold text-white lh-sm mb-4">
                Stories that stay <br className="d-none d-sm-block" />
                with you <span style={{ color: '#1DB954' }}>forever.</span>
              </h1>
              <p className="lead mb-4" style={{ color: '#94a3b8', maxWidth: '500px' }}>
                Curated collections, bestselling authors, and hidden gems &mdash; all in one place. Start your next chapter today.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start mb-5">
                <a href="#catalog" className="btn btn-lg btn-accent fw-bold rounded-pill px-4">
                  Explore the Collection <i className="bi bi-arrow-right ms-2"></i>
                </a>
                <a href="#catalog" className="btn btn-lg btn-ghost-light rounded-pill px-4">
                  <i className="bi bi-compass me-1"></i> Browse by Category
                </a>
              </div>
              <div className="row g-4 text-center text-lg-start" style={{ maxWidth: '420px' }}>
                <div className="col-4">
                  <p className="fs-4 fw-bold text-white mb-0">50+</p>
                  <p className="text-uppercase mb-0" style={{ fontSize: '0.65rem', color: '#64748b', letterSpacing: '0.1em' }}>Book Titles</p>
                </div>
                <div className="col-4 border-start" style={{ borderColor: 'rgba(255,255,255,0.1) !important' }}>
                  <p className="fs-4 fw-bold text-white mb-0">12</p>
                  <p className="text-uppercase mb-0" style={{ fontSize: '0.65rem', color: '#64748b', letterSpacing: '0.1em' }}>Categories</p>
                </div>
                <div className="col-4 border-start" style={{ borderColor: 'rgba(255,255,255,0.1) !important' }}>
                  <p className="fs-4 fw-bold text-white mb-0">4.9 <i className="bi bi-star-fill small" style={{ color: '#1DB954' }}></i></p>
                  <p className="text-uppercase mb-0" style={{ fontSize: '0.65rem', color: '#64748b', letterSpacing: '0.1em' }}>Avg Rating</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block" style={{ zIndex: 2 }}>
              <div className="position-relative d-flex align-items-center justify-content-center" style={{ height: '460px' }}>
                <div className="position-absolute" style={{ left: '40px', transform: 'rotate(-8deg) translateY(20px)', zIndex: 1, opacity: 0.7 }}>
                  <Link to="#" className="d-block rounded-3 overflow-hidden shadow" style={{ width: '160px', height: '230px' }}>
                    <div className="w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #334155, #1e293b)' }}>
                      <i className="bi bi-book fs-1" style={{ color: '#64748b' }}></i>
                    </div>
                  </Link>
                </div>
                <div className="position-relative" style={{ zIndex: 3 }}>
                  <Link to="#" className="d-block">
                    <div className="rounded-3 overflow-hidden shadow-lg" style={{ width: '240px', height: '340px' }}>
                      <div className="w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #334155, #1e293b)' }}>
                        <i className="bi bi-book display-1" style={{ color: '#64748b' }}></i>
                      </div>
                    </div>
                  </Link>
                  <div className="position-absolute top-0 end-0 rounded-3 shadow px-3 py-2" style={{ transform: 'translate(20px, -12px)', zIndex: 10, background: 'rgba(255,255,255,0.95)' }}>
                    <small className="text-uppercase fw-medium" style={{ fontSize: '0.6rem', color: '#64748b' }}>Save up to</small>
                    <span className="fw-bold fs-5 ms-1" style={{ color: '#17A34A' }}>50%</span>
                  </div>
                </div>
                <div className="position-absolute" style={{ right: '40px', transform: 'rotate(8deg) translateY(20px)', zIndex: 1, opacity: 0.7 }}>
                  <Link to="#" className="d-block rounded-3 overflow-hidden shadow" style={{ width: '160px', height: '230px' }}>
                    <div className="w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #334155, #1e293b)' }}>
                      <i className="bi bi-book fs-1" style={{ color: '#64748b' }}></i>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="position-absolute bottom-0 start-0 end-0" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: '40px' }}>
            <path d="M0,60 L0,20 Q360,0 720,30 Q1080,60 1440,10 L1440,60 Z" fill="#f5f5f5"></path>
          </svg>
        </div>
      </section>

      <div className="container py-5" id="catalog">
        <div className="mb-4">
          <h2 className="fw-bold mb-1">Our Collection</h2>
          <p className="text-secondary mb-0">Explore all {products.length} books in our catalog</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {products.length > 0 && (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {products.map(product => (
              <div className="col" key={product.id}>
                <div className="card h-100 border shadow-sm book-card">
                  <Link to={`/customer/product/${product.id}`} className="text-decoration-none">
                    <div style={{ aspectRatio: '3/4', overflow: 'hidden' }}>
                      {product.imageUrl ? (
                        <img src={product.imageUrl} className="w-100 h-100" style={{ objectFit: 'cover' }} alt={product.title} />
                      ) : (
                        <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-light">
                          <i className="bi bi-book display-3 text-secondary"></i>
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="card-body">
                    <span className="badge bg-secondary mb-2">{product.category.name}</span>
                    <h6 className="card-title fw-semibold mb-2" style={{ minHeight: '2.5rem' }}>
                      <Link to={`/customer/product/${product.id}`} className="text-decoration-none text-dark">
                        {product.title}
                      </Link>
                    </h6>
                    <p className="text-secondary small mb-2">by {product.author}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="fw-bold text-success">${product.price.toFixed(2)}</span>
                        {product.listPrice > product.price && (
                          <small className="text-decoration-line-through text-muted ms-1">${product.listPrice.toFixed(2)}</small>
                        )}
                      </div>
                      <Link to={`/customer/product/${product.id}`} className="btn btn-sm btn-outline-dark">
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <section className="py-5" style={{ background: 'linear-gradient(135deg, #065f46 0%, #191414 100%)' }}>
        <div className="container">
          <div className="row justify-content-center text-center text-white">
            <div className="col-lg-8">
              <i className="bi bi-envelope-heart display-4 mb-3"></i>
              <h3 className="fw-bold mb-3">Stay Updated</h3>
              <p className="lead mb-4" style={{ color: '#94a3b8' }}>
                Subscribe to get special offers, free giveaways, and exclusive deals.
              </p>
              <form className="row g-2 justify-content-center" onSubmit={e => e.preventDefault()}>
                <div className="col-md-6">
                  <input type="email" name="email" className="form-control form-control-lg" placeholder="Your email address" required />
                </div>
                <div className="col-md-auto">
                  <button type="submit" className="btn btn-accent btn-lg px-4">
                    Subscribe
                  </button>
                </div>
              </form>
              <p className="small mt-3 mb-0" style={{ color: '#94a3b8' }}>
                <i className="bi bi-shield-check me-1"></i> We respect your privacy
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
