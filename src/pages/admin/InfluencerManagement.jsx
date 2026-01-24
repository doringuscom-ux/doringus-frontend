import { useState, useMemo } from 'react';
import { useAdmin } from '../../context/AdminContext';
import {
    Plus, Edit2, Trash2, Star, Link as LinkIcon, ExternalLink,
    Search, Filter, CheckCircle, XCircle, MoreVertical,
    TrendingUp, Award, Instagram, Youtube, DollarSign,
    Check,
    Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InfluencerManagement = () => {
    const { influencers = [], categories = [], addInfluencer, updateInfluencer, deleteInfluencer, updateInfluencerStatus } = useAdmin() || {};
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [filterStatus, setFilterStatus] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [actionLoading, setActionLoading] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        category: '',
        profileImage: '',
        bio: '',
        followers: '',
        isFeatured: false,
        status: 'Approved',
        instagramFollowers: '',
        youtubeSubscribers: '',
        pricePerReel: '',
        collaborationPrice: '',
        instagramReels: [],
        youtubeVideos: [],
    });

    const resetForm = () => {
        setFormData({
            name: '',
            username: '',
            category: '',
            profileImage: '',
            bio: '',
            followers: '',
            isFeatured: false,
            status: 'Approved',
            instagramFollowers: '',
            youtubeSubscribers: '',
            pricePerReel: '',
            collaborationPrice: '',
            instagramReels: [],
            youtubeVideos: [],
        });
        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setActionLoading('submitting');
        try {
            if (editingId) {
                await updateInfluencer(editingId, formData);
            } else {
                await addInfluencer({ ...formData });
            }
            setIsAdding(false);
            resetForm();
        } catch (error) {
            alert("Action failed: " + error.message);
        } finally {
            setActionLoading(null);
        }
    };

    const handleApprove = async (id) => {
        if (!id) return;
        setActionLoading(id);
        const res = await updateInfluencerStatus(id, 'Approved');
        if (res && !res.success) alert(res.message);
        setActionLoading(null);
    };

    const handleDelete = async (id) => {
        if (!id) return;
        if (!window.confirm('IRREVERSIBLE ACTION: Are you sure you want to remove this creator from the database?')) return;

        setActionLoading(id);
        const res = await deleteInfluencer(id);
        if (res && !res.success) {
            alert("Error: " + res.message);
        }
        setActionLoading(null);
    };

    const handleEdit = (inf) => {
        if (!inf) return;
        setFormData({ ...inf });
        setEditingId(inf.id);
        setIsAdding(true);
    };

    const filteredInfluencers = useMemo(() => {
        if (!Array.isArray(influencers)) return [];
        return influencers.filter(inf => {
            const matchesStatus = filterStatus === 'All' || inf?.status === filterStatus;
            const matchesSearch = (inf?.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                (inf?.username?.toLowerCase() || '').includes(searchTerm.toLowerCase());
            return matchesStatus && matchesSearch;
        });
    }, [influencers, filterStatus, searchTerm]);

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <Users className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Registry Control</span>
                    </div>
                    <h1 className="text-5xl font-black text-gray-900 tracking-tighter italic">
                        Creator<span className="text-primary italic">.</span> Ecosystem
                    </h1>
                    <p className="text-gray-400 mt-2 font-bold uppercase tracking-widest text-xs">Curate and manage your ultimate talent pool.</p>
                </div>
                <button
                    onClick={() => { setIsAdding(true); resetForm(); }}
                    className="bg-black text-white px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-primary transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
                >
                    <Plus className="w-5 h-5" /> Onboard Creator
                </button>
            </div>

            {/* Advanced Filters */}
            <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="flex bg-gray-50 p-1.5 rounded-2xl w-full md:w-auto overflow-x-auto no-scrollbar">
                    {['All', 'Approved', 'Pending', 'Rejected'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${filterStatus === status
                                ? 'bg-white text-primary shadow-sm'
                                : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by alias or stage name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold text-sm"
                    />
                </div>
            </div>

            {/* List Components */}
            <AnimatePresence mode="wait">
                {isAdding ? (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50 relative"
                    >
                        <div className="absolute top-10 right-10">
                            <button onClick={() => setIsAdding(false)} className="p-4 hover:bg-gray-50 rounded-[1.5rem] transition-all text-gray-400 hover:text-red-500">
                                <XCircle className="w-8 h-8" />
                            </button>
                        </div>

                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl font-black text-gray-900 tracking-tight italic mb-2">
                                    {editingId ? 'Edit Identity' : 'Establish New Profile'}
                                </h2>
                                <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">Define the parameters for this creator entity</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-12">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    {/* Left Column */}
                                    <div className="space-y-8">
                                        <div className="space-y-2">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-6">Core Statistics</h4>

                                            <div className="space-y-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Public Handle</label>
                                                    <input required value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-6 py-4 bg-gray-50 rounded-2xl font-bold border-none outline-none focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all" placeholder="Sarah Parker" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Unique Access ID (@)</label>
                                                    <input required value={formData.username || ''} onChange={e => setFormData({ ...formData, username: e.target.value })} className="w-full px-6 py-4 bg-gray-50 rounded-2xl font-bold border-none outline-none focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all" placeholder="sarah_parker" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Genre Type</label>
                                                    <select required value={formData.category || ''} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full px-6 py-4 bg-gray-50 rounded-2xl font-black border-none outline-none focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all appearance-none">
                                                        <option value="">Select Domain</option>
                                                        {categories.map(cat => <option key={cat?.id} value={cat?.id}>{cat?.label}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-8">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-6">Market Valuation</h4>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Price/Reel</label>
                                                <input value={formData.pricePerReel || ''} onChange={e => setFormData({ ...formData, pricePerReel: e.target.value })} className="w-full px-6 py-4 bg-gray-50 rounded-2xl font-bold border-none outline-none focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all" placeholder="$500" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Collab Price</label>
                                                <input value={formData.collaborationPrice || ''} onChange={e => setFormData({ ...formData, collaborationPrice: e.target.value })} className="w-full px-6 py-4 bg-gray-50 rounded-2xl font-bold border-none outline-none focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all" placeholder="$1000" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Identity Source (Avatar URL)</label>
                                            <input required value={formData.profileImage || ''} onChange={e => setFormData({ ...formData, profileImage: e.target.value })} className="w-full px-6 py-4 bg-gray-50 rounded-2xl font-bold border-none outline-none focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all" placeholder="https://..." />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Verification Status</label>
                                            <select value={formData.status || 'Approved'} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full px-6 py-4 bg-gray-50 rounded-2xl font-black border-none outline-none focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all">
                                                <option value="Approved">Verified / Approved</option>
                                                <option value="Pending">Awaiting Inspection</option>
                                                <option value="Rejected">Rejected</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-10 border-t border-gray-50 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <input type="checkbox" id="featured" checked={formData.isFeatured || false} onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })} className="w-6 h-6 rounded-lg border-2 border-gray-100 text-primary focus:ring-primary" />
                                        <label htmlFor="featured" className="text-xs font-black uppercase tracking-widest text-gray-900 select-none">Showcase on Spotlight (Featured)</label>
                                    </div>
                                    <div className="flex gap-4">
                                        <button type="button" onClick={() => setIsAdding(false)} className="px-10 py-5 bg-gray-50 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:bg-gray-100">Abort</button>
                                        <button type="submit" disabled={actionLoading} className="px-12 py-5 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50">
                                            {actionLoading ? 'Synchronizing...' : (editingId ? 'Confirm Updates' : 'Initialize Profile')}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {filteredInfluencers.map((inf, idx) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                key={inf?.id || idx}
                                className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 flex flex-col md:flex-row items-center gap-10 group"
                            >
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-[6px] border-white shadow-xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                        <img src={inf?.profileImage} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    {inf?.isFeatured && (
                                        <div className="absolute -top-3 -right-3 bg-primary text-white p-2.5 rounded-2xl shadow-xl shadow-primary/40 -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                                            <Star className="w-4 h-4 fill-current" />
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 space-y-4 text-center md:text-left">
                                    <div>
                                        <h3 className="text-2xl font-black text-gray-900 tracking-tight italic">{inf?.name || 'Unknown'}</h3>
                                        <p className="text-sm text-primary font-black uppercase tracking-widest mt-1">@{inf?.username || 'user'}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                        <span className="px-4 py-2 bg-gray-100 text-gray-500 text-[10px] rounded-xl font-black uppercase tracking-widest border border-gray-100/50">{inf?.category || 'None'}</span>
                                        <span className={`px-4 py-2 text-[10px] rounded-xl font-black uppercase tracking-widest border flex items-center gap-2 ${inf?.status === 'Approved' ? 'bg-emerald-100/50 text-emerald-600 border-emerald-100' :
                                            inf?.status === 'Pending' ? 'bg-amber-100/50 text-amber-600 border-amber-100' : 'bg-rose-100/50 text-rose-600 border-rose-100'
                                            }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${inf?.status === 'Approved' ? 'bg-emerald-600' : inf?.status === 'Pending' ? 'bg-amber-600 animate-pulse' : 'bg-rose-600'}`} />
                                            {inf?.status || 'Active'}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8 px-10 border-x border-gray-50 hidden lg:grid">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-pink-500">
                                            <Instagram className="w-4 h-4" />
                                            <span className="text-base font-black italic">{inf?.instagramFollowers || '0'}</span>
                                        </div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Reach</p>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-emerald-500">
                                            <DollarSign className="w-4 h-4" />
                                            <span className="text-base font-black italic">{inf?.pricePerReel || '0'}</span>
                                        </div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Valuation</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 min-w-[180px] justify-center">
                                    {inf?.status === 'Pending' && (
                                        <button
                                            onClick={() => handleApprove(inf?.id)}
                                            disabled={actionLoading === inf?.id}
                                            className="w-14 h-14 bg-emerald-100/50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm disabled:opacity-50"
                                            title="Verify Creator"
                                        >
                                            {actionLoading === inf?.id ? <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" /> : <Check className="w-6 h-6" />}
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleEdit(inf)}
                                        className="w-14 h-14 bg-blue-50/50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm"
                                        title="Recalibrate"
                                    >
                                        <Edit2 className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(inf?.id)}
                                        disabled={actionLoading === inf?.id}
                                        className="w-14 h-14 bg-rose-50/50 text-rose-500 hover:bg-rose-500 hover:text-white rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm disabled:opacity-50"
                                        title="Eliminate"
                                    >
                                        {actionLoading === inf?.id ? <div className="w-5 h-5 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" /> : <Trash2 className="w-5 h-5" />}
                                    </button>
                                </div>
                            </motion.div>
                        ))}

                        {filteredInfluencers.length === 0 && (
                            <div className="text-center py-40 bg-gray-50/50 rounded-[3.5rem] border-4 border-dashed border-gray-100 flex flex-col items-center">
                                <div className="w-24 h-24 bg-gray-100 rounded-[2.5rem] flex items-center justify-center text-gray-300 mb-8 border-4 border-white shadow-xl">
                                    <Search className="w-10 h-10" />
                                </div>
                                <h3 className="text-3xl font-black text-gray-900 tracking-tight italic">Void Detected.</h3>
                                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-2 italic">Try a different frequency or onboarding a new creator.</p>
                            </div>
                        )}
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default InfluencerManagement;
