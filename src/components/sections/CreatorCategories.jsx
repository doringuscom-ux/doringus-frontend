import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Plane, Coffee, Sparkles, Dumbbell, Laptop, Gamepad2, TrendingUp, ChevronRight } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { getImageUrl } from '../../utils/axiosConfig';
import { Link } from 'react-router-dom';

const ICON_MAP = {
    Camera, Plane, Coffee, Sparkles, Dumbbell, Laptop, Gamepad2, TrendingUp
};

const CreatorCategories = () => {
    const { categories, influencers, loading } = useAdmin();
    const [activeTab, setActiveTab] = useState('');

    useEffect(() => {
        if (categories.length > 0 && !activeTab) {
            const firstActive = categories.find(c => c.status === 'Active');
            if (firstActive) setActiveTab(firstActive.id);
        }
    }, [categories, activeTab]);

    if (loading) {
        return (
            <div className="py-20 bg-surface-secondary flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (categories.length === 0) return null;

    const activeCategories = categories.filter(c => c.status === 'Active');
    const filteredInfluencers = influencers.filter(inf => {
        const matchesCategory = inf.category?.toLowerCase() === activeTab?.toLowerCase();
        // Support Approved status, lowercase approved, or missing status (for legacy)
        const isApproved = !inf.status ||
            inf.status.toLowerCase() === 'approved' ||
            inf.status === 'Approved';
        return matchesCategory && isApproved;
    });

    return (
        <section className="py-20 bg-surface-secondary relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/4 translate-y-1/4" />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-4 block"
                    >
                        Niche Discovery
                    </motion.span>
                    <h2 className="text-4xl lg:text-6xl font-black font-display text-text-main mb-6 tracking-tighter italic">
                        Explore <span className="text-primary italic">Categories.</span>
                    </h2>
                    <p className="text-text-secondary text-xl max-w-2xl mx-auto font-medium">
                        Discover world-class authentic creators across every niche.
                    </p>
                </div>

                {/* Tabs - Glassy Style */}
                <div className="flex flex-wrap justify-center gap-3 mb-16 p-2 bg-gray-100/50 backdrop-blur-md rounded-3xl w-fit mx-auto border border-gray-200/50">
                    {activeCategories.map((cat) => {
                        const Icon = ICON_MAP[cat.icon] || Sparkles;
                        const isActive = activeTab === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-black transition-all duration-500 uppercase tracking-widest ${isActive
                                    ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105'
                                    : 'text-gray-500 hover:text-gray-900 hover:bg-white'
                                    }`}
                            >
                                <Icon className={`w-4 h-4 ${isActive ? 'animate-pulse' : ''}`} />
                                {cat.label}
                            </button>
                        );
                    })}
                </div>

                {/* Content Grid */}
                <div className="relative min-h-[500px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        >
                            {filteredInfluencers.length > 0 ? (
                                filteredInfluencers.map((inf) => (
                                    <Link
                                        key={inf.id}
                                        to={`/influencer/${inf.category}/${inf.username}`}
                                        className="group"
                                    >
                                        <div className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-gray-100 border border-gray-50 hover:border-primary/20 transition-all duration-500 hover:-translate-y-2">
                                            <div className="aspect-[4/5] rounded-[2rem] mb-6 bg-gray-100 flex items-center justify-center overflow-hidden relative">
                                                <img
                                                    src={getImageUrl(inf.profileImage)}
                                                    alt={inf.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                                    <span className="text-white font-black text-xs uppercase tracking-widest">View Profile</span>
                                                </div>
                                            </div>
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <h3 className="font-black text-2xl text-text-main group-hover:text-primary transition-colors tracking-tight italic">{inf.name}</h3>
                                                    <p className="text-sm font-bold text-gray-400">@{inf.username}</p>
                                                </div>
                                                <div className="flex items-center gap-1 bg-yellow-400/10 px-2 py-1 rounded-lg">
                                                    <Sparkles className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                                    <span className="text-[10px] font-black text-yellow-600">NEW</span>
                                                </div>
                                            </div>
                                            <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <span className="font-black text-gray-900">{inf.instagramFollowers || inf.followers}</span>
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Followers</span>
                                                </div>
                                                <div className="flex -space-x-2">
                                                    {inf.instagramLink && (
                                                        <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center border-2 border-white">
                                                            <Camera className="w-3.5 h-3.5 text-pink-600" />
                                                        </div>
                                                    )}
                                                    {inf.youtubeLink && (
                                                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center border-2 border-white">
                                                            <Laptop className="w-3.5 h-3.5 text-red-600" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="col-span-full py-32 text-center rounded-[3rem] border-2 border-dashed border-gray-200">
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Sparkles className="w-10 h-10 text-gray-300" />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 mb-2 italic">Coming Soon</h3>
                                    <p className="text-gray-500 font-medium">We're currently onboarding top-tier creators in this niche.</p>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="mt-20 text-center">
                    <Link
                        to="/influencers"
                        className="group inline-flex items-center gap-4 text-gray-900 font-black uppercase tracking-widest text-sm hover:text-primary transition-all"
                    >
                        <span className="border-b-2 border-gray-900 group-hover:border-primary py-1">View all Category Hubs</span>
                        <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center group-hover:bg-primary transition-colors">
                            <ChevronRight className="w-5 h-5" />
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CreatorCategories;
