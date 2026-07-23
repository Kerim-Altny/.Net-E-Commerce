import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      product: {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        imageUrl: ''
      },
      price: 12.00,
      count: 2
    }
  ]);

  const orderTotal = cartItems.reduce((acc, item) => acc + (item.price * item.count), 0);
  const itemCount = cartItems.length;

  const updateCart = (id: number, count: number) => {
    if (count < 1) return;
    setCartItems(cartItems.map(item => item.id === id ? { ...item, count } : item));
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="container py-4" style={{ maxWidth: '1140px' }}>
      <form onSubmit={(e) => e.preventDefault()}>
        <Link to="/" className="text-decoration-none text-secondary small fw-medium d-inline-flex align-items-center gap-1 mb-3">
          <i className="bi bi-arrow-left"></i> Continue Shopping
        </Link>

        <div className="row g-4 align-items-start">
          {/* ============ LEFT: Items ============ */}
          <div className="col-lg-7">
            <div className="card border shadow-sm overflow-hidden">
              <div className="card-header text-white d-flex align-items-center justify-content-between py-3 px-4" style={{ background: 'linear-gradient(to right, #065f46, #282828, #191414)' }}>
                <h5 className="mb-0 fw-bold"><i className="bi bi-bag me-2"></i>Your Items</h5>
                <span className="badge rounded-pill bg-white bg-opacity-25 text-white">{itemCount}</span>
              </div>

              {itemCount === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-cart-x display-4 text-secondary"></i>
                  <p className="text-secondary mt-3 mb-0">Your cart is empty</p>
                </div>
              ) : (
                <div className="cart-items-scroll">
                  {cartItems.map(item => (
                    <div key={item.id} className="d-flex gap-3 px-4 py-3 border-bottom cart-item">
                      {/* Thumbnail */}
                      <Link to="#" className="flex-shrink-0">
                        <div className="rounded overflow-hidden" style={{ width: '56px', height: '72px' }}>
                          {item.product.imageUrl ? (
                            <img src={item.product.imageUrl} className="w-100 h-100" alt="Product" />
                          ) : (
                            <img src="https://placehold.co/56x72" className="w-100 h-100" style={{ objectFit: 'cover' }} alt="Product" />
                          )}
                        </div>
                      </Link>

                      {/* Info */}
                      <div className="flex-grow-1" style={{ minWidth: 0 }}>
                        <Link to="#" className="fw-semibold text-decoration-none d-block text-truncate" style={{ fontSize: '0.85rem' }}>
                          {item.product.title}
                        </Link>
                        <p className="text-secondary mb-2" style={{ fontSize: '0.7rem' }}>by {item.product.author} &middot; ${item.price.toFixed(2)} each</p>

                        <div className="d-flex align-items-center gap-2">
                          <div className="input-group" style={{ width: '130px' }}>
                            <button type="button" className="btn btn-outline-secondary btn-sm px-2" onClick={() => updateCart(item.id, item.count - 1)}><i className="bi bi-dash"></i></button>
                            <input type="number" value={item.count} min="1"
                              className="form-control form-control-sm text-center fw-bold"
                              style={{ minWidth: '52px' }}
                              onChange={(e) => updateCart(item.id, parseInt(e.target.value))} />
                            <button type="button" className="btn btn-outline-success btn-sm px-2" onClick={() => updateCart(item.id, item.count + 1)}><i className="bi bi-plus-lg"></i></button>
                          </div>
                        </div>
                      </div>

                      {/* Price + Remove */}
                      <div className="text-end flex-shrink-0 d-flex flex-column justify-content-between align-self-stretch">
                        <span className="fw-bold" style={{ fontSize: '0.9rem' }}>${(item.price * item.count).toFixed(2)}</span>
                        <button type="button" onClick={() => removeItem(item.id)} className="btn btn-link text-danger text-decoration-none p-0 d-inline-flex align-items-center gap-1" style={{ fontSize: '0.7rem' }}>
                          <i className="bi bi-trash3"></i> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ============ RIGHT: Checkout sidebar ============ */}
          <div className="col-lg-5">
            <div className="position-lg-sticky" style={{ top: '80px' }}>
              <div className="card border shadow-sm overflow-hidden">
                {/* Shipping */}
                <div className="px-4 pt-4 pb-3">
                  <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
                    <i className="bi bi-file-person" style={{ color: '#17A34A' }}></i> Name and Phone
                  </h6>
                  <div className="row g-2 mb-2">
                    <div className="col-6">
                      <input className="form-control form-control-sm" placeholder="Full Name" />
                    </div>
                    <div className="col-6">
                      <input className="form-control form-control-sm" placeholder="Phone" />
                    </div>
                  </div>
                  <h6 className="fw-bold mb-3 d-flex align-items-center gap-2 pt-3">
                    <i className="bi bi-geo-alt" style={{ color: '#17A34A' }}></i> Shipping Address
                  </h6>
                  <div className="mb-2">
                    <input className="form-control form-control-sm" placeholder="Street Address" />
                  </div>
                  <div className="row g-2">
                    <div className="col-5">
                      <input className="form-control form-control-sm" placeholder="City" />
                    </div>
                    <div className="col-3">
                      <input className="form-control form-control-sm" placeholder="State" />
                    </div>
                    <div className="col-4">
                      <input className="form-control form-control-sm" placeholder="Zip Code" />
                    </div>
                  </div>
                </div>

                <hr className="my-0 mx-4" />

                {/* Summary */}
                <div className="px-4 py-3">
                  <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
                    <i className="bi bi-receipt" style={{ color: '#17A34A' }}></i> Order Summary
                  </h6>
                  {cartItems.map(item => (
                    <div key={item.id} className="d-flex justify-content-between mb-1" style={{ fontSize: '0.8rem' }}>
                      <span className="text-secondary text-truncate me-2">{item.product.title} &times; {item.count}</span>
                      <span className="fw-medium flex-shrink-0">${(item.price * item.count).toFixed(2)}</span>
                    </div>
                  ))}
                  <hr className="my-2" />
                  <div className="d-flex justify-content-between" style={{ fontSize: '0.8rem' }}>
                    <span className="text-secondary">Shipping</span>
                    <span className="fw-semibold" style={{ color: '#17A34A' }}>Free</span>
                  </div>
                </div>

                {/* Total bar */}
                <div className="d-flex justify-content-between align-items-center px-4 py-3 text-white" style={{ background: 'linear-gradient(to right, #065f46, #282828, #191414)' }}>
                  <span className="text-uppercase fw-semibold small">Total</span>
                  <span className="fw-bold fs-5">${orderTotal.toFixed(2)}</span>
                </div>

                {/* Place Order */}
                <div className="p-4">
                  <button type="submit" className="btn btn-accent w-100 fw-semibold py-2 d-flex align-items-center justify-content-center gap-2">
                    <i className="bi bi-lock"></i> Place Order
                  </button>
                  <div className="d-flex justify-content-center gap-3 mt-3 text-secondary" style={{ fontSize: '0.7rem' }}>
                    <span><i className="bi bi-shield-check me-1"></i>Secure</span>
                    <span><i className="bi bi-truck me-1"></i>Free Shipping</span>
                    <span><i className="bi bi-arrow-counterclockwise me-1"></i>Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
