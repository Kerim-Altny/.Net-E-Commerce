import { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import type { DashboardData } from '../../types/Dashboard';

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axiosClient
      .get<DashboardData>('/api/admin/dashboard')
      .then((res) => setData(res.data))
      .catch(() => setError('Dashboard verileri yüklenirken bir hata oluştu.'));
  }, []);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!data) {
    return <div>Yükleniyor...</div>;
  }

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
              <p className="h4 fw-bold mb-0">${data.totalRevenue.toFixed(2)}</p>
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

      {/* Revenue Trend */}
      <div className="row g-3 mb-4">
        <div className="col-12">
          <div className="card border shadow-sm">
            <div className="card-body">
              <h6 className="fw-semibold mb-3"><i className="bi bi-graph-up me-1" style={{ color: '#3b82f6' }}></i> Revenue Trend (Last 12 Months)</h6>
              <div className="d-flex align-items-end gap-2" style={{ height: '200px' }}>
                {data.monthlyRevenue.map((m) => {
                  const max = Math.max(...data.monthlyRevenue.map((x) => x.revenue), 1);
                  const heightPct = (m.revenue / max) * 100;
                  return (
                    <div key={`${m.year}-${m.month}`} className="d-flex flex-column align-items-center flex-grow-1" style={{ height: '100%' }}>
                      <div className="flex-grow-1 d-flex align-items-end w-100">
                        <div className="w-100 rounded-top" style={{ height: `${heightPct}%`, minHeight: '2px', background: '#3b82f6' }} title={`$${m.revenue.toFixed(2)}`}></div>
                      </div>
                      <span className="text-secondary mt-1" style={{ fontSize: '0.6rem' }}>{m.month}/{String(m.year).slice(-2)}</span>
                    </div>
                  );
                })}
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
              {Object.entries(data.orderByStatus).map(([status, count]) => {
                const max = Math.max(...Object.values(data.orderByStatus), 1);
                return (
                  <div key={status} className="mb-2">
                    <div className="d-flex justify-content-between" style={{ fontSize: '0.75rem' }}>
                      <span>{status}</span>
                      <span className="fw-semibold">{count}</span>
                    </div>
                    <div className="progress" style={{ height: '6px' }}>
                      <div className="progress-bar bg-warning" style={{ width: `${(count / max) * 100}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card border shadow-sm">
            <div className="card-body">
              <h6 className="fw-semibold mb-3"><i className="bi bi-tags me-1" style={{ color: '#8b5cf6' }}></i> Products by Category</h6>
              {Object.entries(data.productCountByCategory).map(([category, count]) => {
                const max = Math.max(...Object.values(data.productCountByCategory), 1);
                return (
                  <div key={category} className="mb-2">
                    <div className="d-flex justify-content-between" style={{ fontSize: '0.75rem' }}>
                      <span>{category}</span>
                      <span className="fw-semibold">{count}</span>
                    </div>
                    <div className="progress" style={{ height: '6px' }}>
                      <div className="progress-bar" style={{ width: `${(count / max) * 100}%`, background: '#8b5cf6' }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
