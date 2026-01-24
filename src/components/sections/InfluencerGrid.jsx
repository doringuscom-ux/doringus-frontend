import { motion } from 'framer-motion';
import { Instagram, Youtube, Twitter, ArrowRight, Star } from 'lucide-react';
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
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl lg:text-6xl font-black font-display text-gray-900 mb-6 tracking-tighter">
                            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Creators</span>
                        </h2>
                        <p className="text-gray-500 text-xl font-medium max-w-xl leading-relaxed">
                            Handpicked authentic voices on Doringus driving real engagement.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link to="/influencer" className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gray-50 border border-gray-100 font-bold text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300">
                            View All Creators
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredInfluencers.map((influencer, index) => {
                        const Icon = getPlatformIcon(influencer.socialLinks);
                        return (
                            <motion.div
                                key={influencer.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link to={`/influencer/${influencer.category}/${influencer.username}`} className="group cursor-pointer block h-full">
                                    <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden mb-6 bg-gray-100 shadow-lg shadow-gray-200/50 group-hover:shadow-2xl group-hover:shadow-primary/20 transition-all duration-500">
                                        <img
                                            src={influencer.profileImage}
                                            alt={influencer.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/20 group-hover:scale-110 transition-transform">
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>

                                        <div className="absolute bottom-6 left-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                            <div className="inline-flex items-center gap-1.5 bg-primary/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-3 backdrop-blur-sm">
                                                <Star className="w-3 h-3 fill-current" />
                                                Featured
                                            </div>
                                            <h3 className="text-2xl font-black mb-1 group-hover:text-primary transition-colors">{influencer.name}</h3>
                                            <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                                                <span className="capitalize">{influencer.category}</span>
                                                <span className="w-1 h-1 rounded-full bg-white/50" />
                                                <span>{influencer.followers}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}

                    {featuredInfluencers.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center py-24 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-100">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <Star className="w-8 h-8 text-gray-300" />
                            </div>
                            <p className="text-gray-400 font-bold text-lg">No visible stars yet.</p>
                            <p className="text-gray-400 text-sm mt-1">Add featured creators from the Doringus Admin Panel.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default InfluencerGrid;
