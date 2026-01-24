const brands = [
    "Nike", "Adidas", "Samsung", "Coca-Cola", "Spotify", "Netflix",
    "Zara", "H&M", "Gucci", "BMW", "Mercedes", "Apple"
];

const BrandsMarquee = () => {
    return (
        <section className="py-12 bg-white border-b border-gray-50 overflow-hidden">
            <div className="container mx-auto px-4 mb-10 text-center">
                <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase font-sans">Trusted by leading global brands</p>
            </div>

            <div className="relative flex overflow-x-hidden group">
                {/* Gradient Masks */}
                <div className="absolute top-0 left-0 w-20 lg:w-40 h-full bg-gradient-to-r from-white to-transparent z-10" />
                <div className="absolute top-0 right-0 w-20 lg:w-40 h-full bg-gradient-to-l from-white to-transparent z-10" />

                <div className="animate-marquee whitespace-nowrap flex items-center gap-16 lg:gap-24 py-2">
                    {[...brands, ...brands, ...brands].map((brand, index) => (
                        <span
                            key={index}
                            className="text-2xl lg:text-3xl font-bold text-gray-300 hover:text-gray-900 transition-colors duration-500 cursor-default select-none font-display grayscale opacity-60 hover:opacity-100 hover:grayscale-0"
                        >
                            {brand}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrandsMarquee;
