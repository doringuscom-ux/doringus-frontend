import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Megaphone,
    Settings,
    LogOut,
    Grid,
    Mail,
    Zap,
    ChevronRight,
    LayoutGrid
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAdmin } from '../../../context/AdminContext';

import logo from '../../../assets/doringus-logo.jpeg';

const Sidebar = () => {
    const context = useAdmin() || {};
    const { logout } = context;
    const navigate = useNavigate();

    const navItems = [
        { icon: LayoutDashboard, label: 'Pulse Dashboard', path: '/admin' },
        { icon: Users, label: 'Creator Ecosystem', path: '/admin/influencers' },
        { icon: Grid, label: 'User Governance', path: '/admin/users' },
        { icon: Megaphone, label: 'Brand Partnerships', path: '/admin/brands' },
        { icon: Mail, label: 'Artist Inquiries', path: '/admin/inquiries' },
        { icon: LayoutGrid, label: 'Vision Gallery', path: '/admin/videos' },
        { icon: Settings, label: 'System Prefs', path: '/admin/settings' },
    ];

    const handleLogout = () => {
        if (typeof logout === 'function') {
            logout();
        }
        navigate('/admin/login');
    };

    return (
        <aside className="fixed left-0 top-0 h-screen w-80 bg-white/90 backdrop-blur-2xl border-r border-gray-100 hidden md:flex flex-col z-50 p-8">
            <div className="mb-16">
                <div className="flex flex-col gap-4 cursor-pointer" onClick={() => navigate('/admin')}>
                    <img src={logo} alt="Doringus Logo" className="h-12 w-auto object-contain self-start" />
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mt-1">Admin OS</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 space-y-3 overflow-y-auto no-scrollbar">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/admin'}
                        className={({ isActive }) =>
                            `flex items-center justify-between px-6 py-5 rounded-[2rem] transition-all duration-500 group relative ${isActive
                                ? 'bg-primary text-white shadow-2xl shadow-primary/30 z-10'
                                : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <div className="flex items-center gap-4">
                                    {item.icon && <item.icon className={`w-5 h-5 transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />}
                                    <span className="font-black text-xs uppercase tracking-widest">{item.label}</span>
                                </div>
                                <ChevronRight className={`w-4 h-4 transition-all duration-500 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="mt-auto pt-10 border-t border-gray-50">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 px-8 py-5 w-full text-left text-gray-400 hover:text-rose-500 transition-all rounded-[2rem] hover:bg-rose-50 group"
                >
                    <div className="w-10 h-10 rounded-xl bg-gray-50 group-hover:bg-rose-100 flex items-center justify-center transition-colors">
                        <LogOut className="w-5 h-5" />
                    </div>
                    <span className="font-black text-xs uppercase tracking-widest">Terminate Session</span>
                </button>

                <div className="mt-8 p-6 bg-gray-900 rounded-[2.5rem] relative overflow-hidden group border border-white/10">
                    <div className={`absolute top-0 right-0 w-24 h-24 ${context.serverStatus === 'Online' ? 'bg-emerald-500' : 'bg-rose-500'} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`} />
                    <div className="relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Service Status</p>
                        <div className="flex items-center gap-2 mt-2">
                            <div className={`w-2 h-2 ${context.serverStatus === 'Online' ? 'bg-emerald-500' : 'bg-rose-500'} rounded-full animate-pulse`} />
                            <span className="text-xs font-bold text-white italic">
                                {context.serverStatus === 'Online' ? 'Titan Core Online' : 'Core Connection Lost'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
