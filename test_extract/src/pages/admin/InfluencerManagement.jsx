import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Plus, Edit2, Trash2, Star, Link as LinkIcon, ExternalLink } from 'lucide-react';

const InfluencerManagement = () => {
    const { influencers, categories, addInfluencer, updateInfluencer, deleteInfluencer } = useAdmin();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        category: '',
        profileImage: '',
        bio: '',
        followers: '',
        isFeatured: false,
        socialLinks: { instagram: '', youtube: '', twitter: '' },
        status: 'Approved',
        youtubeVideos: [],
        instagramReels: [],
        pricePerReel: '',
        collaborationPrice: '',
        instagramFollowers: '',
        youtubeSubscribers: '',
        instagramLink: '',
        youtubeLink: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await updateInfluencer(editingId, formData);
            setEditingId(null);
        } else {
            await addInfluencer({ ...formData });
            setIsAdding(false);
        }
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            name: '',
            username: '',
            category: '',
            profileImage: '',
            bio: '',
            followers: '',
            isFeatured: false,
            socialLinks: { instagram: '', youtube: '', twitter: '' },
            status: 'Approved',
            youtubeVideos: [],
            instagramReels: [],
            pricePerReel: '',
            collaborationPrice: '',
            instagramFollowers: '',
            youtubeSubscribers: '',
            instagramLink: '',
            youtubeLink: ''
        });
    };

    const handleEdit = (inf) => {
        setFormData({ ...inf });
        setEditingId(inf.id);
        setIsAdding(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Influencer Management</h1>
                    <p className="text-gray-500">Manage creator profiles and featured status.</p>
                </div>
                <button
                    onClick={() => { setIsAdding(true); setEditingId(null); resetForm(); }}
                    className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90"
                >
                    <Plus className="w-4 h-4" /> Add Influencer
                </button>
            </div>

            {isAdding && (
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text" required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Username (for URL)</label>
                                <input
                                    type="text" required
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Category</label>
                                <select
                                    required
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-md"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Followers Count</label>
                                <input
                                    type="text" required
                                    value={formData.followers}
                                    onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Price Per Reel</label>
                                <input type="text" value={formData.pricePerReel || ''} onChange={(e) => setFormData({ ...formData, pricePerReel: e.target.value })} className="w-full px-3 py-2 border rounded-md" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Collaboration Price</label>
                                <input type="text" value={formData.collaborationPrice || ''} onChange={(e) => setFormData({ ...formData, collaborationPrice: e.target.value })} className="w-full px-3 py-2 border rounded-md" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Instagram Followers (Metric)</label>
                                <input type="text" value={formData.instagramFollowers || ''} onChange={(e) => setFormData({ ...formData, instagramFollowers: e.target.value })} className="w-full px-3 py-2 border rounded-md" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">YouTube Subscribers (Metric)</label>
                                <input type="text" value={formData.youtubeSubscribers || ''} onChange={(e) => setFormData({ ...formData, youtubeSubscribers: e.target.value })} className="w-full px-3 py-2 border rounded-md" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">YouTube Video Links (One per line)</label>
                                <textarea
                                    rows="2"
                                    value={formData.youtubeVideos?.join('\n') || ''}
                                    onChange={(e) => setFormData({ ...formData, youtubeVideos: e.target.value.split('\n').filter(s => s.trim()) })}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="https://www.youtube.com/watch?v=..."
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Instagram Reel Links (One per line)</label>
                                <textarea
                                    rows="2"
                                    value={formData.instagramReels?.join('\n') || ''}
                                    onChange={(e) => setFormData({ ...formData, instagramReels: e.target.value.split('\n').filter(s => s.trim()) })}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="https://www.instagram.com/reels/..."
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Profile Image URL</label>
                            <input
                                type="text" required
                                value={formData.profileImage}
                                onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Gallery URLs (Comma separated)</label>
                            <textarea
                                rows="2"
                                value={formData.gallery?.join(', ') || ''}
                                onChange={(e) => setFormData({ ...formData, gallery: e.target.value.split(',').map(s => s.trim()) })}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Bio</label>
                            <textarea
                                rows="3"
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={formData.isFeatured}
                                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                Featured on Home Page
                            </label>
                        </div>

                        <div className="flex gap-2 justify-end">
                            <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 border rounded-md">Cancel</button>
                            <button type="submit" className="bg-primary text-white px-6 py-2 rounded-md">
                                {editingId ? 'Update' : 'Save'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-sm">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Influencer</th>
                            <th className="px-6 py-4 font-semibold">Category</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold">Featured</th>
                            <th className="px-6 py-4 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {influencers.map((inf) => (
                            <tr key={inf.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img src={inf.profileImage} alt="" className="w-10 h-10 rounded-full object-cover" />
                                        <div>
                                            <div className="font-medium text-gray-900">{inf.name}</div>
                                            <div className="text-xs text-gray-400">@{inf.username}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-500 capitalize">{inf.category}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${inf.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {inf.status || 'Approved'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {inf.isFeatured ? (
                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    ) : (
                                        <Star className="w-4 h-4 text-gray-200" />
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-3">
                                        {inf.status === 'Pending' && (
                                            <button onClick={() => updateInfluencer(inf.id, { ...inf, status: 'Approved' })} className="text-green-500 hover:text-green-700 font-bold text-xs uppercase">Approve</button>
                                        )}
                                        <button onClick={() => handleEdit(inf)} className="text-gray-400 hover:text-primary transition-colors">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => deleteInfluencer(inf.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InfluencerManagement;
