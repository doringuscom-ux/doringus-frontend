import React from 'react';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAdmin } from '../../context/AdminContext';

const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
    >
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <h3 className="text-2xl font-bold mt-2 text-gray-900">{value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${color}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
            <span className="text-green-500 text-sm font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> {change}
            </span>
            <span className="text-gray-400 text-sm">vs last month</span>
        </div>
    </motion.div>
);

const AdminDashboard = () => {
    const { influencers, inquiries } = useAdmin();

    const stats = {
        totalInfluencers: influencers.length,
        pendingInfluencers: influencers.filter(inf => inf.status === 'Pending').length,
        totalInquiries: inquiries.length,
        newInquiries: inquiries.filter(inq => {
            const today = new Date();
            const inqDate = new Date(inq.createdAt);
            return inqDate.toDateString() === today.toDateString();
        }).length
    };

    const recentInquiries = [...inquiries].reverse().slice(0, 5);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 italic">Dashboard</h2>
                    <p className="text-gray-500 mt-1 font-bold uppercase tracking-widest text-xs">Overview of Social Adda Performance</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Influencers" value={stats.totalInfluencers} change="+2%" icon={Users} color="bg-blue-600" />
                <StatCard title="Pending Review" value={stats.pendingInfluencers} change="Check Now" icon={Activity} color="bg-orange-500" />
                <StatCard title="Total Inquiries" value={stats.totalInquiries} change="+15%" icon={DollarSign} color="bg-green-600" />
                <StatCard title="Today's inquiries" value={stats.newInquiries} change="New" icon={TrendingUp} color="bg-pink-600" />
            </div>

            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-black text-gray-900 text-xl italic">Recent Influencer Inquiries</h3>
                    <button className="text-primary text-sm font-black uppercase tracking-widest hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50/50">
                            <tr className="text-left text-xs font-black text-gray-400 uppercase tracking-widest">
                                <th className="px-6 py-4">Sender</th>
                                <th className="px-6 py-4">Influencer</th>
                                <th className="px-6 py-4">Budget</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {recentInquiries.map((inq) => (
                                <tr key={inq.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-900">{inq.fullName}</div>
                                        <div className="text-xs text-gray-400">{inq.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 font-bold">
                                        @{inq.influencerUsername}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-green-50 text-green-700 rounded-lg font-bold text-xs">{inq.budget}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg font-bold text-xs uppercase tracking-tighter">{inq.status}</span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 text-xs font-bold">{new Date(inq.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            {recentInquiries.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-400 font-bold">
                                        No recent inquiries found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
