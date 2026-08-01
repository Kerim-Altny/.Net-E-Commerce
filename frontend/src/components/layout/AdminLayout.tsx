import { Link, Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../../utils/auth';

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <div className="d-lg-none sticky-top border-bottom" style={{ background: '#191414', borderColor: 'rgba(255,255,255,0.1) !important' }}>
        <div className="d-flex align-items-center justify-content-between px-3 py-2">
          <button className="btn btn-link text-white-50 p-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarOffcanvas">
            <i className="bi bi-list fs-4"></i>
          </button>
          <span className="fw-semibold text-white">Admin Panel</span>
          <button id="themeToggleMobile" className="btn btn-link text-white-50 p-0" type="button">
            <i className="bi bi-moon-stars"></i>
          </button>
        </div>
      </div>

      <div className="offcanvas offcanvas-start" tabIndex={-1} id="sidebarOffcanvas" style={{ background: '#191414' }}>
        <div className="offcanvas-header border-bottom" style={{ borderColor: 'rgba(255,255,255,0.1) !important' }}>
          <h6 className="mb-0 fw-semibold text-white">AshkaBook <small className="text-success">Admin</small></h6>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body p-3">
          <AdminSidebarNav />
        </div>
      </div>

      <div className="d-flex">
        <aside className="admin-sidebar d-none d-lg-flex flex-column position-sticky top-0" style={{ height: '100vh', width: '240px', background: '#191414', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="p-3 border-bottom" style={{ borderColor: 'rgba(255,255,255,0.1) !important' }}>
            <h6 className="mb-0 fw-semibold text-white">AshkaBook <small className="text-success">Admin</small></h6>
          </div>

          <nav className="flex-grow-1 overflow-auto p-3">
            <AdminSidebarNav />
          </nav>

          <div className="border-top p-3" style={{ borderColor: 'rgba(255,255,255,0.1) !important' }}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <i className="bi bi-person-circle" style={{ color: '#94a3b8' }}></i>
              <span className="small text-truncate flex-grow-1 text-white">Admin User</span>
              <button id="themeToggle" className="btn btn-sm btn-link p-0" style={{ color: '#94a3b8' }} type="button" title="Toggle theme">
                <i className="bi bi-moon-stars" id="themeIcon"></i>
              </button>
            </div>
            <div className="d-flex gap-2">
              <Link to="/" className="btn btn-sm btn-outline-light flex-grow-1">
                <i className="bi bi-shop"></i> Store
              </Link>
              <button type="button" className="btn btn-sm btn-outline-danger" title="Logout" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right"></i>
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-grow-1">
          <div className="p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}

function AdminSidebarNav() {
  return (
    <div className="admin-sidebar-nav">
      <p className="nav-section mb-1" style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', padding: '0.5rem 0.75rem', marginTop: '0.75rem' }}>Overview</p>
      <Link to="/admin/dashboard" className="nav-link d-flex align-items-center gap-2" style={{ color: '#94a3b8', fontSize: '0.875rem', padding: '0.5rem 0.75rem', borderRadius: '0.375rem', textDecoration: 'none' }}>
        <i className="bi bi-graph-up"></i> Dashboard
      </Link>

      <p className="nav-section mb-1" style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', padding: '0.5rem 0.75rem', marginTop: '0.75rem' }}>Commerce</p>
      <Link to="/admin/order" className="nav-link d-flex align-items-center gap-2" style={{ color: '#94a3b8', fontSize: '0.875rem', padding: '0.5rem 0.75rem', borderRadius: '0.375rem', textDecoration: 'none' }}>
        <i className="bi bi-truck"></i> Orders
      </Link>
      <Link to="/admin/product" className="nav-link d-flex align-items-center gap-2" style={{ color: '#94a3b8', fontSize: '0.875rem', padding: '0.5rem 0.75rem', borderRadius: '0.375rem', textDecoration: 'none' }}>
        <i className="bi bi-book"></i> Products
      </Link>
      <Link to="/admin/category" className="nav-link d-flex align-items-center gap-2" style={{ color: '#94a3b8', fontSize: '0.875rem', padding: '0.5rem 0.75rem', borderRadius: '0.375rem', textDecoration: 'none' }}>
        <i className="bi bi-tags"></i> Categories
      </Link>

      <p className="nav-section mb-1" style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', padding: '0.5rem 0.75rem', marginTop: '0.75rem' }}>Management</p>
      <Link to="/admin/user" className="nav-link d-flex align-items-center gap-2" style={{ color: '#94a3b8', fontSize: '0.875rem', padding: '0.5rem 0.75rem', borderRadius: '0.375rem', textDecoration: 'none' }}>
        <i className="bi bi-people"></i> Users
      </Link>
    </div>
  );
}
