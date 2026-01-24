import { motion } from 'framer-motion';
import { Wallet, Share2, Megaphone, CheckCircle, BarChart2, MessageSquare, Video, ShoppingCart } from 'lucide-react';

const tagsLine1 = [
    { label: "Creator payments", icon: Wallet, color: "bg-red-500" },
    { label: "Creator affiliate", icon: ShoppingCart, color: "bg-green-500" },
    { label: "End-to-end creator campaigns", icon: Megaphone, color: "bg-red-600" },
    { label: "Creator shortlisting", icon: CheckCircle, color: "bg-blue-500" },
    { label: "Social Strategy", icon: Share2, color: "bg-yellow-500" },
];

const tagsLine2 = [
    { label: "Live campaign reporting", icon: BarChart2, color: "bg-red-500" },
    { label: "Content feedback", icon: MessageSquare, color: "bg-green-500" },
    { label: "Content production & remixing", icon: Video, color: "bg-pink-500" },
    { label: "Creator payments", icon: Wallet, color: "bg-red-500" },
    { label: "Brand Safety", icon: CheckCircle, color: "bg-blue-500" },
];

const Pill = ({ label, icon: Icon, color }) => (
    <div className={`flex items-center gap-3 px-6 py-3 rounded-full ${color} text-white shadow-lg mx-2 whitespace-nowrap`}>
        <div className="bg-white/20 p-1.5 rounded-full">
            <Icon size={16} className="text-white" />
        </div>
        <span className="font-bold text-sm lg:text-base tracking-wide">{label}</span>
    </div>
);

const BespokeSolutions = () => {
    return (
        <section className="py-24 bg-pink-50 overflow-hidden relative">
            <div className="container mx-auto px-4 text-center mb-16 relative z-10">
                <h2 className="text-4xl lg:text-6xl font-bold font-display text-text-main mb-6">
                    Bespoke creator-led solutions
                </h2>
                <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
                    Elevating the impact of creator marketing through our suite of creator-first solutions — all powered by partnerships, technology, and instinct.
                </p>

                <p className="mt-8 text-text-main max-w-3xl mx-auto text-lg">
                    Our AI-driven operating system, <span className="font-bold">SocialOS</span>, streamlines every step of the client and creator experience - scaling the delivery and success of creator campaigns.
                </p>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full overflow-hidden py-10">
                {/* Row 1 - Left */}
                <div className="flex mb-6 w-full max-w-[120vw] -ml-[10vw]">
                    <motion.div
                        className="flex items-center"
                        animate={{ x: [0, -1000] }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    >
                        {[...tagsLine1, ...tagsLine1, ...tagsLine1, ...tagsLine1].map((tag, idx) => (
                            <Pill key={`r1-${idx}`} {...tag} />
                        ))}
                    </motion.div>
                </div>

                {/* Row 2 - Right */}
                <div className="flex w-full max-w-[120vw] -ml-[10vw]">
                    <motion.div
                        className="flex items-center"
                        animate={{ x: [-1000, 0] }}
                        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                    >
                        {[...tagsLine2, ...tagsLine2, ...tagsLine2, ...tagsLine2].map((tag, idx) => (
                            <Pill key={`r2-${idx}`} {...tag} />
                        ))}
                    </motion.div>
                </div>

                {/* Gradient Fade Masks */}
                <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-pink-50 to-transparent z-10" />
                <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-pink-50 to-transparent z-10" />
            </div>
        </section>
    );
};

export default BespokeSolutions;
