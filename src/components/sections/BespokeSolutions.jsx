import { motion } from 'framer-motion';
import { Wallet, Share2, Megaphone, CheckCircle, BarChart2, MessageSquare, Video, ShoppingCart, Target, Award } from 'lucide-react';

const tagsLine1 = [
    { label: "Creator payments", icon: Wallet, from: "from-pink-500", to: "to-rose-500" },
    { label: "Creator affiliate", icon: ShoppingCart, from: "from-emerald-400", to: "to-green-600" },
    { label: "End-to-end campaigns", icon: Megaphone, from: "from-blue-500", to: "to-indigo-600" },
    { label: "Creator shortlisting", icon: CheckCircle, from: "from-violet-500", to: "to-purple-600" },
    { label: "Social Strategy", icon: Share2, from: "from-amber-400", to: "to-orange-500" },
];

const tagsLine2 = [
    { label: "Live reporting", icon: BarChart2, from: "from-red-500", to: "to-pink-600" },
    { label: "Content feedback", icon: MessageSquare, from: "from-teal-400", to: "to-emerald-600" },
    { label: "Content production", icon: Video, from: "from-fuchsia-500", to: "to-purple-600" },
    { label: "Brand Safety", icon: Target, from: "from-cyan-400", to: "to-blue-500" },
    { label: "Quality Assurance", icon: Award, from: "from-orange-400", to: "to-red-500" },
];

const Pill = ({ label, icon: Icon, from, to }) => (
    <div className={`
        flex items-center gap-3 px-8 py-4 rounded-full mx-3 whitespace-nowrap
        bg-gradient-to-r ${from} ${to} text-white shadow-xl shadow-gray-200
        border-2 border-white/20 backdrop-blur-sm
        transform hover:scale-105 transition-transform duration-300 cursor-default
    `}>
        <div className="bg-white/20 p-2 rounded-full backdrop-blur-md">
            <Icon size={18} className="text-white fill-current/10" />
        </div>
        <span className="font-bold text-base tracking-wide drop-shadow-sm">{label}</span>
    </div>
);

const BespokeSolutions = () => {
    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,228,230,0.5),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(230,240,255,0.5),transparent_50%)]" />

            <div className="container mx-auto px-4 text-center mb-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-5xl lg:text-7xl font-black font-display text-gray-900 mb-8 tracking-tight">
                        Bespoke creator-led solutions
                    </h2>
                    <p className="text-xl lg:text-2xl text-gray-500 max-w-4xl mx-auto leading-relaxed font-medium">
                        Elevating the impact of creator marketing through our suite of creator-first solutions — all powered by partnerships, technology, and instinct.
                    </p>

                    <div className="mt-12 p-8 bg-white/50 backdrop-blur-xl rounded-[2rem] border border-white shadow-lg inline-block max-w-4xl">
                        <p className="text-gray-900 text-lg leading-relaxed">
                            Our AI-driven operating system, <span className="font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">SocialOS</span>, streamlines every step of the client and creator experience - scaling the delivery and success of creator campaigns.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full overflow-hidden py-10 space-y-8">
                {/* Row 1 - Left to Right */}
                <div className="flex w-full">
                    <motion.div
                        className="flex items-center"
                        animate={{ x: [0, -1920] }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    >
                        {[...tagsLine1, ...tagsLine1, ...tagsLine1, ...tagsLine1].map((tag, idx) => (
                            <Pill key={`r1-${idx}`} {...tag} />
                        ))}
                    </motion.div>
                </div>

                {/* Row 2 - Right to Left */}
                <div className="flex w-full">
                    <motion.div
                        className="flex items-center"
                        animate={{ x: [-1920, 0] }}
                        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
                    >
                        {[...tagsLine2, ...tagsLine2, ...tagsLine2, ...tagsLine2].map((tag, idx) => (
                            <Pill key={`r2-${idx}`} {...tag} />
                        ))}
                    </motion.div>
                </div>

                {/* Fog Fade Masks */}
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
            </div>
        </section>
    );
};

export default BespokeSolutions;
