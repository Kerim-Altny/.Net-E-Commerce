import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import { isAuthenticated, hasRole, logout } from '../../utils/auth';
import type { Cart } from '../../types/Cart';

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const authed = isAuthenticated();
  const isAdmin = hasRole('Admin');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (!authed) {
      setCartCount(0);
      return;
    }
    axiosClient
      .get<Cart>('/api/cart')
      .then((res) => setCartCount(res.data.items.reduce((sum, item) => sum + item.quantity, 0)))
      .catch(() => setCartCount(0));
  }, [authed, location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className="sticky-top">
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#191414' }}>
          <div className="container">
            <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
              <div className="d-flex align-items-center justify-content-center rounded" style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.2)' }}>
                <img src="/images/book.png" style={{ width: '24px', height: '24px' }} alt="logo" />
              </div>
              <span className="fw-bold fs-5 d-none d-sm-inline">Ashka<span style={{ color: '#1DB954' }}>Book</span></span>
            </Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
              aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                {isAdmin && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/dashboard">
                      <i className="bi bi-speedometer2 me-1"></i> Admin Portal
                    </Link>
                  </li>
                )}
              </ul>
              <div className="d-flex align-items-center gap-3">
                <Link className="nav-link" to="/cart">
                  <i className="bi bi-cart"></i> &nbsp;({cartCount})
                </Link>
                <ul className="navbar-nav">
                  {authed ? (
                    <li className="nav-item">
                      <button type="button" className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                    </li>
                  ) : (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" to="/identity/register">Register</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/identity/login">Login</Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className="flex-grow-1">
        <main role="main">
          <Outlet />
        </main>
      </div>

      <footer className="mt-auto py-4" style={{ background: '#0D0D0D' }}>
        <div className="container">
          <div className="row align-items-center gy-3">
            <div className="col-sm-4 d-flex align-items-center gap-3">
              <div className="d-flex align-items-center justify-content-center rounded-circle" style={{ width: '40px', height: '40px', background: '#17A34A' }}>
                <i className="bi bi-book fs-5" style={{ color: '#0D0D0D' }}></i>
              </div>
              <div>
                <p className="mb-0 fw-semibold text-white small">AshkaBook</p>
                <p className="mb-0 text-secondary" style={{ fontSize: '0.75rem' }}>Your Gateway to Endless Stories</p>
              </div>
            </div>
            <div className="col-sm-4 text-center">
              <p className="mb-0 text-secondary small">&copy; {new Date().getFullYear()} AshkaBook. All rights reserved.</p>
              <p className="mb-0 text-secondary" style={{ fontSize: '0.75rem' }}>Made with <i className="bi bi-heart mx-1" style={{ color: '#17A34A' }}></i> by DotNetMastery</p>
            </div>
            <div className="col-sm-4 d-flex justify-content-sm-end justify-content-center gap-2">
              <a href="#" className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', background: 'rgba(255,255,255,0.1)' }}>
                <i className="bi bi-twitter-x text-secondary small"></i>
              </a>
              <a href="#" className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', background: 'rgba(255,255,255,0.1)' }}>
                <i className="bi bi-facebook text-secondary small"></i>
              </a>
              <a href="#" className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', background: 'rgba(255,255,255,0.1)' }}>
                <i className="bi bi-instagram text-secondary small"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
