import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import InfluencerHero from '../components/sections/InfluencerHero';
import CategoryGrid from '../components/sections/CategoryGrid';
import { Sparkles } from 'lucide-react';

const InfluencerList = () => {
    const { categories, influencers, loading } = useAdmin();
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');

    useEffect(() => {
        const cat = searchParams.get('category');
        if (cat) setSelectedCategory(cat);
    }, [searchParams]);

    const activeCategories = useMemo(() => {
        return categories.filter(c => c.status === 'Active');
    }, [categories]);

    const filteredInfluencers = useMemo(() => {
        return influencers.filter(inf => {
            const matchesSearch = inf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                inf.username.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory ? inf.category === selectedCategory : true;
            return matchesSearch && matchesCategory;
        });
    }, [influencers, searchQuery, selectedCategory]);

    if (loading) return null;

    return (
        <div className="bg-black min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1">
                {/* New Hero Section */}
                <InfluencerHero
                    categories={activeCategories}
                    onSearch={setSearchQuery}
                    onCategoryChange={setSelectedCategory}
                    selectedCategory={selectedCategory}
                />

                {/* Category Grid Section */}
                <CategoryGrid categories={activeCategories} />

                {/* Influencer Results Section */}
                <div className="container mx-auto px-4 lg:px-8 py-20 border-t border-gray-900">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-bold text-white">
                            {selectedCategory
                                ? `${activeCategories.find(c => c.id === selectedCategory)?.label} Creators`
                                : 'All Creators'
                            }
                        </h2>
                        <span className="text-gray-500 font-medium">Showing {filteredInfluencers.length} results</span>
                    </div>

                    {filteredInfluencers.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {filteredInfluencers.map((inf) => (
                                <Link key={inf.id} to={`/influencer/${inf.category}/${inf.username}`} className="group">
                                    <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-5 bg-gray-900 border border-gray-800 shadow-xl">
                                        <img
                                            src={inf.profileImage}
                                            alt={inf.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{inf.name}</h3>
                                    <p className="text-gray-400 font-medium">{inf.followers} Followers</p>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center bg-gray-900/50 rounded-[2.5rem] border border-gray-800">
                            <Sparkles className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-400">No creators matching your criteria</h3>
                            <button
                                onClick={() => { setSearchQuery(''); setSelectedCategory(''); }}
                                className="mt-4 text-primary font-bold hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default InfluencerList;
