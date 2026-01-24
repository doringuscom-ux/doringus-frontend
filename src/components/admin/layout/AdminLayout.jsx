import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-[#FDFDFF] flex selection:bg-primary/20">
            <Sidebar />

            {/* Main Content Container */}
            <div className="flex-1 md:ml-80 flex flex-col min-h-screen transition-all duration-500 overflow-hidden relative">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-primary/[0.02] rounded-full blur-[100px] md:blur-[150px] -z-10 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-blue-500/[0.02] rounded-full blur-[80px] md:blur-[120px] -z-10" />

                <Topbar />

                <main className="flex-1 p-6 md:p-14 overflow-y-auto relative z-10 no-scrollbar">
                    <div className="max-w-[1600px] mx-auto">
                        <Outlet />
                    </div>
                </main>

                {/* Footer simple mark */}
                <footer className="px-14 py-8 border-t border-gray-100 flex justify-between items-center bg-white/30 backdrop-blur-sm hidden md:flex">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">
                        © 2026 Doringus Titan OS v2.4.0
                    </p>
                    <div className="flex gap-6">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 cursor-pointer hover:text-primary transition-colors">Privacy Protcol</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 cursor-pointer hover:text-primary transition-colors">System Logs</span>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default AdminLayout;
