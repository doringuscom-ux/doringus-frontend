import React, { useState } from 'react';
import {
    Filter, MoreHorizontal, Shield, UserCheck, Trash2, Plus,
    Users, Search, ArrowUpRight, Grid
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { motion, AnimatePresence } from 'framer-motion';

const UserManagement = () => {
    const { users = [], deleteUser, addUser } = useAdmin() || {};
    const [filterRole, setFilterRole] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = (users || []).filter(user => {
        const matchesRole = filterRole === 'All' || user.role === filterRole;
        const matchesSearch = (user.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase());
        return matchesRole && matchesSearch;
    });

    const handleAddUser = () => {
        const names = ['Michael Scott', 'Dwight Schrute', 'Pam Beesly', 'Jim Halpert'];
        const roles = ['Influencer', 'Brand'];
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomRole = roles[Math.floor(Math.random() * roles.length)];
        const randomNum = Math.floor(Math.random() * 100);

        addUser({
            name: `${randomName} ${randomNum}`,
            username: `${randomName.toLowerCase().replace(' ', '')}${randomNum}`,
            password: 'Password123!',
            email: `${randomName.toLowerCase().replace(' ', '.')}@example.com`,
            role: randomRole,
            status: 'Active',
            joined: new Date().toLocaleDateString()
        });
    };

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <Grid className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Governance Lab</span>
                    </div>
                    <h1 className="text-5xl font-black text-gray-900 tracking-tighter italic">
                        User<span className="text-primary italic">.</span> Governance
                    </h1>
                    <p className="text-gray-400 mt-2 font-bold uppercase tracking-widest text-xs">Manage organizational access and entity roles within the ecosystem.</p>
                </div>
                <button
                    onClick={handleAddUser}
                    className="bg-black text-white px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-primary transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
                >
                    <Plus className="w-5 h-5" /> Generate Entity
                </button>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="flex bg-gray-50 p-1.5 rounded-2xl w-full md:w-auto">
                    {['All', 'Influencer', 'Brand'].map(role => (
                        <button
                            key={role}
                            onClick={() => setFilterRole(role)}
                            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterRole === role
                                ? 'bg-white text-primary shadow-sm'
                                : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {role}
                        </button>
                    ))}
                </div>
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Scan for identities..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold text-sm"
                    />
                </div>
            </div>

            {/* Registry List */}
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/30 overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50/30 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                            <th className="px-10 py-6">Identity</th>
                            <th className="px-10 py-6">Domain Role</th>
                            <th className="px-10 py-6">Status</th>
                            <th className="px-10 py-6">Registry Date</th>
                            <th className="px-10 py-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        <AnimatePresence mode="popLayout">
                            {filteredUsers.map((user, idx) => (
                                <motion.tr
                                    key={user.id || idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="hover:bg-gray-50/50 transition-all duration-300 group"
                                >
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-gray-900 border-4 border-white shadow-lg flex items-center justify-center text-white font-black text-xl italic group-hover:rotate-6 transition-transform">
                                                {user.name?.charAt(0) || 'U'}
                                            </div>
                                            <div>
                                                <div className="font-black text-gray-900 text-base italic">{user.name}</div>
                                                <div className="text-xs text-primary font-bold mt-0.5">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${user.role === 'Brand' ? 'bg-purple-50 text-purple-600 border border-purple-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                                            }`}>
                                            {user.role === 'Brand' ? <Shield className="w-3 h-3" /> : <UserCheck className="w-3 h-3" />}
                                            {user.role}
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${user.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                            }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                                            {user.status}
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className="text-xs font-bold text-gray-400">{user.joined || 'Unknown'}</span>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => deleteUser(user.id)}
                                                className="p-3 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                                                title="Eliminate Instance"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-3 bg-gray-100 text-gray-400 rounded-xl hover:bg-gray-900 hover:text-white transition-all shadow-sm">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>

                        {filteredUsers.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-10 py-32 text-center">
                                    <div className="flex flex-col items-center">
                                        <div className="w-20 h-20 rounded-[2.5rem] bg-gray-50 flex items-center justify-center text-gray-300 mb-6">
                                            <Search className="w-10 h-10" />
                                        </div>
                                        <h4 className="text-2xl font-black text-gray-900 italic">No Identities Detected.</h4>
                                        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-2">Adjust your parameters or generate a new user entity.</p>
                                    </div>
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
