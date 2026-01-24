import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50/50 flex">
            <Sidebar />
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen transition-all duration-300">
                <Topbar />
                <main className="flex-1 p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
