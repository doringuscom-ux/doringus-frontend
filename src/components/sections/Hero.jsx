import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import VideoGrid from '../ui/VideoGrid';

const Hero = () => {
    return (
        <section className="relative bg-white pt-24 pb-12 overflow-hidden">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                    {/* Left Content */}
                    <div className="flex-1 max-w-2xl lg:py-12 order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-2 mb-6"
                        >
                            <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold tracking-wide">
                                Doringus
                            </span>
                            <span className="text-gray-400 text-sm font-medium flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                Live Platform
                            </span>
                        </motion.div>

                        <h1 className="font-display text-5xl lg:text-7xl font-bold leading-[1.1] text-text-main mb-6 tracking-tight">
                            Connect with <br className="hidden lg:block" />
                            <span className="text-primary">India's Top Creators</span>
                        </h1>

                        <p className="text-lg lg:text-xl text-text-secondary mb-8 leading-relaxed max-w-xl">
                            Doringus is a modern influencer ecosystem where brands and creators collaborate through authentic content and measurable campaigns.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 mb-12">
                            <button className="px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2 text-lg shadow-sm shadow-primary/20">
                                Get Started
                                <ArrowRight className="w-5 h-5" />
                            </button>

                            <button className="px-8 py-4 bg-white text-text-main border border-gray-200 rounded-full font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 text-lg">
                                <Play className="w-4 h-4 fill-current" />
                                Watch Demo
                            </button>
                        </div>

                        {/* Simple Trust Stats */}
                        <div className="flex items-center gap-8 lg:gap-12 pt-8 border-t border-gray-100">
                            <div>
                                <span className="block text-2xl lg:text-3xl font-bold text-text-main">7.5L+</span>
                                <span className="text-sm text-text-secondary font-medium">Influencers</span>
                            </div>
                            <div>
                                <span className="block text-2xl lg:text-3xl font-bold text-text-main">15K+</span>
                                <span className="text-sm text-text-secondary font-medium">Brands</span>
                            </div>
                            <div>
                                <span className="block text-2xl lg:text-3xl font-bold text-text-main">₹2B+</span>
                                <span className="text-sm text-text-secondary font-medium">Paid Out</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Video Feed */}
                    <div className="flex-1 w-full max-w-[500px] lg:max-w-none order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <VideoGrid />
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
