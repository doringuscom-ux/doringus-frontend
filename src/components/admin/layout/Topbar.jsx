import React from 'react';
import { Search, Bell, User, ShieldCheck } from 'lucide-react';
import { useAdmin } from '../../../context/AdminContext';

const Topbar = () => {
    const { user } = useAdmin() || {};

    return (
        <header className="h-32 bg-white/40 backdrop-blur-2xl border-b border-gray-100/50 flex items-center justify-between px-14 sticky top-0 z-40">
            <div className="flex items-center gap-10 flex-1">
                <div className="relative w-[500px] group">
                    <div className="absolute inset-0 bg-primary/5 rounded-[1.5rem] blur-xl group-focus-within:bg-primary/10 transition-all duration-500" />
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search system resources, artists, or logs..."
                        className="relative w-full pl-16 pr-8 py-5 bg-white/80 border border-gray-50 rounded-[1.5rem] text-sm font-bold placeholder-gray-400 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all outline-none shadow-sm"
                    />
                </div>
            </div>

            <div className="flex items-center gap-10">
                <div className="flex items-center gap-4">
                    <button className="relative w-14 h-14 bg-white border border-gray-50 rounded-2xl flex items-center justify-center text-gray-400 hover:text-primary transition-all hover:scale-105 hover:shadow-xl hover:shadow-gray-200/50 group">
                        <Bell className="w-6 h-6" />
                        <span className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full border-[3px] border-white animate-bounce"></span>
                    </button>

                    <button className="relative w-14 h-14 bg-white border border-gray-50 rounded-2xl flex items-center justify-center text-gray-400 hover:text-blue-500 transition-all hover:scale-105 hover:shadow-xl hover:shadow-gray-200/50">
                        <ShieldCheck className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex items-center gap-6 pl-10 border-l border-gray-100">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-black italic text-gray-900 tracking-tight leading-none uppercase">
                            {user?.name || user?.username || 'Admin Authority'}
                        </p>
                        <div className="flex items-center justify-end gap-2 mt-1.5">
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">God Mode</span>
                            <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(255,51,102,0.6)]" />
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-blue-600 rounded-[1.5rem] opacity-20 blur-sm group-hover:opacity-40 transition-opacity" />
                        <div className="relative w-16 h-16 rounded-[1.5rem] bg-gray-900 p-0.5 overflow-hidden">
                            {user?.profileImage ? (
                                <img src={user.profileImage} alt="" className="w-full h-full object-cover rounded-[1.3rem]" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-white">
                                    <User className="w-7 h-7" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
