import { motion } from 'framer-motion';
import { Instagram, Youtube, Twitter, ChevronRight } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { Link } from 'react-router-dom';

const InfluencerGrid = () => {
    const { influencers, loading } = useAdmin();

    const featuredInfluencers = influencers.filter(inf => inf.isFeatured);

    const getPlatformIcon = (links) => {
        if (links.instagram) return Instagram;
        if (links.youtube) return Youtube;
        if (links.twitter) return Twitter;
        return Instagram;
    };

    if (loading) return null;

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl lg:text-5xl font-bold font-display text-text-main mb-4">Featured <span className="text-primary">Creators</span></h2>
                        <p className="text-text-secondary text-lg max-w-xl">Handpicked authentic voices driving real engagement.</p>
                    </div>
                    <Link to="/influencer" className="px-6 py-2 rounded-full border border-gray-200 font-semibold text-text-main hover:bg-gray-50 transition-colors inline-block text-center">
                        View All Creators
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredInfluencers.map((influencer, index) => {
                        const Icon = getPlatformIcon(influencer.socialLinks);
                        return (
                            <Link to={`/influencer/${influencer.category}/${influencer.username}`} key={influencer.id} className="group cursor-pointer">
                                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-gray-100">
                                    <img
                                        src={influencer.profileImage}
                                        alt={influencer.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm">
                                        <Icon className="w-4 h-4 text-text-main" />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-text-main group-hover:text-primary transition-colors">{influencer.name}</h3>
                                    <div className="flex items-center gap-2 text-sm text-text-secondary mt-1">
                                        <span className="capitalize">{influencer.category}</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                                        <span className="font-semibold text-text-main">{influencer.followers}</span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}

                    {featuredInfluencers.length === 0 && (
                        <div className="col-span-full text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
                            <p className="text-gray-400">No featured creators found. Add some from the Admin Panel!</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default InfluencerGrid;
