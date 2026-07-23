import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className="container mb-4">
      <div className="row justify-content-center mt-5 mb-5">
        <div className="col-md-8 col-lg-7">
          <div className="card shadow-sm border overflow-hidden">
            <div className="card-header text-white py-3 px-4 text-center" style={{ background: 'linear-gradient(to right, #065f46, #282828, #191414)' }}>
              <i className="bi bi-person-plus-fill display-4"></i>
              <h4 className="fw-bold mt-2 mb-1">Create Account</h4>
              <p className="mb-0 small" style={{ color: '#1DB954' }}>Join us today</p>
            </div>

            <div className="card-body p-5">
              <form onSubmit={e => e.preventDefault()}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Full Name</label>
                    <input className="form-control form-control-lg" placeholder="John Doe" />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control form-control-lg" placeholder="name@example.com" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder="••••••••" />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" placeholder="••••••••" />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input type="text" className="form-control" placeholder="(123) 456-7890" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Street Address</label>
                  <input type="text" className="form-control" placeholder="123 Main St" />
                </div>

                <div className="row">
                  <div className="col-md-5 mb-3">
                    <label className="form-label">City</label>
                    <input type="text" className="form-control" placeholder="New York" />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">State</label>
                    <input type="text" className="form-control" placeholder="NY" />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label className="form-label">Postal Code</label>
                    <input type="text" className="form-control" placeholder="10001" />
                  </div>
                </div>

                <button type="submit" className="btn btn-accent btn-lg w-100 mb-3">
                  <i className="bi bi-person-check me-2"></i>Register
                </button>
              </form>

              <hr className="my-4" />

              <div className="text-center">
                <p className="mb-0">Already have an account? <Link to="/identity/login" className="fw-semibold text-decoration-none" style={{ color: '#17A34A' }}>Log in</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
