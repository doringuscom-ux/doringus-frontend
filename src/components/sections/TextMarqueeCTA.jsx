import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const TextMarqueeCTA = () => {
    return (
        <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

            {/* Header */}
            <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center mb-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 text-white px-6 py-2 rounded-full text-sm font-bold tracking-wider uppercase mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Number 1 for recall & memory
                </motion.div>

                <h2 className="text-5xl lg:text-8xl font-black font-display text-white tracking-tighter mb-8 leading-[0.9]">
                    The world's largest <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-orange-500">
                        independent creator
                    </span> <br />
                    marketing specialist.
                </h2>

                <p className="text-gray-400 text-xl lg:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
                    We know the hustle, ingenuity, and creativity it takes to earn attention in a crowded digital world.
                </p>

                <div className="mt-12 flex justify-center items-center gap-3 text-white/50 font-bold uppercase tracking-widest text-xs">
                    <span>Operating in</span>
                    <span className="text-white border border-white/20 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm">New York</span>
                    <span className="text-white border border-white/20 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm">London</span>
                    <span className="text-white border border-white/20 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm">Mumbai</span>
                </div>
            </div>

            {/* Infinite Marquee */}
            <div className="w-full border-y border-white/10 py-16 bg-[#0a0a0a] flex overflow-hidden relative z-10 rotate-1 scale-105 origin-left">
                <motion.div
                    className="flex whitespace-nowrap items-center"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 15, ease: "linear", repeat: Infinity }}
                >
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center group cursor-pointer">
                            <span className="text-[12vw] font-black font-display leading-none text-white px-8 tracking-tighter group-hover:text-primary transition-colors duration-300">
                                LET'S WO    RK TOGETHER
                            </span>
                            <div className="w-[18vw] h-[10vw] rounded-full overflow-hidden mx-4 border-4 border-white/10 group-hover:border-primary/50 transition-colors duration-300 relative">
                                <img
                                    src={`https://images.unsplash.com/photo-${i === 1 ? '1534528741775-53994a69daeb' : i === 2 ? '1506794778202-cad84cf45f1d' : '1494790108377-be9c29b29330'}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80`}
                                    alt="Creator"
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <ArrowUpRight className="w-12 h-12 text-white" />
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TextMarqueeCTA;
