import { Link } from 'react-router-dom';

export default function CategoryList() {
  const categories = [
    { id: 1, name: 'Action', displayOrder: 1 },
    { id: 2, name: 'Sci-Fi', displayOrder: 2 },
    { id: 3, name: 'History', displayOrder: 3 },
  ];

  return (
    <div className="container-fluid py-4">
      <div className="card border shadow-sm overflow-hidden">
        <div className="card-header text-white py-3 px-4 d-flex align-items-center justify-content-between" style={{ background: 'linear-gradient(to right, #065f46, #282828, #191414)' }}>
          <div>
            <h5 className="mb-0 fw-bold"><i className="bi bi-grid me-2"></i>Categories</h5>
            <p className="mb-0 small" style={{ color: '#1DB954' }}>Manage your product categories</p>
          </div>
          <Link to="/admin/category/create" className="btn btn-sm btn-outline-light fw-semibold d-inline-flex align-items-center gap-1">
            <i className="bi bi-plus-lg"></i> New Category
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table-styled table">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Display Order</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="fw-medium" style={{ color: '#1e293b' }}>{category.name}</td>
                  <td><span className="badge bg-light text-dark border">{category.displayOrder}</span></td>
                  <td className="text-end">
                    <Link to={`/admin/category/update/${category.id}`} className="btn btn-sm btn-outline-success me-1">
                      <i className="bi bi-pencil-square me-1"></i>Edit
                    </Link>
                    <button className="btn btn-sm btn-outline-danger">
                      <i className="bi bi-trash me-1"></i>Delete
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
