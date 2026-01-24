import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { User, DollarSign, Video, Mail, LogOut, Instagram, Youtube, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const InfluencerDashboard = () => {
    const { user, inquiries, logout } = useAdmin();
    const navigate = useNavigate();

    if (!user || user.role !== 'influencer') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col gap-6">
                <p className="text-xl font-bold text-gray-500">Access Denied</p>
                <button onClick={() => navigate('/login')} className="bg-primary text-white px-8 py-3 rounded-full font-bold">Log In</button>
            </div>
        );
    }

    const influencerInquiries = inquiries.filter(inq => inq.influencerUsername === user.username);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50/50 flex flex-col font-sans">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Sidebar Profile */}
                    <div className="lg:col-span-3">
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                            <div className="text-center mb-8">
                                <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                                    {user.profileImage ? (
                                        <img src={user.profileImage} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-12 h-12 text-primary" />
                                    )}
                                </div>
                                <h2 className="text-2xl font-black text-gray-900 mb-1">{user.name}</h2>
                                <p className="text-gray-500 font-bold text-sm">@{user.username}</p>
                            </div>

                            <nav className="space-y-2">
                                <div className="flex items-center gap-3 px-4 py-3 bg-primary text-white rounded-2xl font-black text-sm">
                                    <User className="w-4 h-4" /> Profile Overview
                                </div>
                                <div className="flex items-center gap-3 px-4 py-3 text-gray-400 font-bold text-sm">
                                    <Mail className="w-4 h-4" /> My Inquiries ({influencerInquiries.length})
                                </div>
                                <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-500 font-black text-sm w-full hover:bg-red-50 rounded-2xl transition-colors">
                                    <LogOut className="w-4 h-4" /> Logout
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-9 space-y-8">

                        {/* Status Header */}
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-black text-gray-900 mb-1 italic">Welcome back, {user.name.split(' ')[0]}!</h1>
                                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                                    Account Status: <span className="text-green-500">Approved</span> <CheckCircle className="w-3 h-3" />
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-black text-gray-900">{influencerInquiries.length}</div>
                                <div className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Inquiries</div>
                            </div>
                        </div>

                        {/* Pricing Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 group hover:border-primary transition-colors">
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
                                    <Video className="w-5 h-5" />
                                </div>
                                <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Per Reel</div>
                                <div className="text-2xl font-black">{user.pricePerReel || '$500'}</div>
                            </div>
                            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 group hover:border-primary transition-colors">
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
                                    <DollarSign className="w-5 h-5" />
                                </div>
                                <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Collaboration</div>
                                <div className="text-2xl font-black">{user.collaborationPrice || '$1,200'}</div>
                            </div>
                            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 group hover:border-primary transition-colors">
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
                                    <Instagram className="w-5 h-5" />
                                </div>
                                <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Followers</div>
                                <div className="text-2xl font-black">{user.instagramFollowers || user.followers || '10K'}</div>
                            </div>
                        </div>

                        {/* My Content / Social Stats */}
                        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
                            <h3 className="text-xl font-black text-gray-900 mb-8 italic">Profile Summary</h3>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center">
                                            <Instagram className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="font-black text-gray-900">Instagram</div>
                                            <div className="text-xs font-bold text-gray-400">{user.instagramLink || 'Not linked'}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-black text-gray-900">{user.instagramFollowers || 'N/A'}</div>
                                        <div className="text-xs font-bold text-gray-400">Followers</div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                                            <Youtube className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="font-black text-gray-900">YouTube</div>
                                            <div className="text-xs font-bold text-gray-400">{user.youtubeLink || 'Not linked'}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-black text-gray-900">{user.youtubeSubscribers || 'N/A'}</div>
                                        <div className="text-xs font-bold text-gray-400">Subscribers</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default InfluencerDashboard;
