import { motion } from 'framer-motion';

const TextMarqueeCTA = () => {
    return (
        <section className="py-32 bg-white relative overflow-hidden">

            {/* Header */}
            <div className="text-center mb-24">
                <div className="inline-flex items-center gap-2 bg-[#009b62] text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                    <span>Number 1 for recall & memory</span>
                </div>
                <h2 className="text-4xl lg:text-7xl font-bold font-display text-text-main tracking-tight mb-4 max-w-5xl mx-auto leading-[1.1]">
                    The world's largest independent <br /> creator marketing specialist.
                </h2>
                <p className="text-text-secondary text-xl mt-6">
                    We know the hustle, ingenuity, and creativity it takes to earn attention.
                </p>
                <div className="mt-8 flex justify-center items-center gap-2">
                    <span className="text-primary font-semibold">Operating in</span>
                    <span className="border border-primary text-primary px-3 py-1 rounded-full text-sm font-bold">New York</span>
                </div>
            </div>

            {/* Infinite Marquee */}
            <div className="w-full border-y border-black/10 py-12 bg-white flex overflow-hidden">
                <motion.div
                    className="flex whitespace-nowrap items-center"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                >
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center">
                            <span className="text-[10vw] font-bold font-display leading-none text-text-main px-8 tracking-tighter">
                                Let's work together
                            </span>
                            <div className="w-[15vw] h-[8vw] rounded-full overflow-hidden mx-4 bg-gray-200 shrink-0 relative">
                                <img
                                    src={`https://images.unsplash.com/photo-${i === 1 ? '1534528741775-53994a69daeb' : i === 2 ? '1506794778202-cad84cf45f1d' : '1494790108377-be9c29b29330'}?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80`}
                                    alt="Creator"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TextMarqueeCTA;
