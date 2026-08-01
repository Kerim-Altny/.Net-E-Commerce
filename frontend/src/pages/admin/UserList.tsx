import { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import type { User } from '../../types/User';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axiosClient
      .get<User[]>('/api/admin/users')
      .then((res) => setUsers(res.data))
      .catch(() => setError('Kullanıcılar yüklenirken bir hata oluştu.'));
  }, []);

  return (
    <div className="container-fluid py-4">
      <div className="card border shadow-sm overflow-hidden">
        <div className="card-header text-white py-3 px-4" style={{ background: 'linear-gradient(to right, #065f46, #282828, #191414)' }}>
          <h5 className="mb-0 fw-bold"><i className="bi bi-people me-2"></i>Users</h5>
          <p className="mb-0 small" style={{ color: '#1DB954' }}>All registered users</p>
        </div>
        {error && <div className="alert alert-danger m-3 mb-0">{error}</div>}
        <div className="table-responsive p-3">
          <table className="table table-striped table-hover table-styled">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
