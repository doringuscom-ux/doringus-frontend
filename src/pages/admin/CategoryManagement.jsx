import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import {
    Plus, Edit2, Trash2, CheckCircle, XCircle,
    Sparkles, Image as ImageIcon, LayoutGrid,
    Search, Filter, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CategoryManagement = () => {
    const { categories = [], addCategory, updateCategory, deleteCategory } = useAdmin() || {};
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({ label: '', icon: 'Sparkles', image: '', status: 'Active' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = formData.label.toLowerCase().replace(/\s+/g, '-');
        try {
            if (editingId) {
                await updateCategory(editingId, formData);
                setEditingId(null);
            } else {
                await addCategory({ id, ...formData });
            }
            setIsAdding(false);
            setFormData({ label: '', icon: 'Sparkles', image: '', status: 'Active' });
        } catch (error) {
            alert("Action failed: " + error.message);
        }
    };

    const handleEdit = (cat) => {
        setFormData({ label: cat.label, icon: cat.icon, image: cat.image || '', status: cat.status });
        setEditingId(cat.id);
        setIsAdding(true);
    };

    const filteredCategories = (categories || []).filter(cat =>
        (cat?.label?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <LayoutGrid className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Inventory Control</span>
                    </div>
                    <h1 className="text-5xl font-black text-gray-900 tracking-tighter italic">
                        Brand<span className="text-primary italic">.</span> Partnerships
                    </h1>
                    <p className="text-gray-400 mt-2 font-bold uppercase tracking-widest text-xs">Manage the categories and brand domains available for selection.</p>
                </div>
                <button
                    onClick={() => { setIsAdding(true); setEditingId(null); setFormData({ label: '', icon: 'Sparkles', image: '', status: 'Active' }); }}
                    className="bg-black text-white px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-primary transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
                >
                    <Plus className="w-5 h-5" /> Expand Portfolio
                </button>
            </div>

            {/* Form Section */}
            <AnimatePresence>
                {isAdding && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/30">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Brand Label</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Lifestyle & Fitness"
                                            value={formData.label}
                                            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                                            className="w-full px-6 py-4 bg-gray-50 rounded-2xl font-bold border-none outline-none focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Glyph Code (Lucide)</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Sparkles / Target / Zap"
                                            value={formData.icon}
                                            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                            className="w-full px-6 py-4 bg-gray-50 rounded-2xl font-bold border-none outline-none focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Asset URL (Cover Image)</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="https://images..."
                                            value={formData.image}
                                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                            className="w-full px-6 py-4 bg-gray-50 rounded-2xl font-bold border-none outline-none focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-4 justify-end pt-4 border-t border-gray-50">
                                    <button type="button" onClick={() => setIsAdding(false)} className="px-8 py-4 bg-gray-50 rounded-xl font-black text-xs uppercase tracking-widest transition-all hover:bg-gray-100">Abort</button>
                                    <button type="submit" className="bg-primary text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                                        {editingId ? 'Push Updates' : 'Sync New Asset'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCategories.map((cat, idx) => (
                    <motion.div
                        key={cat.id || idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full group-hover:scale-110 transition-transform duration-700" />

                        <div className="flex items-start justify-between relative z-10 mb-8">
                            <div className="p-4 bg-gray-50 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                <Sparkles className="w-8 h-8" />
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(cat)} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button onClick={() => deleteCategory(cat.id)} className="p-3 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-2xl font-black text-gray-900 tracking-tight italic">{cat.label}</h3>
                            <div className="flex items-center gap-3 mt-4">
                                <button
                                    onClick={() => updateCategory(cat.id, { status: cat.status === 'Active' ? 'Inactive' : 'Active' })}
                                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all flex items-center gap-2 ${cat.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                                        }`}
                                >
                                    <div className={`w-1.5 h-1.5 rounded-full ${cat.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                    {cat.status}
                                </button>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{cat.icon} GLYPH</span>
                            </div>
                        </div>

                        {cat.image && (
                            <div className="mt-8 rounded-2xl overflow-hidden h-32">
                                <img src={cat.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" />
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CategoryManagement;
