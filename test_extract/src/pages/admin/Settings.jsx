import React from 'react';
import { Save } from 'lucide-react';

const Settings = () => {
    return (
        <div className="max-w-4xl space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
                <p className="text-gray-500 mt-1">Manage platform configurations.</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-8">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">General Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Platform Name</label>
                            <input type="text" defaultValue="Social Adda" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Support Email</label>
                            <input type="email" defaultValue="support@socialadda.com" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Notifications</h3>
                    <div className="space-y-4">
                        {['Email notifications for new signups', 'Push notifications for campaign approvals', 'Weekly analytics report'].map((item, i) => (
                            <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300" />
                                <span className="text-gray-600 group-hover:text-gray-900 transition-colors">{item}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-100 flex justify-end">
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-blue-600/20">
                        <Save className="w-5 h-5" /> Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
