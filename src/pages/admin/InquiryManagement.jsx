import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import {
    Mail, Phone, Calendar, Trash2, CheckCircle, Clock, Users,
    MessageSquare, DollarSign, ArrowUpRight, Inbox
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InquiryManagement = () => {
    const { inquiries = [], deleteInquiry, updateInquiryStatus } = useAdmin() || {};

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Pending': return 'bg-amber-100/50 text-amber-600 border-amber-100';
            case 'Contacted': return 'bg-blue-100/50 text-blue-600 border-blue-100';
            case 'Completed': return 'bg-emerald-100/50 text-emerald-600 border-emerald-100';
            default: return 'bg-gray-100/50 text-gray-600 border-gray-100';
        }
    };

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <Inbox className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Communication Pipeline</span>
                    </div>
                    <h1 className="text-5xl font-black text-gray-900 tracking-tighter italic">
                        Artist<span className="text-primary italic">.</span> Inquiries
                    </h1>
                    <p className="text-gray-400 mt-2 font-bold uppercase tracking-widest text-xs">Direct transmission from brands aiming to partner with your talent.</p>
                </div>
            </div>

            {/* Inquiry Feed */}
            <div className="grid gap-8">
                <AnimatePresence mode="popLayout">
                    {inquiries.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white p-24 rounded-[3.5rem] border-4 border-dashed border-gray-50 flex flex-col items-center text-center"
                        >
                            <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center text-gray-300 mb-8">
                                <Mail className="w-10 h-10" />
                            </div>
                            <h3 className="text-3xl font-black text-gray-900 tracking-tight italic">Silent Mode.</h3>
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-2 italic">No incoming transmissions detected at this time.</p>
                        </motion.div>
                    ) : (
                        [...inquiries].reverse().map((inq, idx) => (
                            <motion.div
                                key={inq.id || idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/40 transition-all duration-500 overflow-hidden relative group"
                            >
                                {/* Aesthetic Decor */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-[0.02] rounded-bl-full group-hover:scale-110 transition-transform duration-700" />

                                <div className="relative z-10 flex flex-col lg:flex-row gap-12">
                                    <div className="flex-1 space-y-10">
                                        <div className="flex flex-wrap items-center justify-between gap-6">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center text-white font-black text-2xl italic">
                                                    {inq.fullName?.charAt(0) || 'A'}
                                                </div>
                                                <div>
                                                    <h3 className="text-3xl font-black text-gray-900 tracking-tight italic">{inq.fullName}</h3>
                                                    <div className="flex items-center gap-3 mt-1 text-gray-400">
                                                        <Clock className="w-3.5 h-3.5" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">{new Date(inq.createdAt || Date.now()).toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <select
                                                    value={inq.status || 'Pending'}
                                                    onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                                                    className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border outline-none transition-all ${getStatusStyles(inq.status)}`}
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Contacted">Contacted</option>
                                                    <option value="Completed">Completed</option>
                                                </select>
                                                <button
                                                    onClick={() => deleteInquiry(inq.id)}
                                                    className="p-4 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100/50">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Talent Requested</p>
                                                <div className="flex items-center gap-3">
                                                    <Users className="w-4 h-4 text-primary" />
                                                    <span className="text-sm font-black italic text-gray-900">{inq.influencerName || inq.influencerUsername}</span>
                                                </div>
                                            </div>
                                            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100/50">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Budget Envelope</p>
                                                <div className="flex items-center gap-3">
                                                    <DollarSign className="w-4 h-4 text-emerald-500" />
                                                    <span className="text-sm font-black italic text-gray-900">{inq.budget || 'TBD'}</span>
                                                </div>
                                            </div>
                                            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100/50">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Communication Hub</p>
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-3">
                                                        <Mail className="w-3.5 h-3.5 text-blue-500" />
                                                        <span className="text-xs font-bold text-gray-700">{inq.email}</span>
                                                    </div>
                                                    {inq.phone && (
                                                        <div className="flex items-center gap-3">
                                                            <Phone className="w-3.5 h-3.5 text-blue-500" />
                                                            <span className="text-xs font-bold text-gray-700">{inq.phone}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {inq.message && (
                                            <div className="bg-gray-900 p-8 rounded-[2rem] text-white relative flex gap-6">
                                                <div className="mt-1">
                                                    <MessageSquare className="w-6 h-6 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">Campaign Intelligence</p>
                                                    <p className="text-sm font-medium leading-relaxed italic text-gray-300">"{inq.message}"</p>
                                                </div>
                                                <ArrowUpRight className="absolute top-6 right-8 w-6 h-6 text-primary opacity-20" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default InquiryManagement;
