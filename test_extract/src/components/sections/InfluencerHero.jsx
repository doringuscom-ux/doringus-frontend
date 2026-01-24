import { Search, ChevronDown } from 'lucide-react';

const InfluencerHero = ({ categories, onSearch, onCategoryChange, selectedCategory }) => {
    return (
        <section className="relative h-[60vh] min-h-[450px] flex items-center justify-center overflow-hidden bg-black">
            {/* Blurry Background */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10" />
                <img
                    src="https://images.unsplash.com/photo-1514525253361-bee243870d22?q=80&w=1920&auto=format&fit=crop"
                    alt="Hero Background"
                    className="w-full h-full object-cover blur-md scale-110"
                />
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-20 text-center">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-10 max-w-4xl mx-auto leading-tight">
                    Book world-class verified artists and celebrities for your corporate events
                </h1>

                <div className="flex flex-col md:flex-row items-center justify-center gap-0 max-w-3xl mx-auto">
                    {/* Category Dropdown */}
                    <div className="relative w-full md:w-auto">
                        <select
                            value={selectedCategory}
                            onChange={(e) => onCategoryChange(e.target.value)}
                            className="appearance-none bg-white lg:rounded-l-2xl rounded-t-2xl md:rounded-tr-none px-6 py-4 pr-12 font-bold text-gray-800 outline-none w-full md:w-52 border-r border-gray-100 cursor-pointer"
                        >
                            <option value="">All Artists</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.label}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>

                    {/* Search Input */}
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Select artist category"
                            onChange={(e) => onSearch(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 bg-white lg:rounded-r-2xl rounded-b-2xl md:rounded-bl-none font-medium text-gray-800 outline-none"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InfluencerHero;
