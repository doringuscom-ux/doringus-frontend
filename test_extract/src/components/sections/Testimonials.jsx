import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { Star } from 'lucide-react';

const Testimonials = () => {
    return (
        <section className="py-24 bg-dark-surface text-white">
            <div className="container mx-auto px-6">
                <SectionHeader
                    light
                    label="Testimonials"
                    title="Trusted by 15,000+ Brands"
                />

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {[1, 2].map((_, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="bg-white/5 border border-white/10 p-8 rounded-2xl relative"
                        >
                            <div className="flex gap-1 text-accent mb-4">
                                {[...Array(5)].map((_, j) => (
                                    <Star key={j} size={18} fill="currentColor" />
                                ))}
                            </div>
                            <p className="text-lg leading-relaxed text-gray-300 mb-6 italic">
                                "The ROI we've seen on V-Influencer is unmatched. The platform makes it incredibly easy to find creators who genuinely align with our brand values."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-600 rounded-full" />
                                <div>
                                    <h4 className="font-bold">Alex Morgan</h4>
                                    <p className="text-sm text-gray-400">CMO at TechFlow</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
