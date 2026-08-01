import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import { getErrorMessage } from '../../utils/getErrorMessage';
import type { Order } from '../../types/Order';

// UI'daki "approved" etiketi, backend'deki OrderStatus enum'ında "Paid" olarak adlandırılmış.
const FILTER_TO_STATUS: Record<string, string | undefined> = {
  all: undefined,
  pending: 'Pending',
  approved: 'Paid',
  processing: 'Processing',
  shipped: 'Shipped',
  cancelled: 'Cancelled',
};

const STATUS_OPTIONS = ['Pending', 'Paid', 'Processing', 'Shipped', 'Cancelled'];

export default function OrderList() {
  const [filter, setFilter] = useState('all');
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadOrders = (currentFilter: string) => {
    const status = FILTER_TO_STATUS[currentFilter];
    axiosClient
      .get<Order[]>('/api/admin/orders', { params: status ? { status } : {} })
      .then((res) => setOrders(res.data))
      .catch(() => setError('Siparişler yüklenirken bir hata oluştu.'));
  };

  useEffect(() => {
    loadOrders(filter);
  }, [filter]);

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      await axiosClient.put(`/api/admin/orders/${orderId}/status`, { newStatus });
      loadOrders(filter);
    } catch (err) {
      setError(getErrorMessage(err, 'Sipariş durumu güncellenirken bir hata oluştu.'));
    }
  };

  const filteredOrders = orders;

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
        {error && <div className="alert alert-danger m-3 mb-0">{error}</div>}
        <div className="table-responsive p-3">
          <table className="table table-striped table-hover table-styled">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Total</th>
                <th className="text-end">Update Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.shippingFullName}</td>
                  <td>{order.shippingPhoneNumber}</td>
                  <td><span className={`badge ${order.status === 'Paid' ? 'bg-success' : 'bg-warning'}`}>{order.status}</span></td>
                  <td>${order.totalAmount.toFixed(2)}</td>
                  <td className="text-end">
                    <select
                      className="form-select form-select-sm d-inline-block w-auto"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      {STATUS_OPTIONS.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
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
