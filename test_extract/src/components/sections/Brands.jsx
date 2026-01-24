import { motion } from 'framer-motion';

const brands = [
    "Google", "Amazon", "Netflix", "Spotify", "Samsung", "Airbnb", "Uber", "Shopify"
];

const Brands = () => {
    return (
        <section className="py-12 border-y border-gray-light bg-white overflow-hidden">
            <div className="container mx-auto px-6 text-center mb-8">
                <p className="text-sm font-bold text-gray uppercase tracking-widest">Trusted by 15,000+ Brands Worldwide</p>
            </div>

            <div className="flex relative">
                <motion.div
                    className="flex gap-16 items-center px-16"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                    {[...brands, ...brands, ...brands].map((brand, index) => (
                        <span key={index} className="text-3xl font-bold text-gray-300 whitespace-nowrap select-none">
                            {brand}
                        </span>
                    ))}
                </motion.div>

                {/* Fade edges */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent" />
            </div>
        </section>
    );
};

export default Brands;
