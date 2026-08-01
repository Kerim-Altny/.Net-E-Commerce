import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import type { Order } from '../../types/Order';

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axiosClient
      .get<Order[]>('/api/admin/orders')
      .then((res) => {
        const found = res.data.find((o) => o.id === Number(id));
        if (!found) {
          setError('Sipariş bulunamadı.');
          return;
        }
        setOrder(found);
      })
      .catch(() => setError('Sipariş yüklenirken bir hata oluştu.'));
  }, [id]);

  if (error) {
    return (
      <div className="container-fluid py-4">
        <div className="alert alert-danger">{error}</div>
        <Link to="/admin/order" className="btn btn-outline-secondary">Back to Orders</Link>
      </div>
    );
  }

  if (!order) {
    return <div className="container-fluid py-4">Yükleniyor...</div>;
  }

  return (
    <div className="container-fluid py-4">
      <Link to="/admin/order" className="text-decoration-none text-secondary small d-inline-flex align-items-center gap-1 mb-3">
        <i className="bi bi-arrow-left"></i> Back to Orders
      </Link>

      <div className="card border shadow-sm overflow-hidden">
        <div className="card-header text-white py-3 px-4" style={{ background: 'linear-gradient(to right, #065f46, #282828, #191414)' }}>
          <h5 className="mb-0 fw-bold">Order #{order.id}</h5>
        </div>
        <div className="card-body p-4">
          <div className="row mb-4">
            <div className="col-md-6">
              <h6 className="fw-bold">Shipping Info</h6>
              <p className="mb-1">{order.shippingFullName}</p>
              <p className="mb-1">{order.shippingPhoneNumber}</p>
              <p className="mb-1">{order.shippingStreet}</p>
              <p className="mb-1">{order.shippingCity}, {order.shippingState} {order.shippingPostalCode}</p>
            </div>
            <div className="col-md-6 text-md-end">
              <h6 className="fw-bold">Order Info</h6>
              <p className="mb-1">Date: {new Date(order.orderDate).toLocaleString()}</p>
              <p className="mb-1">Status: <span className="badge bg-secondary">{order.status}</span></p>
              <p className="mb-1">Total: <strong>${order.totalAmount.toFixed(2)}</strong></p>
            </div>
          </div>

          <h6 className="fw-bold mb-3">Items</h6>
          <table className="table table-striped table-styled">
            <thead>
              <tr>
                <th>Product</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th className="text-end">Line Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map(item => (
                <tr key={item.id}>
                  <td>{item.productTitle}</td>
                  <td>${item.unitPrice.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td className="text-end">${item.lineTotal.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
