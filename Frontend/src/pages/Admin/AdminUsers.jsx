import { useState, useEffect } from 'react';
import {
  RiGroupLine,
  RiSearchLine,
  RiDeleteBinLine,
  RiEyeLine,
  RiShieldUserLine,
  RiUser3Line,
  RiCloseLine,
  RiPhoneLine,
  RiMailLine,
  RiCalendarLine,
} from 'react-icons/ri';
import api from '../../services/api';
import toast from 'react-hot-toast';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/users');
      setUsers(res.data || []);
    } catch (error) {
      toast.error('Failed to load registered users');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      await api.delete(`/admin/users/${deleteTarget.userId}`);
      toast.success(`User ${deleteTarget.fullName || deleteTarget.email} deleted successfully`);
      setDeleteTarget(null);
      fetchUsers();
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to delete user';
      toast.error(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredUsers = users.filter((u) => {
    const query = searchQuery.toLowerCase();
    const nameMatch = u.fullName && u.fullName.toLowerCase().includes(query);
    const emailMatch = u.email && u.email.toLowerCase().includes(query);
    const phoneMatch = u.phone && u.phone.includes(query);
    const roleMatch = u.role && u.role.toLowerCase().includes(query);
    return nameMatch || emailMatch || phoneMatch || roleMatch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-dark font-display">
            User Management
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            Overview of all registered Farmers and System Administrators ({users.length} Total Users)
          </p>
        </div>
      </div>

      {/* Search Bar & Filters */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-border-light flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-lg" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, phone..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-light text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary bg-bg-light/50"
          />
        </div>
        <div className="text-xs font-semibold text-text-muted">
          Showing <span className="text-text-dark font-bold">{filteredUsers.length}</span> of {users.length} Users
        </div>
      </div>

      {/* Users Table Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-border-light overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-primary font-semibold flex items-center justify-center space-x-2">
            <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Loading user accounts...</span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <RiGroupLine className="text-4xl text-text-muted mx-auto" />
            <p className="text-base font-bold text-text-dark">No users found</p>
            <p className="text-xs text-text-muted">Try adjusting your search filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-bg-light/60 border-b border-border-light text-[11px] font-extrabold uppercase tracking-wider text-text-muted">
                  <th className="py-4 px-6">User</th>
                  <th className="py-4 px-6">Email</th>
                  <th className="py-4 px-6">Phone</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6">Registered Date</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light text-sm font-medium">
                {filteredUsers.map((u) => (
                  <tr key={u.userId} className="hover:bg-bg-light/40 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs shrink-0">
                          {u.fullName ? u.fullName.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <span className="font-bold text-text-dark">{u.fullName || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-text-dark">{u.email}</td>
                    <td className="py-4 px-6 text-text-muted">{u.phone || 'N/A'}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center space-x-1.5 text-xs font-extrabold px-2.5 py-1 rounded-full ${
                        u.role === 'Admin' 
                          ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}>
                        {u.role === 'Admin' ? <RiShieldUserLine /> : <RiUser3Line />}
                        <span>{u.role || 'Farmer'}</span>
                      </span>
                    </td>
                    <td className="py-4 px-6 text-text-muted text-xs">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setSelectedUser(u)}
                          className="p-2 rounded-xl text-text-muted hover:text-primary hover:bg-primary/10 transition-colors"
                          title="View Details"
                        >
                          <RiEyeLine className="text-lg" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(u)}
                          className="p-2 rounded-xl text-text-muted hover:text-red-500 hover:bg-red-50 transition-colors"
                          title="Delete User"
                        >
                          <RiDeleteBinLine className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View User Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-6 animate-scale-up border border-border-light">
            <div className="flex items-center justify-between border-b border-border-light pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-base">
                  {selectedUser.fullName ? selectedUser.fullName.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-dark font-display">{selectedUser.fullName || 'User Profile'}</h3>
                  <p className="text-xs text-text-muted">User ID: #{selectedUser.userId}</p>
                </div>
              </div>
              <button onClick={() => setSelectedUser(null)} className="text-text-muted hover:text-text-dark">
                <RiCloseLine className="text-2xl" />
              </button>
            </div>

            <div className="space-y-3.5 text-sm">
              <div className="flex items-center space-x-3 p-3 bg-bg-light/60 rounded-xl">
                <RiMailLine className="text-primary text-lg shrink-0" />
                <div>
                  <p className="text-[11px] font-bold text-text-muted uppercase">Email Address</p>
                  <p className="font-semibold text-text-dark">{selectedUser.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-bg-light/60 rounded-xl">
                <RiPhoneLine className="text-primary text-lg shrink-0" />
                <div>
                  <p className="text-[11px] font-bold text-text-muted uppercase">Phone Number</p>
                  <p className="font-semibold text-text-dark">{selectedUser.phone || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-bg-light/60 rounded-xl">
                <RiShieldUserLine className="text-primary text-lg shrink-0" />
                <div>
                  <p className="text-[11px] font-bold text-text-muted uppercase">System Role</p>
                  <p className="font-semibold text-text-dark">{selectedUser.role || 'Farmer'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-bg-light/60 rounded-xl">
                <RiCalendarLine className="text-primary text-lg shrink-0" />
                <div>
                  <p className="text-[11px] font-bold text-text-muted uppercase">Joined Date</p>
                  <p className="font-semibold text-text-dark">{selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleString() : 'N/A'}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedUser(null)}
              className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 text-center space-y-5 animate-scale-up border border-border-light">
            <div className="w-14 h-14 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto">
              <RiDeleteBinLine className="text-2xl" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-dark font-display">Delete User Account?</h3>
              <p className="text-xs text-text-muted mt-1">
                Are you sure you want to delete <strong>{deleteTarget.fullName || deleteTarget.email}</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 text-sm font-semibold text-text-dark bg-bg-light rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                disabled={isDeleting}
                className="flex-1 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
