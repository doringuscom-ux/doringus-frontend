import { motion } from 'framer-motion';

const brands = [
    {
        name: "Netflix",
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
    },
    {
        name: "Coca-Cola",
        logo: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg"
    },
    {
        name: "Spotify",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
    },
    {
        name: "Netflix",
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
    },
    {
        name: "Zara",
        logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg"
    },
    {
        name: "Google",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
    },
    {
        name: "Microsoft",
        logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg"
    },
    {
        name: "Amazon",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
    }
];

const BrandsMarquee = () => {
    return (
        <section className="py-16 bg-white relative overflow-hidden">
            {/* Subtle Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50 pointer-events-none" />

            {/* Abstract Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[300px] bg-gradient-to-r from-blue-50/30 via-purple-50/30 to-pink-50/30 blur-[80px] -z-10 rounded-full" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header with entrance animation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center mb-12"
                >
                    <div className="group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full opacity-30 group-hover:opacity-100 transition duration-500 blur-sm"></div>
                        <span className="relative inline-flex items-center px-8 py-3 rounded-full bg-white border border-gray-100 text-[11px] font-extrabold tracking-[0.2em] text-gray-800 uppercase font-sans shadow-lg hover:shadow-xl transition-all cursor-default select-none">
                            Trusted by Leading Global Brands
                        </span>
                    </div>
                </motion.div>

                {/* Slider Container */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative w-full overflow-hidden"
                >
                    {/* Premium Gradient Masks */}
                    <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
                    <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

                    <div className="flex select-none">
                        <motion.div
                            className="flex items-center gap-16 md:gap-32 pr-16 md:pr-32"
                            animate={{ x: "-50%" }}
                            transition={{
                                duration: 40,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            {/* Duplicate list multiple times for seamless scrolling on large screens */}
                            {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
                                <div
                                    key={`${brand.name} -${index} `}
                                    className="relative flex-shrink-0 group cursor-pointer"
                                >
                                    {/* Full Color Logos by Default */}
                                    <div className="h-10 md:h-16 w-auto transition-all duration-500 transform group-hover:scale-110 ease-out filter drop-shadow-sm group-hover:drop-shadow-lg opacity-90 hover:opacity-100">
                                        <img
                                            src={brand.logo}
                                            alt={brand.name}
                                            className="h-full w-auto object-contain"
                                        />
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default BrandsMarquee;
