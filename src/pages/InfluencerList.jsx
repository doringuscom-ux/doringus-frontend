import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import InfluencerHero from '../components/sections/InfluencerHero';
import CategoryGrid from '../components/sections/CategoryGrid';
import { getImageUrl } from '../utils/axiosConfig';
import { Sparkles } from 'lucide-react';

// Helper function to create URL-friendly slug from category label
const createSlug = (label) => {
    return label?.toLowerCase().replace(/\s+/g, '-') || '';
};

const InfluencerList = () => {
    const { category: categorySlug, location: cityParam } = useParams();
    const { categories, influencers, loading } = useAdmin();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const activeCategories = useMemo(() => {
        return (categories || []).filter(c => !c.status || c.status === 'Active' || c.status === 'active');
    }, [categories]);

    // Find the category object by matching the slug from URL
    const selectedCategoryObj = useMemo(() => {
        if (!categorySlug) return null;
        return activeCategories.find(cat => createSlug(cat.label || cat.name) === categorySlug);
    }, [categorySlug, activeCategories]);

    const selectedCategory = selectedCategoryObj?.id || selectedCategoryObj?._id || '';

    const filteredInfluencers = useMemo(() => {
        return (influencers || []).filter(inf => {
            const matchesSearch = (inf.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                (inf.username || '').toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = selectedCategory
                ? (inf.categories && Array.isArray(inf.categories)
                    ? inf.categories.some(cat => String(cat) === String(selectedCategory))
                    : String(inf.category) === String(selectedCategory))
                : true;

            const matchesLocation = cityParam
                ? (inf.location || '').toLowerCase() === cityParam.toLowerCase()
                : true;

            const isApproved = !inf.status ||
                inf.status.toLowerCase() === 'approved' ||
                inf.status === 'Approved';

            return matchesSearch && matchesCategory && matchesLocation && isApproved;
        });
    }, [influencers, searchQuery, selectedCategory, cityParam]);

    const handleCategoryChange = (catId) => {
        const cat = activeCategories.find(c => (c.id === catId || c._id === catId));
        if (cat) {
            const slug = createSlug(cat.label || cat.name);
            navigate(`/influencers/${slug}`);
        } else {
            navigate('/influencers');
        }
    };

    return (
        <div className="bg-black min-h-screen flex flex-col">
            <Navbar darkMode={true} />

            <main className="flex-1">
                {/* Hero Section */}
                <InfluencerHero
                    categories={activeCategories}
                    onSearch={setSearchQuery}
                    onCategoryChange={handleCategoryChange}
                    selectedCategory={selectedCategory}
                />

                {/* Category Grid Section */}
                <CategoryGrid categories={activeCategories} />

                {/* Location Filter - Only show when category is selected */}
                {selectedCategory && (
                    <div className="container mx-auto px-4 lg:px-8 py-12 border-t border-gray-900">
                        <div className="mb-8 text-center">
                            <h3 className="text-2xl font-black text-white mb-2 italic uppercase tracking-tighter">Filter by Location</h3>
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Select a city to find creators in your area</p>
                        </div>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <button
                                onClick={() => navigate(`/influencers/${categorySlug}`)}
                                className={`px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wider transition-all ${!cityParam
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                    : 'bg-gray-900 text-gray-400 border border-gray-800 hover:border-gray-700'
                                    }`}
                            >
                                All Locations
                            </button>
                            {['Chandigarh', 'Mumbai', 'Noida', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad', 'Gurgaon'].map(city => (
                                <button
                                    key={city}
                                    onClick={() => navigate(`/influencers/${categorySlug}/${city.toLowerCase()}`)}
                                    className={`px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wider transition-all ${cityParam === city.toLowerCase()
                                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                        : 'bg-gray-900 text-gray-400 border border-gray-800 hover:border-gray-700'
                                        }`}
                                >
                                    {city}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Influencer Results Section */}
                <div className="container mx-auto px-4 lg:px-8 py-20 border-t border-gray-900">
                    {loading ? (
                        <div className="py-20 text-center">
                            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-400">Loading Creators...</h3>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-12">
                                <h2 className="text-3xl font-bold text-white">
                                    {selectedCategory
                                        ? `${activeCategories.find(c => (c.id === selectedCategory || c._id === selectedCategory))?.label || activeCategories.find(c => (c.id === selectedCategory || c._id === selectedCategory))?.name || 'Selected'} Creators`
                                        : 'All Creators'
                                    }
                                </h2>
                                <span className="text-gray-500 font-medium">Showing {filteredInfluencers.length} results</span>
                            </div>

                            {filteredInfluencers.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {filteredInfluencers.map((inf) => {
                                        const catObj = activeCategories.find(c => (c.id === inf.category || c._id === inf.category));
                                        const categoryLabel = catObj?.label || catObj?.name || 'Creator';
                                        return (
                                            <Link key={inf.id || inf._id} to={`/influencer/${inf.username}`} className="group">
                                                <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-5 bg-gray-900 border border-gray-800 shadow-xl">
                                                    <img
                                                        src={getImageUrl(inf.profileImage)}
                                                        alt={inf.name}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors mb-1">{inf.name}</h3>
                                                <div className="flex flex-wrap gap-2 mb-1">
                                                    {(inf.categories && inf.categories.length > 0) ? (
                                                        inf.categories.map(catId => {
                                                            const cObj = activeCategories.find(c => (c.id === catId || c._id === catId));
                                                            return (
                                                                <span key={catId} className="text-primary font-bold text-[10px] uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-md">
                                                                    {cObj?.label || cObj?.name || catId}
                                                                </span>
                                                            );
                                                        })
                                                    ) : (
                                                        <p className="text-primary font-bold text-sm uppercase tracking-wider">{categoryLabel}</p>
                                                    )}
                                                </div>
                                                <p className="text-gray-400 font-medium">{inf.followers || inf.instagramFollowers || '0'} Followers</p>
                                            </Link>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="py-20 text-center bg-gray-900/50 rounded-[2.5rem] border border-gray-800">
                                    <Sparkles className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-gray-400">No creators matching your criteria</h3>
                                    <button
                                        onClick={() => { setSearchQuery(''); navigate('/influencers'); }}
                                        className="mt-4 text-primary font-bold hover:underline"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default InfluencerList;
