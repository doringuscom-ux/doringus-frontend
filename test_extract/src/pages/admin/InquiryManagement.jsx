import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Mail, Phone, Calendar, Trash2, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const InquiryManagement = () => {
    const { inquiries, deleteInquiry, updateInquiryStatus } = useAdmin();

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-700';
            case 'Contacted': return 'bg-blue-100 text-blue-700';
            case 'Completed': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Inquiry Management</h1>
                    <p className="text-gray-500">Manage customer inquiries and bookings for influencers.</p>
                </div>
            </div>

            <div className="grid gap-6">
                {inquiries.length === 0 ? (
                    <div className="bg-white p-12 rounded-3xl border border-dashed border-gray-200 text-center">
                        <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-gray-900">No Inquiries Yet</h3>
                        <p className="text-gray-500">New inquiries from the influencer pages will appear here.</p>
                    </div>
                ) : (
                    [...inquiries].reverse().map((inq, idx) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            key={inq.id}
                            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(inq.status)}`}>
                                                {inq.status}
                                            </span>
                                            <span className="text-sm text-gray-400 flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {new Date(inq.createdAt).toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => deleteInquiry(inq.id)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete Inquiry"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid lg:grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">{inq.fullName}</h3>
                                            <div className="flex items-center gap-4 mt-2">
                                                <div className="flex items-center gap-2 text-primary font-bold">
                                                    <Users className="w-4 h-4" />
                                                    <span>Influencer: {inq.influencerName || inq.influencerUsername}</span>
                                                </div>
                                                <div className="px-3 py-1 bg-green-50 text-green-700 rounded-lg font-bold text-sm">
                                                    Budget: {inq.budget || 'N/A'}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex items-center gap-3 text-gray-600">
                                                <Mail className="w-4 h-4 text-primary" />
                                                <span className="text-sm font-medium">{inq.email}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-600">
                                                <Phone className="w-4 h-4 text-primary" />
                                                <span className="text-sm font-medium">{inq.phone || 'N/A'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {inq.message && (
                                        <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Requirements / Message</p>
                                            <p className="text-gray-700 leading-relaxed font-medium">"{inq.message}"</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default InquiryManagement;
