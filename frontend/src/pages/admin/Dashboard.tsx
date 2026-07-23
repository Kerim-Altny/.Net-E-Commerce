import { useEffect } from 'react';

export default function Dashboard() {
  const data = {
    totalRevenue: '$15,400.00',
    totalOrders: 124,
    totalProducts: 45,
    totalUsers: 890
  };

  useEffect(() => {
    // In a real app we'd initialize charts here.
    // For now we just load the UI structure.
  }, []);

  return (
    <>
      <div className="mb-4">
        <h1 className="h4 fw-bold">Welcome back! 👋</h1>
        <p className="text-secondary small mb-0">Here's what's happening with your store.</p>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-sm-6 col-lg-3">
          <div className="card border shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <div className="rounded d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', background: '#dbeafe' }}>
                  <i className="bi bi-currency-dollar" style={{ color: '#3b82f6' }}></i>
                </div>
                <span className="text-uppercase fw-semibold text-secondary" style={{ fontSize: '0.6rem', letterSpacing: '0.05em' }}>Revenue</span>
              </div>
              <p className="h4 fw-bold mb-0">{data.totalRevenue}</p>
              <p className="text-secondary mb-0" style={{ fontSize: '0.75rem' }}>From approved orders</p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <a href="/admin/order" className="card border shadow-sm h-100 text-decoration-none">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <div className="rounded d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', background: '#d1fae5' }}>
                  <i className="bi bi-truck" style={{ color: '#10b981' }}></i>
                </div>
                <span className="text-uppercase fw-semibold text-secondary" style={{ fontSize: '0.6rem', letterSpacing: '0.05em' }}>Orders</span>
              </div>
              <p className="h4 fw-bold text-dark mb-0">{data.totalOrders}</p>
              <p className="text-secondary mb-0" style={{ fontSize: '0.75rem' }}>View all orders &rarr;</p>
            </div>
          </a>
        </div>
        <div className="col-sm-6 col-lg-3">
          <a href="/admin/product" className="card border shadow-sm h-100 text-decoration-none">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <div className="rounded d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', background: '#f3e8ff' }}>
                  <i className="bi bi-book" style={{ color: '#8b5cf6' }}></i>
                </div>
                <span className="text-uppercase fw-semibold text-secondary" style={{ fontSize: '0.6rem', letterSpacing: '0.05em' }}>Products</span>
              </div>
              <p className="h4 fw-bold text-dark mb-0">{data.totalProducts}</p>
              <p className="text-secondary mb-0" style={{ fontSize: '0.75rem' }}>Manage products &rarr;</p>
            </div>
          </a>
        </div>
        <div className="col-sm-6 col-lg-3">
          <a href="/admin/user" className="card border shadow-sm h-100 text-decoration-none">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <div className="rounded d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', background: '#fef3c7' }}>
                  <i className="bi bi-people" style={{ color: '#f59e0b' }}></i>
                </div>
                <span className="text-uppercase fw-semibold text-secondary" style={{ fontSize: '0.6rem', letterSpacing: '0.05em' }}>Users</span>
              </div>
              <p className="h4 fw-bold text-dark mb-0">{data.totalUsers}</p>
              <p className="text-secondary mb-0" style={{ fontSize: '0.75rem' }}>Manage users &rarr;</p>
            </div>
          </a>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="row g-3 mb-4">
        <div className="col-lg-6">
          <div className="card border shadow-sm">
            <div className="card-body">
              <h6 className="fw-semibold mb-3"><i className="bi bi-graph-up me-1" style={{ color: '#3b82f6' }}></i> Revenue Trend</h6>
              <div style={{ height: '250px' }}>
                <canvas id="revenueChart"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card border shadow-sm">
            <div className="card-body">
              <h6 className="fw-semibold mb-3"><i className="bi bi-bar-chart me-1" style={{ color: '#10b981' }}></i> Orders Per Month</h6>
              <div style={{ height: '250px' }}>
                <canvas id="ordersChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="card border shadow-sm">
            <div className="card-body">
              <h6 className="fw-semibold mb-3"><i className="bi bi-circle-half me-1" style={{ color: '#f59e0b' }}></i> Order Status</h6>
              <div style={{ height: '200px' }} className="d-flex align-items-center justify-content-center">
                <canvas id="statusChart"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card border shadow-sm">
            <div className="card-body">
              <h6 className="fw-semibold mb-3"><i className="bi bi-tags me-1" style={{ color: '#8b5cf6' }}></i> Products by Category</h6>
              <div style={{ height: '200px' }} className="d-flex align-items-center justify-content-center">
                <canvas id="categoryChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
