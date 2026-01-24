import React, { useState } from 'react';
import { Filter, MoreHorizontal, Shield, UserCheck, Trash2, Plus } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { motion, AnimatePresence } from 'framer-motion';

const UserManagement = () => {
    const { users, deleteUser, addUser } = useAdmin();
    const [filterRole, setFilterRole] = useState('All');

    const filteredUsers = filterRole === 'All'
        ? users
        : users.filter(user => user.role === filterRole);

    const handleAddUser = () => {
        // For a "real live project" feel without a complex form UI building session right now,
        // we'll simulate adding a realistic user. In a full iteration, this would be a modal form.
        const names = ['Michael Scott', 'Dwight Schrute', 'Pam Beesly', 'Jim Halpert'];
        const roles = ['Influencer', 'Brand'];
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomRole = roles[Math.floor(Math.random() * roles.length)];

        addUser({
            name: `${randomName} ${Math.floor(Math.random() * 100)}`,
            email: `${randomName.toLowerCase().replace(' ', '.')}@example.com`,
            role: randomRole,
            status: 'Active'
        });
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">User Management</h2>
                    <p className="text-gray-500 mt-1">Manage influencers and brands.</p>
                </div>
                <div className="flex gap-3">
                    <div className="flex bg-white border border-gray-200 rounded-xl p-1">
                        {['All', 'Influencer', 'Brand'].map(role => (
                            <button
                                key={role}
                                onClick={() => setFilterRole(role)}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${filterRole === role ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {role}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={handleAddUser}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Add Demo User
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
                <table className="w-full">
                    <thead className="bg-gray-50/50">
                        <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Joined</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <AnimatePresence>
                            {filteredUsers.map((user) => (
                                <motion.tr
                                    key={user.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="hover:bg-gray-50/50 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{user.name}</div>
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${user.role === 'Brand' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {user.role === 'Brand' ? <Shield className="w-3 h-3" /> : <UserCheck className="w-3 h-3" />}
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 text-sm">{user.joined}</td>
                                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                                        <button
                                            onClick={() => deleteUser(user.id)}
                                            className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                                            title="Delete User"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>

                        {filteredUsers.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                    No users found matching filter.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
