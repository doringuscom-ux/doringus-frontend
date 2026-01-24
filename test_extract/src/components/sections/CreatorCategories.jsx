import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Plane, Coffee, Sparkles, Dumbbell, Laptop, Gamepad2, TrendingUp, ChevronRight } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
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

    if (loading || categories.length === 0) return null;

    const activeCategories = categories.filter(c => c.status === 'Active');
    const filteredInfluencers = influencers.filter(inf => inf.category === activeTab);

    return (
        <section className="py-20 bg-surface-secondary">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold font-display text-text-main mb-4">Explore Categories</h2>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto">Discover authentic creators across every niche.</p>
                </div>

                {/* Tabs - Minimal Style */}
                <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-gray-200 pb-2">
                    {activeCategories.map((cat) => {
                        const Icon = ICON_MAP[cat.icon] || Sparkles;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-t-lg text-sm font-semibold transition-all duration-200 border-b-2 ${activeTab === cat.id
                                    ? 'border-primary text-primary bg-white/50'
                                    : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {cat.label}
                            </button>
                        );
                    })}
                </div>

                {/* Content Grid */}
                <div className="relative min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {filteredInfluencers.length > 0 ? (
                                filteredInfluencers.map((inf) => (
                                    <Link key={inf.id} to={`/influencer/${inf.category}/${inf.username}`} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer border border-gray-100">
                                        <div className="aspect-[4/3] rounded-lg mb-4 bg-gray-100 flex items-center justify-center overflow-hidden">
                                            <img src={inf.profileImage} alt={inf.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                        <h3 className="font-bold text-lg text-text-main group-hover:text-primary transition-colors">{inf.name}</h3>
                                        <p className="text-sm text-gray-400 mb-3">{inf.followers} Followers</p>
                                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                                            {inf.socialLinks.instagram && <span className="px-2 py-1 bg-gray-50 rounded-md">Instagram</span>}
                                            {inf.socialLinks.youtube && <span className="px-2 py-1 bg-gray-50 rounded-md">YouTube</span>}
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center text-gray-400">
                                    No creators found in this category yet.
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="mt-12 text-center">
                    <Link to="/influencer" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors">
                        View all Categories <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CreatorCategories;
