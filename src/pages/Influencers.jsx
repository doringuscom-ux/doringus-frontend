import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Users } from 'lucide-react';
import api, { getImageUrl } from '../utils/axiosConfig';

const Influencers = () => {
    const [influencers, setInfluencers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [influencersRes, categoriesRes] = await Promise.all([
                api.get('/influencers'),
                api.get('/categories')
            ]);

            const approvedInfluencers = influencersRes.data.filter(inf => inf.status === 'Approved');
            setInfluencers(approvedInfluencers);
            setCategories(categoriesRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredInfluencers = influencers.filter(inf => {
        const matchesSearch = inf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inf.username.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || inf.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        Discover <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Creators</span>
                    </h1>
                    <p className="text-xl text-gray-600">Find the perfect influencer for your brand</p>
                </div>

                {/* Search and Filter */}
                <div className="mb-8 space-y-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by name or username..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-purple-600 focus:outline-none text-lg"
                        />
                    </div>

                    <div className="flex items-center space-x-4 overflow-x-auto pb-2">
                        <Filter className="w-5 h-5 text-gray-600 flex-shrink-0" />
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all ${selectedCategory === 'all'
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            All Categories
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.name)}
                                className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all ${selectedCategory === cat.name
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        Showing <span className="font-semibold text-purple-600">{filteredInfluencers.length}</span> creator{filteredInfluencers.length !== 1 ? 's' : ''}
                    </p>
                </div>

                {/* Influencers Grid */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
                        <p className="mt-4 text-gray-600">Loading creators...</p>
                    </div>
                ) : filteredInfluencers.length === 0 ? (
                    <div className="text-center py-20">
                        <Users className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                        <p className="text-xl text-gray-600">No creators found matching your criteria</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredInfluencers.map((influencer) => (
                            <Link
                                key={influencer.id}
                                to={`/influencer/${influencer.username}`}
                                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
                            >
                                <div className="relative h-64 bg-gradient-to-br from-purple-200 to-pink-200">
                                    {influencer.thumbnail ? (
                                        <img
                                            src={getImageUrl(influencer.thumbnail)}
                                            alt={influencer.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Users className="w-20 h-20 text-purple-400" />
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                                        {influencer.name}
                                    </h3>
                                    <p className="text-gray-600 mb-4">@{influencer.username}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                                            {influencer.category || 'Creator'}
                                        </span>
                                        {influencer.followers && (
                                            <span className="text-sm text-gray-500">{influencer.followers} followers</span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Influencers;
