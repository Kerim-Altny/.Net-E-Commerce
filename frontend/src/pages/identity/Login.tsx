import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border overflow-hidden">
            <div className="card-header text-white py-3 px-4 text-center" style={{ background: 'linear-gradient(to right, #065f46, #282828, #191414)' }}>
              <i className="bi bi-box-arrow-in-right display-4"></i>
              <h4 className="fw-bold mt-2 mb-1">Welcome Back</h4>
              <p className="mb-0 small" style={{ color: '#1DB954' }}>Log in to your account</p>
            </div>

            <div className="card-body p-5">
              <form onSubmit={e => e.preventDefault()}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control form-control-lg" placeholder="name@example.com" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control form-control-lg" placeholder="••••••••" />
                </div>

                <div className="form-check mb-3">
                  <input type="checkbox" className="form-check-input" id="rememberMe" />
                  <label className="form-check-label" htmlFor="rememberMe">Remember me?</label>
                </div>

                <button type="submit" className="btn btn-accent btn-lg w-100 mb-3">
                  <i className="bi bi-box-arrow-in-right me-2"></i>Log In
                </button>

                <div className="text-center">
                  <a href="#" className="text-decoration-none">Forgot your password?</a>
                </div>
              </form>

              <hr className="my-4" />

              <div className="text-center">
                <p className="mb-0">Don't have an account? <Link to="/identity/register" className="fw-semibold text-decoration-none" style={{ color: '#17A34A' }}>Register now</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
