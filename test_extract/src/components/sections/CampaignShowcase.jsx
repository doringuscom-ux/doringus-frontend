import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, TrendingUp, Users, Eye } from 'lucide-react';

const campaigns = [
    {
        id: 'spotify',
        brand: 'Spotify',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg',
        color: 'bg-[#ffcdd2]', // Pinkish from image
        accent: 'bg-[#1DB954]', // Spotify Green
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
        stats: [
            { label: '$2M+ Generated in earned talent value', icon: TrendingUp },
            { label: '37M Views driven by wrapped 2024 alone', icon: Eye },
            { label: '90% Post rate across a curated creator squad', icon: Users }
        ]
    },
    {
        id: 'coke',
        brand: 'Coca Cola',
        color: 'bg-[#ccff00]', // Neon Green from image
        accent: 'bg-red-600',
        image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
        stats: [
            { label: '15% Increase in brand recall', icon: TrendingUp },
            { label: '50M+ Organic Impressions', icon: Eye }
        ]
    },
    {
        id: 'asos',
        brand: 'Asos',
        color: 'bg-[#7dd3fc]', // Light Blue from image
        accent: 'bg-black',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
        stats: [
            { label: '4.5x ROAS on TikTok', icon: TrendingUp },
            { label: '10k+ Pieces of content generated', icon: Users }
        ]
    },
    {
        id: 'monzo',
        brand: 'Monzo',
        color: 'bg-[#f43f5e]', // Red/Pink from image
        accent: 'bg-[#14233c]',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
        stats: [
            { label: 'Top Banking App 2024', icon: TrendingUp }
        ]
    }
];

const CampaignShowcase = () => {
    const [activeId, setActiveId] = useState('spotify');

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl lg:text-7xl font-bold font-display text-text-main tracking-tight mb-4">
                        Where scale meets substance
                    </h2>
                    <p className="text-text-secondary text-lg lg:text-xl max-w-3xl mx-auto">
                        6,000+ campaigns delivered. 90,000+ creators contracted. <br />
                        92% client retention – and we’re only just getting started
                    </p>
                </div>

                {/* Accordion Container */}
                <div className="flex flex-col lg:flex-row h-[600px] lg:h-[600px] gap-2 lg:gap-0 rounded-3xl overflow-hidden shadow-2xl">
                    {campaigns.map((campaign) => {
                        const isActive = activeId === campaign.id;

                        return (
                            <motion.div
                                key={campaign.id}
                                layout
                                onClick={() => setActiveId(campaign.id)}
                                onHoverStart={() => !isActive && setActiveId(campaign.id)} // Optional: hover to expand
                                className={`relative cursor-pointer transition-all duration-500 ease-in-out overflow-hidden ${isActive ? 'flex-[10] lg:flex-[5]' : 'flex-[2] lg:flex-1'} ${campaign.color}`}
                                style={{ minHeight: '100px' }} // Fallback for mobile
                            >
                                <AnimatePresence mode="wait">
                                    {isActive ? (
                                        // Expanded View
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 p-8 flex flex-col justify-end"
                                        >
                                            {/* Background Image / Overlay */}
                                            <div className="absolute inset-0 z-0">
                                                <img src={campaign.image} alt={campaign.brand} className="w-full h-full object-cover opacity-80 mix-blend-multiply" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                            </div>

                                            <div className="relative z-10 w-full">
                                                <div className="flex justify-between items-start mb-auto absolute top-0 left-0 right-0 p-8">
                                                    {/* Brand Pill */}
                                                    <div className="bg-white px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
                                                        <span className="font-bold text-black">{campaign.brand}</span>
                                                        <div className={`w-6 h-6 rounded-full ${campaign.accent} flex items-center justify-center`}>
                                                            <ArrowRight className="w-3 h-3 text-white" />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Stats */}
                                                <div className="flex flex-wrap gap-3 mt-auto">
                                                    {campaign.stats.map((stat, idx) => (
                                                        <motion.div
                                                            key={idx}
                                                            initial={{ y: 20, opacity: 0 }}
                                                            animate={{ y: 0, opacity: 1 }}
                                                            transition={{ delay: 0.1 * idx }}
                                                            className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 flex items-center gap-2 shadow-lg"
                                                        >
                                                            <stat.icon size={14} className="text-black" />
                                                            <span className="text-sm font-bold text-black">{stat.label}</span>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        // Collapsed View (Vertical Text)
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <h3 className="text-2xl font-bold text-black -rotate-90 whitespace-nowrap uppercase tracking-widest">
                                                {campaign.brand}
                                            </h3>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CampaignShowcase;
