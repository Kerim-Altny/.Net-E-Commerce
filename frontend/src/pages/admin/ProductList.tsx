import { Link } from 'react-router-dom';

export default function ProductList() {
  const products = [
    { id: 1, title: 'The Great Gatsby', isbn: '978-0743273565', price: 12.00, author: 'F. Scott Fitzgerald', category: 'Classic' },
    { id: 2, title: '1984', isbn: '978-0451524935', price: 15.00, author: 'George Orwell', category: 'Dystopian' }
  ];

  return (
    <div className="container-fluid py-4">
      <div className="card border shadow-sm overflow-hidden">
        <div className="card-header text-white py-3 px-4 d-flex align-items-center justify-content-between" style={{ background: 'linear-gradient(to right, #065f46, #282828, #191414)' }}>
          <div>
            <h5 className="mb-0 fw-bold"><i className="bi bi-grid me-2"></i>Products</h5>
            <p className="mb-0 small" style={{ color: '#1DB954' }}>Manage your products</p>
          </div>
          <Link to="/admin/product/upsert" className="btn btn-sm btn-outline-light fw-semibold d-inline-flex align-items-center gap-1">
            <i className="bi bi-plus-lg"></i> New Product
          </Link>
        </div>
        <div className="table-responsive p-3">
          <table className="table table-striped table-hover table-styled">
            <thead>
              <tr>
                <th>Title</th>
                <th>ISBN</th>
                <th>Price</th>
                <th>Author</th>
                <th>Category</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>{product.isbn}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.author}</td>
                  <td>{product.category}</td>
                  <td className="text-end">
                    <Link to={`/admin/product/upsert/${product.id}`} className="btn btn-sm btn-outline-success me-1">
                      <i className="bi bi-pencil-square"></i>
                    </Link>
                    <button className="btn btn-sm btn-outline-danger">
                      <i className="bi bi-trash"></i>
                    </button>
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
