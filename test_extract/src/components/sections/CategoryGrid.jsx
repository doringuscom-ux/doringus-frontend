import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CategoryGrid = ({ categories }) => {
    return (
        <section className="bg-black py-20">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {categories.map((cat, index) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link
                                to={`/influencer?category=${cat.id}`}
                                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-gray-900 border border-gray-800 block"
                            >
                                {/* Background Image */}
                                <img
                                    src={cat.image || "https://images.unsplash.com/photo-1514525253361-bee243870d22?q=80&w=400&h=400&fit=crop"}
                                    alt={cat.label}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-center p-4">
                                    <h3 className="text-white font-bold text-center group-hover:text-primary transition-colors text-sm lg:text-base">
                                        {cat.label}
                                    </h3>
                                </div>
                            </Link>
                        </motion.div>
                    ))}

                    {/* All Artists Link Card */}
                    <Link
                        to="/influencer"
                        className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-gray-900 border border-gray-800 flex items-center justify-center flex-col gap-2"
                    >
                        <div className="grid grid-cols-3 gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="w-3 h-3 bg-white rounded-sm" />)}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-center p-4">
                            <h3 className="text-white font-bold text-center group-hover:text-primary transition-colors text-sm lg:text-base">
                                All Artists
                            </h3>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid;
