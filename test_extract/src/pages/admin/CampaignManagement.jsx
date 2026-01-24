import React from 'react';
import { Plus, Search } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { motion } from 'framer-motion';

const CampaignManagement = () => {
    const { campaigns, addCampaign } = useAdmin();

    // Simple mock add for demo purposes
    const handleAddCampaign = () => {
        addCampaign({
            name: `New Campaign ${campaigns.length + 1}`,
            brand: 'Brand Inc.',
            budget: `$${Math.floor(Math.random() * 50) + 1}k`,
            dueDate: '2026-05-01'
        });
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Campaigns</h2>
                    <p className="text-gray-500 mt-1">Track and manage all marketing campaigns.</p>
                </div>
                <button
                    onClick={handleAddCampaign}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-blue-600/20"
                >
                    <Plus className="w-5 h-5" /> New Campaign
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {campaigns.map((campaign, i) => (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        key={campaign.id}
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-all"
                    >
                        <div className="h-40 bg-gray-100 relative overflow-hidden">
                            {/* Pattern overlay for better looing placeholder */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                            <img
                                src={`https://source.unsplash.com/random/800x600?marketing,work&sig=${campaign.id}`}
                                alt="Campaign"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.parentNode.classList.add('flex', 'items-center', 'justify-center', 'bg-gray-200');
                                    e.target.parentNode.innerHTML = `<span class="text-gray-400 font-bold text-3xl opacity-20">IMG</span>`;
                                }}
                            />
                            <div className={`absolute top-4 right-4 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm ${campaign.status === 'Active' ? 'bg-green-100/90 text-green-700' :
                                    campaign.status === 'Completed' ? 'bg-blue-100/90 text-blue-700' : 'bg-orange-100/90 text-orange-700'
                                }`}>
                                {campaign.status}
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="font-bold text-lg text-gray-900 mb-2">{campaign.name}</h3>
                            <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                                Campaign by {campaign.brand}. Driving engagement through strategic influencer partnerships.
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map((u) => (
                                        <div key={u} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
                                    ))}
                                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500">
                                        +{campaign.contributors || 2}
                                    </div>
                                </div>
                                <div className="text-sm font-semibold text-gray-900">{campaign.budget}</div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CampaignManagement;
