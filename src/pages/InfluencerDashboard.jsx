import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { User, DollarSign, Video, Mail, LogOut, Instagram, Youtube, CheckCircle, Upload } from 'lucide-react';
import api, { getImageUrl } from '../utils/axiosConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const InfluencerDashboard = () => {
    const { user, inquiries, logout, updateInfluencerProfile } = useAdmin();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile'); // profile, inquiries, portfolio
    const [newImageUrl, setNewImageUrl] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    if (!user || user.role !== 'influencer') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col gap-6 uppercase tracking-tighter">
                <p className="text-xl font-black text-gray-400">Access Denied</p>
                <button onClick={() => navigate('/login')} className="bg-primary text-white px-10 py-4 rounded-full font-black shadow-2xl hover:scale-105 transition-all">
                    Log In
                </button>
            </div>
        );
    }

    const influencerInquiries = inquiries.filter(inq => inq.influencerUsername === user.username);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleFileUpload = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await api.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return res.data.url;
        } catch (e) {
            console.error('Upload failed', e);
            alert('File upload failed');
            return null;
        }
    };

    const handleAddImage = async (e) => {
        e.preventDefault();
        const form = e.target;
        const fileInput = form.fileInput?.files?.[0];

        if (!fileInput) {
            alert("Please select an image file first.");
            return;
        }

        setIsUpdating(true);
        try {
            const finalUrl = await handleFileUpload(fileInput);

            if (finalUrl) {
                const currentGallery = user.gallery || [];
                const updatedGallery = [...currentGallery, finalUrl];
                const result = await updateInfluencerProfile(user.id, { gallery: updatedGallery });
                if (result.success) {
                    form.reset();
                    setNewImageUrl('');
                    const btn = document.getElementById('portfolio-upload-btn');
                    const txt = document.getElementById('portfolio-status-text');
                    if (btn) btn.innerHTML = 'Confirm Upload';
                    if (txt) txt.innerHTML = 'Click to Upload Portfolio Image';
                } else {
                    alert(result.message);
                }
            }
        } catch (error) {
            console.error("Portfolio upload process failed:", error);
            alert("An error occurred during the upload process.");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleRemoveImage = async (imgUrl) => {
        setIsUpdating(true);
        const updatedGallery = (user.gallery || []).filter(img => img !== imgUrl);
        await updateInfluencerProfile(user.id, { gallery: updatedGallery });
        setIsUpdating(false);
    };

    return (
        <div className="min-h-screen bg-gray-50/50 flex flex-col font-sans selection:bg-primary/20">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Sidebar Profile */}
                    <div className="lg:col-span-3">
                        <div className="bg-white p-8 rounded-[3rem] shadow-xl shadow-gray-100/50 border border-gray-100 sticky top-32">
                            <div className="text-center mb-10">
                                <div className="w-24 h-24 bg-primary/5 rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg shadow-primary/10">
                                    {user.profileImage ? (
                                        <img src={getImageUrl(user.profileImage)} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-10 h-10 text-primary" />
                                    )}
                                </div>
                                <h2 className="text-2xl font-black text-gray-900 mb-1 tracking-tight italic">{user.name}</h2>
                                <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">@{user.username}</p>
                            </div>

                            <nav className="space-y-2">
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${activeTab === 'profile' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'}`}
                                >
                                    <User className="w-5 h-5" /> Profile Overview
                                </button>
                                <button
                                    onClick={() => setActiveTab('inquiries')}
                                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${activeTab === 'inquiries' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'}`}
                                >
                                    <Mail className="w-5 h-5" /> My Inquiries ({influencerInquiries.length})
                                </button>
                                <button
                                    onClick={() => setActiveTab('portfolio')}
                                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${activeTab === 'portfolio' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'}`}
                                >
                                    <Video className="w-5 h-5" /> Content Portfolio
                                </button>
                                <div className="h-px bg-gray-100 my-4" />
                                <button onClick={handleLogout} className="flex items-center gap-4 px-6 py-4 text-red-500 font-black text-sm uppercase tracking-widest w-full hover:bg-red-50 rounded-2xl transition-colors">
                                    <LogOut className="w-5 h-5" /> Logout
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-9 space-y-8">

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {activeTab === 'profile' && (
                                    <div className="space-y-8">
                                        {/* Status Header */}
                                        <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-gray-100/50 border border-gray-100 flex items-center justify-between">
                                            <div>
                                                <h1 className="text-4xl font-black text-gray-900 mb-2 italic tracking-tight">Welcome back, {user.name.split(' ')[0]}!</h1>
                                                <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] flex items-center gap-2">
                                                    Current Status: <span className="text-green-500 font-black">Verified Account</span> <CheckCircle className="w-3 h-3" />
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-4xl font-black text-gray-900 tracking-tighter">{influencerInquiries.length}</div>
                                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Inquiries Received</div>
                                            </div>
                                        </div>

                                        {/* Analytics Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-100/50 border border-gray-100 group transition-all duration-500">
                                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary shadow-inner">
                                                    <Video className="w-6 h-6" />
                                                </div>
                                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Price Per Reel</div>
                                                <div className="text-3xl font-black text-gray-900 tracking-tight">{user.pricePerReel || '$500'}</div>
                                            </div>
                                            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-100/50 border border-gray-100 group transition-all duration-500">
                                                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600 shadow-inner">
                                                    <DollarSign className="w-6 h-6" />
                                                </div>
                                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Collaboration Start</div>
                                                <div className="text-3xl font-black text-gray-900 tracking-tight">{user.collaborationPrice || '$1,200'}</div>
                                            </div>
                                            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-100/50 border border-gray-100 group transition-all duration-500">
                                                <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center mb-6 text-pink-600 shadow-inner">
                                                    <Instagram className="w-6 h-6" />
                                                </div>
                                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Social Reach</div>
                                                <div className="text-3xl font-black text-gray-900 tracking-tight">{user.instagramFollowers || user.followers || '10K'}</div>
                                            </div>
                                        </div>

                                        {/* Location Selector */}
                                        <div className="bg-white p-12 rounded-[3.5rem] shadow-xl shadow-gray-100/50 border border-gray-100">
                                            <div className="flex items-center justify-between mb-8">
                                                <div>
                                                    <h3 className="text-2xl font-black text-gray-900 mb-2 italic tracking-tight flex items-center gap-3">
                                                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        Base Location
                                                    </h3>
                                                    <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">
                                                        Select your primary city for better discovery
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="max-w-md">
                                                <select
                                                    value={user.location || ''}
                                                    onChange={async (e) => {
                                                        setIsUpdating(true);
                                                        const res = await updateInfluencerProfile(user.id, { location: e.target.value });
                                                        if (res.success) {
                                                            alert('Location updated successfully!');
                                                        } else {
                                                            alert('Update failed: ' + res.message);
                                                        }
                                                        setIsUpdating(false);
                                                    }}
                                                    disabled={isUpdating}
                                                    className="w-full px-6 py-5 bg-gray-50 border-2 border-gray-100 rounded-2xl font-black text-lg uppercase tracking-wider focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all appearance-none cursor-pointer disabled:opacity-50"
                                                >
                                                    <option value="">Select Your City</option>
                                                    {['Chandigarh', 'Mumbai', 'Noida', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad', 'Gurgaon'].map(city => (
                                                        <option key={city} value={city.toLowerCase()}>{city}</option>
                                                    ))}
                                                </select>
                                                {user.location && (
                                                    <div className="mt-4 flex items-center gap-2 text-green-600 font-bold text-sm">
                                                        <CheckCircle className="w-4 h-4" />
                                                        <span>Currently set to: {user.location.charAt(0).toUpperCase() + user.location.slice(1)}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Platforms */}
                                        <div className="bg-white p-12 rounded-[3.5rem] shadow-xl shadow-gray-100/50 border border-gray-100">
                                            <h3 className="text-2xl font-black text-gray-900 mb-10 italic tracking-tight">Connected Platforms</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="flex items-center justify-between p-6 bg-gray-50/50 rounded-3xl border border-gray-100">
                                                    <div className="flex items-center gap-5">
                                                        <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-primary text-white rounded-[1.25rem] flex items-center justify-center shadow-lg shadow-pink-200">
                                                            <Instagram className="w-8 h-8" />
                                                        </div>
                                                        <div>
                                                            <div className="font-black text-xl text-gray-900 tracking-tight">Instagram</div>
                                                            <div className="text-sm font-bold text-gray-400">{user.instagramLink ? `@${user.instagramLink.split('/').pop()}` : 'Link Account'}</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="font-black text-2xl text-gray-900">{user.instagramFollowers || 'N/A'}</div>
                                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Verified Reach</div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between p-6 bg-gray-50/50 rounded-3xl border border-gray-100">
                                                    <div className="flex items-center gap-5">
                                                        <div className="w-16 h-16 bg-red-600 text-white rounded-[1.25rem] flex items-center justify-center shadow-lg shadow-red-200">
                                                            <Youtube className="w-8 h-8" />
                                                        </div>
                                                        <div>
                                                            <div className="font-black text-xl text-gray-900 tracking-tight">YouTube</div>
                                                            <div className="text-sm font-bold text-gray-400">{user.youtubeLink ? `@${user.youtubeLink.split('/').pop()}` : 'Link Channel'}</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="font-black text-2xl text-gray-900">{user.youtubeSubscribers || 'N/A'}</div>
                                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Subs</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'inquiries' && (
                                    <div className="bg-white p-12 rounded-[3.5rem] shadow-xl shadow-gray-100/50 border border-gray-100 min-h-[600px]">
                                        <div className="flex items-center justify-between mb-12">
                                            <h3 className="text-3xl font-black text-gray-900 italic tracking-tight">Collaboration Invitations</h3>
                                            <div className="bg-primary/5 text-primary px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                                                {influencerInquiries.length} New
                                            </div>
                                        </div>

                                        {influencerInquiries.length > 0 ? (
                                            <div className="space-y-6">
                                                {influencerInquiries.map((inq) => (
                                                    <div key={inq.id} className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 hover:border-primary/20 transition-all group">
                                                        <div className="flex items-start justify-between mb-6">
                                                            <div>
                                                                <h4 className="text-xl font-black text-gray-900 mb-1">{inq.fullName}</h4>
                                                                <p className="text-sm font-bold text-gray-400">{inq.email}</p>
                                                            </div>
                                                            <div className="px-5 py-2 bg-yellow-400/10 text-yellow-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                                {inq.status || 'Pending Review'}
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-6 mb-6">
                                                            <div className="p-4 bg-white rounded-2xl">
                                                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Proposed Budget</div>
                                                                <div className="font-black text-gray-900">{inq.budget}</div>
                                                            </div>
                                                            <div className="p-4 bg-white rounded-2xl">
                                                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Received On</div>
                                                                <div className="font-black text-gray-900">{new Date(inq.createdAt || Date.now()).toLocaleDateString()}</div>
                                                            </div>
                                                        </div>
                                                        <p className="text-gray-600 font-medium bg-white p-6 rounded-2xl italic border border-gray-50">
                                                            "{inq.message}"
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center py-32 opacity-30">
                                                <Mail className="w-20 h-20 mb-6" />
                                                <p className="text-xl font-black italic">No inquiries yet. Keep polishing your profile!</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeTab === 'portfolio' && (
                                    <div className="space-y-8">
                                        {/* Profile Image Section */}
                                        <div className="bg-gradient-to-br from-primary/5 to-blue-50 p-10 rounded-[3rem] shadow-xl shadow-gray-100/50 border border-primary/10">
                                            <div className="flex items-center justify-between mb-8">
                                                <div>
                                                    <h3 className="text-2xl font-black text-gray-900 italic tracking-tight flex items-center gap-3">
                                                        <User className="w-6 h-6 text-primary" />
                                                        Profile Thumbnail
                                                    </h3>
                                                    <p className="text-gray-500 font-medium text-sm mt-1">Update your profile image that appears across the platform</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-primary/20">
                                                    {user.profileImage ? (
                                                        <img src={getImageUrl(user.profileImage)} alt={user.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                            <User className="w-12 h-12 text-gray-400" />
                                                        </div>
                                                    )}
                                                </div>

                                                <form onSubmit={async (e) => {
                                                    e.preventDefault();
                                                    const file = e.target.profileFile.files[0];

                                                    if (!file) {
                                                        alert('Please select a file first.');
                                                        return;
                                                    }

                                                    setIsUpdating(true);
                                                    const finalUrl = await handleFileUpload(file);

                                                    if (finalUrl) {
                                                        const res = await updateInfluencerProfile(user.id, { profileImage: finalUrl });
                                                        if (res.success) {
                                                            e.target.reset();
                                                            alert('Profile image updated successfully!');
                                                        } else {
                                                            alert('Update failed: ' + res.message);
                                                        }
                                                    }
                                                    setIsUpdating(false);
                                                }} className="flex-1 w-full">
                                                    <div className="flex flex-col gap-4">
                                                        <div className="relative group w-full">
                                                            <input
                                                                type="file"
                                                                name="profileFile"
                                                                id="profileUpload"
                                                                accept="image/*"
                                                                className="hidden"
                                                                onChange={(e) => {
                                                                    const fileName = e.target.files[0]?.name;
                                                                    if (fileName) {
                                                                        const btn = document.getElementById('profile-upload-btn');
                                                                        const txt = document.getElementById('profile-status-text');
                                                                        if (btn) btn.innerHTML = `Confirm Upload: ${fileName.substring(0, 15)}...`;
                                                                        if (txt) txt.innerHTML = `Selected: ${fileName}`;
                                                                    }
                                                                }}
                                                            />
                                                            <label htmlFor="profileUpload" className="w-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-primary/30 rounded-3xl bg-primary/5 hover:bg-primary/10 cursor-pointer transition-all group-hover:border-primary">
                                                                <Upload className="w-10 h-10 text-primary mb-4" />
                                                                <span id="profile-status-text" className="font-black text-gray-700 text-lg uppercase tracking-wider text-center px-4">Click to Upload Profile Image</span>
                                                                <span className="text-sm font-bold text-gray-400 mt-2">Supports JPG, PNG, WebP</span>
                                                            </label>
                                                        </div>
                                                        <button
                                                            id="profile-upload-btn"
                                                            type="submit"
                                                            disabled={isUpdating}
                                                            className="bg-primary text-white w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                                                        >
                                                            {isUpdating ? 'Uploading...' : 'Confirm Upload'}
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>

                                        {/* Instagram Reels Section */}
                                        <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-10 rounded-[3rem] shadow-xl shadow-gray-100/50 border border-pink-100">
                                            <div className="flex items-center justify-between mb-8">
                                                <div>
                                                    <h3 className="text-2xl font-black text-gray-900 italic tracking-tight flex items-center gap-3">
                                                        <Instagram className="w-6 h-6 text-pink-600" />
                                                        Instagram Reels
                                                    </h3>
                                                    <p className="text-gray-500 font-medium text-sm mt-1">Add your best Instagram Reel URLs to showcase your content</p>
                                                </div>
                                            </div>

                                            <form onSubmit={async (e) => {
                                                e.preventDefault();
                                                const formData = new FormData(e.target);
                                                const reelUrl = formData.get('reelUrl');
                                                if (reelUrl) {
                                                    setIsUpdating(true);
                                                    const currentReels = user.instagramReels || [];
                                                    await updateInfluencerProfile(user.id, { instagramReels: [...currentReels, reelUrl] });
                                                    setIsUpdating(false);
                                                    e.target.reset();
                                                }
                                            }} className="mb-8 flex gap-4">
                                                <input
                                                    type="url"
                                                    name="reelUrl"
                                                    placeholder="Paste Instagram Reel URL (e.g., https://www.instagram.com/reel/...)"
                                                    className="flex-1 px-6 py-4 bg-white border-2 border-pink-200 rounded-2xl focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all font-bold placeholder:text-gray-400"
                                                />
                                                <button
                                                    type="submit"
                                                    disabled={isUpdating}
                                                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-pink-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                                                >
                                                    {isUpdating ? 'Adding...' : 'Add Reel'}
                                                </button>
                                            </form>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                {user.instagramReels?.map((reel, idx) => (
                                                    <div key={idx} className="relative group aspect-[9/16] rounded-2xl overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100 border-2 border-white shadow-lg">
                                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                                                            <Instagram className="w-10 h-10 text-pink-600 mb-2" />
                                                            <span className="text-xs font-black text-gray-700">Reel #{idx + 1}</span>
                                                        </div>
                                                        <button
                                                            onClick={async () => {
                                                                setIsUpdating(true);
                                                                const updatedReels = (user.instagramReels || []).filter((_, i) => i !== idx);
                                                                await updateInfluencerProfile(user.id, { instagramReels: updatedReels });
                                                                setIsUpdating(false);
                                                            }}
                                                            className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                                {(!user.instagramReels || user.instagramReels.length === 0) && (
                                                    <div className="col-span-full py-16 text-center rounded-2xl border-2 border-dashed border-pink-200">
                                                        <Instagram className="w-12 h-12 text-pink-300 mx-auto mb-3" />
                                                        <p className="text-gray-400 font-bold text-sm">No Instagram Reels added yet</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* YouTube Videos Section */}
                                        <div className="bg-gradient-to-br from-red-50 to-orange-50 p-10 rounded-[3rem] shadow-xl shadow-gray-100/50 border border-red-100">
                                            <div className="flex items-center justify-between mb-8">
                                                <div>
                                                    <h3 className="text-2xl font-black text-gray-900 italic tracking-tight flex items-center gap-3">
                                                        <Youtube className="w-6 h-6 text-red-600" />
                                                        YouTube Videos
                                                    </h3>
                                                    <p className="text-gray-500 font-medium text-sm mt-1">Add your YouTube video URLs to showcase your video content</p>
                                                </div>
                                            </div>

                                            <form onSubmit={async (e) => {
                                                e.preventDefault();
                                                const formData = new FormData(e.target);
                                                const videoUrl = formData.get('videoUrl');
                                                if (videoUrl) {
                                                    setIsUpdating(true);
                                                    const currentVideos = user.youtubeVideos || [];
                                                    await updateInfluencerProfile(user.id, { youtubeVideos: [...currentVideos, videoUrl] });
                                                    setIsUpdating(false);
                                                    e.target.reset();
                                                }
                                            }} className="mb-8 flex gap-4">
                                                <input
                                                    type="url"
                                                    name="videoUrl"
                                                    placeholder="Paste YouTube video URL (e.g., https://www.youtube.com/watch?v=...)"
                                                    className="flex-1 px-6 py-4 bg-white border-2 border-red-200 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-bold placeholder:text-gray-400"
                                                />
                                                <button
                                                    type="submit"
                                                    disabled={isUpdating}
                                                    className="bg-red-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-red-600/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                                                >
                                                    {isUpdating ? 'Adding...' : 'Add Video'}
                                                </button>
                                            </form>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {user.youtubeVideos?.map((video, idx) => (
                                                    <div key={idx} className="relative group aspect-video rounded-2xl overflow-hidden bg-black shadow-xl">
                                                        <iframe
                                                            className="w-full h-full"
                                                            src={video.includes('embed') ? video : `https://www.youtube.com/embed/${video.split('v=')[1]?.split('&')[0] || video.split('/').pop()}`}
                                                            title={`YouTube video ${idx + 1}`}
                                                            frameBorder="0"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                        ></iframe>
                                                        <button
                                                            onClick={async () => {
                                                                setIsUpdating(true);
                                                                const updatedVideos = (user.youtubeVideos || []).filter((_, i) => i !== idx);
                                                                await updateInfluencerProfile(user.id, { youtubeVideos: updatedVideos });
                                                                setIsUpdating(false);
                                                            }}
                                                            className="absolute top-2 right-2 bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110 z-10"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                                {(!user.youtubeVideos || user.youtubeVideos.length === 0) && (
                                                    <div className="col-span-full py-16 text-center rounded-2xl border-2 border-dashed border-red-200">
                                                        <Youtube className="w-12 h-12 text-red-300 mx-auto mb-3" />
                                                        <p className="text-gray-400 font-bold text-sm">No YouTube videos added yet</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Gallery Images Section */}
                                        <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-gray-100/50 border border-gray-100">
                                            <div className="flex items-center justify-between mb-8">
                                                <div>
                                                    <h3 className="text-2xl font-black text-gray-900 italic tracking-tight flex items-center gap-3">
                                                        <Video className="w-6 h-6 text-primary" />
                                                        Portfolio Images
                                                    </h3>
                                                    <p className="text-gray-500 font-medium text-sm mt-1">Add high-quality images to showcase your work</p>
                                                </div>
                                            </div>

                                            {/* Add Image Form */}
                                            <form onSubmit={handleAddImage} className="mb-8 flex flex-col gap-4 w-full">
                                                <div className="flex flex-col gap-4">
                                                    <div className="relative group w-full">
                                                        <input
                                                            type="file"
                                                            name="fileInput"
                                                            id="portfolioUpload"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={(e) => {
                                                                const fileName = e.target.files[0]?.name;
                                                                if (fileName) {
                                                                    const btn = document.getElementById('portfolio-upload-btn');
                                                                    const txt = document.getElementById('portfolio-status-text');
                                                                    if (btn) btn.innerHTML = `Confirm Upload: ${fileName.substring(0, 15)}...`;
                                                                    if (txt) txt.innerHTML = `Selected: ${fileName}`;
                                                                }
                                                            }}
                                                        />
                                                        <label htmlFor="portfolioUpload" className="w-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-primary/30 rounded-3xl bg-primary/5 hover:bg-primary/10 cursor-pointer transition-all group-hover:border-primary">
                                                            <Upload className="w-10 h-10 text-primary mb-4" />
                                                            <span id="portfolio-status-text" className="font-black text-gray-700 text-lg uppercase tracking-wider text-center px-4">Click to Upload Portfolio Image</span>
                                                        </label>
                                                    </div>
                                                    <button
                                                        id="portfolio-upload-btn"
                                                        disabled={isUpdating}
                                                        type="submit"
                                                        className="bg-primary text-white w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                                                    >
                                                        {isUpdating ? 'Uploading...' : 'Confirm Upload'}
                                                    </button>
                                                </div>
                                            </form>

                                            {/* Gallery Grid */}
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                                {user.gallery?.map((img, idx) => (
                                                    <div key={idx} className="relative group aspect-[4/5] rounded-2xl overflow-hidden border-2 border-gray-100 shadow-lg">
                                                        <img src={getImageUrl(img)} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                            <button
                                                                onClick={() => handleRemoveImage(img)}
                                                                className="bg-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                                                            >
                                                                <LogOut className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                                {(!user.gallery || user.gallery.length === 0) && (
                                                    <div className="col-span-full py-20 text-center rounded-2xl border-2 border-dashed border-gray-200">
                                                        <Video className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                                        <p className="text-gray-400 font-bold text-sm">No portfolio images added yet</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default InfluencerDashboard;
