import { Link } from 'react-router-dom';

export default function OrderSuccess() {
  return (
    <div className="container py-5" style={{ maxWidth: '720px' }}>
      <div className="card border-0 shadow-sm text-center">
        <div className="card-body p-5">
          <img
            src="/images/confirmed.png"
            alt="Order confirmed"
            className="mb-4"
            style={{ maxWidth: '160px' }}
          />

          <h2 className="fw-bold mb-2">Thank you for your order!</h2>
          <p className="text-secondary mb-4">
            Your payment was received and your order is being prepared. A confirmation email is on its way.
          </p>

          <div className="alert alert-light border d-inline-flex align-items-center gap-2 text-secondary small mb-4">
            <i className="bi bi-info-circle"></i>
            Stripe confirms the payment on our server, so the order status may take a moment to update.
          </div>

          <div className="d-flex flex-wrap justify-content-center gap-2">
            <Link to="/" className="btn btn-success px-4">
              <i className="bi bi-bag me-1"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
