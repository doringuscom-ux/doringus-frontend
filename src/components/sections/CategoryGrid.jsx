import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../utils/axiosConfig';

// Helper function to create URL-friendly slug from category label
const createSlug = (label, name) => {
    const text = label || name || '';
    return text.toLowerCase().replace(/\s+/g, '-') || '';
};

const CategoryGrid = ({ categories }) => {
    // Premium Category Images Mapping
    const getFallbackImage = (label) => {
        const fallbacks = {
            'fashion': 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
            'lifestyle': 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=800&auto=format&fit=crop',
            'beauty': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop',
            'fitness': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop',
            'travel': 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop',
            'food': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop',
            'tech': 'https://images.unsplash.com/photo-1498050100744-acc3c242a00e?q=80&w=800&auto=format&fit=crop',
            'gadgets': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop',
            'gaming': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
            'entertainment': 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop',
            'comedy': 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?q=80&w=800&auto=format&fit=crop',
            'education': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop',
            'business': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
            'music': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
            'photography': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop',
            'ugc': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop'
        };

        const key = label?.toLowerCase().trim();
        return fallbacks[key] || "https://images.unsplash.com/photo-1514525253361-bee243870d22?q=80&w=800&auto=format&fit=crop";
    };

    return (
        <section className="bg-black py-20">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {categories.map((cat, index) => {
                        const slug = createSlug(cat.label, cat.name);
                        const categoryImg = getImageUrl(cat.image) || getFallbackImage(cat.label || cat.name);

                        return (
                            <motion.div
                                key={cat.id || cat._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link
                                    to={`/influencers/${slug}`}
                                    className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-gray-900 border border-gray-800 block"
                                >
                                    {/* Background Image */}
                                    <img
                                        src={categoryImg}
                                        alt={cat.label || cat.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                                        onError={(e) => {
                                            e.target.src = getFallbackImage(cat.label || cat.name);
                                            e.target.onerror = null;
                                        }}
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-center p-4">
                                        <h4 className="text-white font-black text-center group-hover:text-primary transition-colors text-xs lg:text-sm uppercase tracking-widest italic leading-none">
                                            {cat.label || cat.name}
                                        </h4>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}

                    {/* All Artists Link Card */}
                    <Link
                        to="/influencers"
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
