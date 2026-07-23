import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function OrderList() {
  const [filter, setFilter] = useState('all');

  const orders = [
    { id: 1, name: 'John Doe', phone: '123-456-7890', email: 'john@example.com', status: 'approved', total: 45.00 },
    { id: 2, name: 'Jane Smith', phone: '098-765-4321', email: 'jane@example.com', status: 'pending', total: 12.00 }
  ];

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  const getFilterClass = (status: string) => {
    return filter === status ? 'btn btn-sm text-white bg-success' : 'btn btn-outline-secondary btn-sm';
  };

  return (
    <div className="container-fluid py-4">
      <div className="card border shadow-sm overflow-hidden">
        <div className="card-header text-white py-3 px-4 d-flex align-items-center justify-content-between" style={{ background: 'linear-gradient(to right, #065f46, #282828, #191414)' }}>
          <div>
            <h5 className="mb-0 fw-bold"><i className="bi bi-grid me-2"></i>Orders</h5>
            <p className="mb-0 small" style={{ color: '#1DB954' }}>Manage your Orders</p>
          </div>
          <div className="d-flex flex-wrap align-items-center gap-2">
            <span className="text-uppercase fw-semibold me-1" style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: '#94a3b8' }}>Filter:</span>
            <button className={getFilterClass('all')} onClick={() => setFilter('all')}>All</button>
            <button className={getFilterClass('pending')} onClick={() => setFilter('pending')}>Pending</button>
            <button className={getFilterClass('approved')} onClick={() => setFilter('approved')}>Approved</button>
            <button className={getFilterClass('processing')} onClick={() => setFilter('processing')}>Processing</button>
            <button className={getFilterClass('shipped')} onClick={() => setFilter('shipped')}>Shipped</button>
            <button className={getFilterClass('cancelled')} onClick={() => setFilter('cancelled')}>Cancelled</button>
          </div>
        </div>
        <div className="table-responsive p-3">
          <table className="table table-striped table-hover table-styled">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Status</th>
                <th>Total</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.name}</td>
                  <td>{order.phone}</td>
                  <td>{order.email}</td>
                  <td><span className={`badge ${order.status === 'approved' ? 'bg-success' : 'bg-warning'}`}>{order.status}</span></td>
                  <td>${order.total.toFixed(2)}</td>
                  <td className="text-end">
                    <Link to={`/admin/order/details/${order.id}`} className="btn btn-sm btn-outline-info">
                      <i className="bi bi-eye"></i> Details
                    </Link>
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
