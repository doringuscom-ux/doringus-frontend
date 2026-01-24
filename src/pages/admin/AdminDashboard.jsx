import React, { useState } from 'react';
import {
    Users,
    Activity,
    Target,
    MessageSquare,
    ArrowUpRight,
    ArrowDownRight,
    Zap,
    Plus,
    Calendar,
    Clock,
    Wifi,
    WifiOff,
    AlertTriangle,
    RefreshCw
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAdmin } from '../../context/AdminContext';

const StatCard = ({ title, value, change, icon: Icon, color, trend }) => (
    <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50"
    >
        <div className={`absolute top-0 right-0 w-32 h-32 ${color} opacity-[0.03] rounded-bl-full group-hover:scale-110 transition-transform duration-700`} />

        <div className="flex items-start justify-between relative z-10">
            <div className={`p-4 rounded-2xl ${color} bg-opacity-10 text-primary`}>
                {Icon && <Icon className={`w-8 h-8 ${color ? color.replace('bg-', 'text-') : 'text-primary'}`} />}
            </div>
            <div className={`flex items-center gap-1 text-xs font-black uppercase tracking-widest ${trend === 'up' ? 'text-green-500' : 'text-orange-500'}`}>
                {trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {change}
            </div>
        </div>

        <div className="mt-8 relative z-10">
            <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">{title}</p>
            <h3 className="text-4xl font-black mt-2 text-gray-900 tracking-tighter italic">{value ?? '0'}</h3>
        </div>
    </motion.div>
);

const AdminDashboard = () => {
    const { influencers = [], inquiries = [], campaigns = [], stats = {}, serverStatus, refreshData } = useAdmin() || {};

    const recentInquiries = Array.isArray(inquiries) ? [...inquiries].reverse().slice(0, 5) : [];

    const getStatusStyles = () => {
        if (serverStatus === 'Online') return 'bg-emerald-50 text-emerald-600';
        if (serverStatus === 'Old Version') return 'bg-amber-50 text-amber-600 animate-pulse';
        return 'bg-rose-50 text-rose-600';
    };

    return (
        <div className="space-y-12">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em]">Live Insights</span>
                        <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusStyles()}`}>
                            {serverStatus === 'Online' ? <Wifi className="w-3.5 h-3.5" /> : (serverStatus === 'Old Version' ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <WifiOff className="w-3.5 h-3.5" />)}
                            System: {serverStatus || 'Offline'}
                        </div>
                    </div>
                    <h2 className="text-6xl font-black text-gray-900 tracking-tighter italic leading-none">
                        Pulse<span className="text-primary">.</span> Dashboard
                    </h2>
                    <p className="text-gray-400 mt-4 font-bold uppercase tracking-widest text-sm">Empowering Creators, Scaling Brands.</p>
                </div>

                <div className="flex items-center gap-4">
                    <button onClick={() => refreshData?.()} className="group flex items-center gap-2 bg-white border border-gray-100 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:bg-gray-50 active:scale-95 shadow-lg shadow-gray-200/20">
                        <RefreshCw className="w-4 h-4 group-active:rotate-180 transition-transform" /> Sync Data
                    </button>
                    <button className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:shadow-2xl hover:shadow-primary/30 hover:scale-105 active:scale-95 ">
                        <Plus className="w-4 h-4" /> Launch Campaign
                    </button>
                </div>
            </div>

            {/* Warning for Old Version */}
            {serverStatus === 'Old Version' && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-8 bg-black border-2 border-primary rounded-[2.5rem] flex items-center gap-8 shadow-2xl shadow-primary/20"
                >
                    <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary relative overflow-hidden group">
                        <div className="absolute inset-0 bg-primary opacity-20 animate-pulse" />
                        <AlertTriangle className="w-10 h-10 relative z-10" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-black text-white text-xl uppercase tracking-tighter italic">Titan Protocol Update Required</h4>
                        <p className="text-gray-400 font-bold text-sm mt-1 uppercase tracking-widest">A legacy core instance was detected. Please restart your <span className="text-primary italic">node terminal</span> to initialize version 2.0.1.</p>
                    </div>
                </motion.div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard
                    title="Creators Hub"
                    value={stats?.activeInfluencers}
                    change="+12.5%"
                    trend="up"
                    icon={Users}
                    color="bg-indigo-600"
                />
                <StatCard
                    title="Active Missions"
                    value={campaigns?.length || 0}
                    change="+5% New"
                    trend="up"
                    icon={Target}
                    color="bg-emerald-600"
                />
                <StatCard
                    title="Live Queries"
                    value={stats?.totalInquiries}
                    change="-2.4%"
                    trend="down"
                    icon={MessageSquare}
                    color="bg-amber-600"
                />
                <StatCard
                    title="Network Power"
                    value="98.2%"
                    change="Peak"
                    trend="up"
                    icon={Zap}
                    color="bg-rose-600"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Recent Inquiries Table */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/30 overflow-hidden group">
                        <div className="p-10 border-b border-gray-100 flex items-center justify-between">
                            <div>
                                <h3 className="font-black text-gray-900 text-2xl italic tracking-tight">Recent Artist Requests</h3>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Direct inquiries from potential brand partners</p>
                            </div>
                            <button className="bg-gray-50 text-gray-900 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm">Explore All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50/30 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                        <th className="px-10 py-5">Artist / Creator</th>
                                        <th className="px-10 py-5">Brand Partner</th>
                                        <th className="px-10 py-5">Valuation</th>
                                        <th className="px-10 py-5">Engagement</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {(recentInquiries || []).map((inq, idx) => (
                                        <tr key={inq?.id || idx} className="hover:bg-gray-50/50 transition-all duration-300 group/row">
                                            <td className="px-10 py-8">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden border-2 border-white shadow-sm font-black flex items-center justify-center text-primary text-xs uppercase">
                                                        {inq?.influencerUsername?.charAt(0) || 'D'}
                                                    </div>
                                                    <div>
                                                        <div className="font-black text-gray-900 text-sm italic">@{inq?.influencerUsername || 'anon'}</div>
                                                        <div className="text-xs text-primary font-bold mt-0.5">{inq?.fullName || 'Anonymous'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="text-xs font-black text-gray-900 uppercase tracking-widest truncate max-w-[150px]">{inq?.email || 'N/A'}</div>
                                                <div className="text-[10px] text-gray-400 font-bold mt-1">Contact Verified</div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="inline-flex items-center px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full font-black text-xs italic tracking-tighter">
                                                    {inq?.budget || 'TBD'}
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 w-fit ${inq?.status === 'Pending' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                                                    }`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${inq?.status === 'Pending' ? 'bg-amber-600 animate-pulse' : 'bg-blue-600'}`} />
                                                    {inq?.status || 'Active'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {(!recentInquiries || recentInquiries.length === 0) && (
                                        <tr>
                                            <td colSpan="4" className="px-10 py-24 text-center">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-20 h-20 rounded-[2.5rem] bg-gray-50 flex items-center justify-center text-gray-300 mb-6">
                                                        <Activity className="w-10 h-10" />
                                                    </div>
                                                    <h4 className="text-xl font-black text-gray-900 italic">No movement yet.</h4>
                                                    <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-2">New artist requests will appear here instantly.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Performance Side Panel */}
                <div className="space-y-8">
                    <div className="bg-gray-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-blue-900/40 min-h-[400px]">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500 opacity-20 blur-[100px]" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary opacity-20 blur-[80px]" />

                        <div className="relative z-10 flex flex-col h-full">
                            <h3 className="text-3xl font-black tracking-tighter italic leading-none mb-10">
                                Network<br /><span className="text-primary italic">Dominance.</span>
                            </h3>

                            <div className="space-y-10 flex-1">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Target Reached</span>
                                        <span className="text-2xl font-black italic">88%</span>
                                    </div>
                                    <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '88%' }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="h-full bg-gradient-to-r from-primary to-blue-400 shadow-[0_0_20px_rgba(255,51,102,0.5)]"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Response Speed</span>
                                        <span className="text-2xl font-black italic">14m</span>
                                    </div>
                                    <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '92%' }}
                                            transition={{ duration: 1.8, ease: "easeOut" }}
                                            className="h-full bg-gradient-to-r from-emerald-400 to-green-300 shadow-[0_0_20px_rgba(52,211,153,0.5)]"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 pt-10 border-t border-white/10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                                        <Zap className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-black uppercase tracking-widest text-gray-400">Efficiency Boost</div>
                                        <div className="text-sm font-bold text-white mt-1">+24% vs last period</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm">
                        <h4 className="text-lg font-black text-gray-900 italic tracking-tight mb-8">System Health</h4>
                        <div className="space-y-6">
                            {[
                                { label: 'API Gateway', status: serverStatus === 'Online' ? 'Operational' : (serverStatus === 'Old Version' ? 'Conflict' : 'Failing') },
                                { label: 'Auth Service', status: serverStatus === 'Online' ? 'Operational' : (serverStatus === 'Old Version' ? 'Conflict' : 'Failing') },
                                { label: 'Media Engine', status: serverStatus === 'Online' ? 'Operational' : (serverStatus === 'Old Version' ? 'Conflict' : 'Failing') }
                            ].map((s, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-100/50">
                                    <span className="text-xs font-black uppercase tracking-widest text-gray-500">{s.label}</span>
                                    <span className={`flex items-center gap-2 text-[10px] font-black uppercase ${s.status === 'Operational' ? 'text-emerald-500' : (s.status === 'Conflict' ? 'text-amber-500' : 'text-rose-500')}`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${s.status === 'Operational' ? 'bg-emerald-500 animate-pulse' : (s.status === 'Conflict' ? 'bg-amber-500' : 'bg-rose-500')}`} />
                                        {s.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
