import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Plus, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react';

const CategoryManagement = () => {
    const { categories, addCategory, updateCategory, deleteCategory } = useAdmin();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ label: '', icon: 'Sparkles', image: '', status: 'Active' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = formData.label.toLowerCase().replace(/\s+/g, '-');
        if (editingId) {
            await updateCategory(editingId, formData);
            setEditingId(null);
        } else {
            await addCategory({ id, ...formData });
            setIsAdding(false);
        }
        setFormData({ label: '', icon: 'Sparkles', image: '', status: 'Active' });
    };

    const handleEdit = (cat) => {
        setFormData({ label: cat.label, icon: cat.icon, image: cat.image || '', status: cat.status });
        setEditingId(cat.id);
        setIsAdding(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Brand Management</h1>
                    <p className="text-gray-500">Manage partner brands and their categories.</p>
                </div>
                <button
                    onClick={() => { setIsAdding(true); setEditingId(null); setFormData({ label: '', icon: 'Sparkles', image: '', status: 'Active' }); }}
                    className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90"
                >
                    <Plus className="w-4 h-4" /> Add Brand
                </button>
            </div>

            {isAdding && (
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Brand Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.label}
                                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Icon (Lucide Name)</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Image URL</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="https://images.unsplash.com/..."
                                />
                            </div>
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
                            <th className="px-6 py-4 font-semibold">Label</th>
                            <th className="px-6 py-4 font-semibold">Icon</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {categories.map((cat) => (
                            <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">{cat.label}</td>
                                <td className="px-6 py-4 text-gray-500">{cat.icon}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => updateCategory(cat.id, { status: cat.status === 'Active' ? 'Inactive' : 'Active' })}
                                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${cat.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                            }`}
                                    >
                                        {cat.status === 'Active' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                        {cat.status}
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-3">
                                        <button onClick={() => handleEdit(cat)} className="text-gray-400 hover:text-primary transition-colors">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => deleteCategory(cat.id)} className="text-gray-400 hover:text-red-500 transition-colors">
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

export default CategoryManagement;
