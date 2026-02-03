import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { getImageUrl } from '../utils/axiosConfig';

const AdminContext = createContext();

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
};

export const AdminProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [influencers, setInfluencers] = useState([]);
    const [users, setUsers] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const [user, setUser] = useState(() => {
        const savedToken = localStorage.getItem('sa_token');
        const savedUser = localStorage.getItem('sa_user');
        if (savedToken && savedUser && savedUser !== 'undefined' && savedUser !== 'null') {
            api.defaults.headers.common['Authorization'] = savedToken;
            try {
                return JSON.parse(savedUser);
            } catch (e) {
                return null;
            }
        }
        return null;
    });
    const [loading, setLoading] = useState(true);
    const [inquiries, setInquiries] = useState([]);
    const [serverStatus, setServerStatus] = useState('Checking...');

    const logout = () => {
        localStorage.removeItem('sa_token');
        localStorage.removeItem('sa_user');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
    };

    // Global Axios Interceptor for Unauthorized errors
    useEffect(() => {
        const interceptor = api.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    logout();
                }
                return Promise.reject(error);
            }
        );
        return () => api.interceptors.response.eject(interceptor);
    }, []);

    // Fetch initial data
    const fetchData = async (isBackground = false) => {
        console.log(`[Context] Fetching data (Background: ${isBackground}) using BaseURL: ${api.defaults.baseURL}`);
        if (!isBackground) setLoading(true);

        try {
            console.log("[Context] Testing Backend Health...");
            const requests = [
                api.get('/api/health').catch(e => ({ data: { status: 'offline' } })),
                api.get('/api/categories').catch(e => {
                    console.error("[Context] Categories API Error:", e.message);
                    return { data: [] };
                }),
                api.get('/api/influencers').catch(e => {
                    console.error("[Context] Influencers API Error:", e.message);
                    return { data: [] };
                }),
                api.get('/api/inquiries').catch(e => ({ data: [] }))
            ];

            if (user?.token && (user.role === 'admin' || user.role === 'superadmin')) {
                requests.push(api.get('/api/users').catch((e) => {
                    console.error("[Context] Users API Error:", e);
                    return { data: [] };
                }));
                requests.push(api.get('/api/campaigns').catch((e) => {
                    console.error("[Context] Campaigns API Error:", e);
                    return { data: [] };
                }));
            }

            const results = await Promise.allSettled(requests);

            // 1. Health
            const healthData = results[0].status === 'fulfilled' ? results[0].value.data : { status: 'offline' };
            if (healthData.status === 'ok') setServerStatus('Online');
            else setServerStatus('Offline');

            // 2. Categories
            if (results[1].status === 'fulfilled' && Array.isArray(results[1].value.data)) {
                setCategories(results[1].value.data);
            } else {
                setCategories([]);
            }

            // 3. Influencers
            if (results[2].status === 'fulfilled' && Array.isArray(results[2].value.data)) {
                setInfluencers(results[2].value.data);
            } else {
                setInfluencers([]);
            }

            // 4. Inquiries
            if (results[3].status === 'fulfilled' && Array.isArray(results[3].value.data)) {
                setInquiries(results[3].value.data);
            }

            if (user?.token && (user.role === 'admin' || user.role === 'superadmin')) {
                // Adjusting indices based on the number of initial requests (4)
                // If users and campaigns were added, they would be at index 4 and 5 respectively.
                // However, the original code had a bug here, using results[3] for users which is inquiries.
                // Assuming the intent was to get users from the 5th request (index 4) and campaigns from the 6th (index 5)
                const usersResultIndex = 4;
                const campaignsResultIndex = 5;

                if (results[usersResultIndex] && results[usersResultIndex].status === 'fulfilled' && Array.isArray(results[usersResultIndex].value.data)) {
                    setUsers(results[usersResultIndex].value.data);
                }
                if (results[campaignsResultIndex] && results[campaignsResultIndex].status === 'fulfilled' && Array.isArray(results[campaignsResultIndex].value.data)) {
                    setCampaigns(results[campaignsResultIndex].value.data);
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            if (error.response) {
                console.error('Response Status:', error.response.status);
                console.error('Response Data:', error.response.data);
            } else if (error.request) {
                console.error('No response received. Possible CORS or Network Error.');
            } else {
                console.error('Error Message:', error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // Reduced refresh frequency to save server resources (60 seconds)
        const interval = setInterval(() => fetchData(true), 60000);
        return () => clearInterval(interval);
    }, [user?.token, user?.role]);

    // Auth Actions
    const login = async (username, password) => {
        try {
            const res = await api.post('/api/admin/login', { username, password });
            if (res.data.success) {
                const { token, user: userData } = res.data;
                const fullUser = { ...userData, token };
                localStorage.setItem('sa_token', token);
                localStorage.setItem('sa_user', JSON.stringify(fullUser));
                api.defaults.headers.common['Authorization'] = token;
                setUser(fullUser);
                return { success: true };
            }
            return { success: false, message: res.data.message || 'Login failed' };
        } catch (error) {
            console.error("Login Error:", error);
            const message = error.response?.data?.message || 'Cannot connect to server.';
            return { success: false, message };
        }
    };

    const register = async (userData) => {
        try {
            const res = await api.post('/api/auth/register', userData);
            if (res.data.success) {
                const { token, user: userDataRes } = res.data;
                const fullUser = { ...userDataRes, token };
                localStorage.setItem('sa_token', token);
                localStorage.setItem('sa_user', JSON.stringify(fullUser));
                api.defaults.headers.common['Authorization'] = token;
                setUser(fullUser);
                return { success: true };
            }
            return { success: false, message: res.data.message || 'Registration failed' };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Registration failed' };
        }
    };

    // Category Actions
    const addCategory = async (catData) => {
        try {
            const res = await api.post('/api/categories', catData);
            setCategories(prev => [...prev, res.data]);
            return { success: true };
        } catch (e) {
            return { success: false, message: e.response?.data?.message || 'Failed' };
        }
    };

    const updateCategory = async (id, catData) => {
        try {
            await api.put(`/api/categories/${id}`, catData);
            setCategories(prev => prev.map(cat => String(cat.id) === String(id) ? { ...cat, ...catData } : cat));
            return { success: true };
        } catch (e) {
            return { success: false, message: e.response?.data?.message || 'Failed' };
        }
    };

    const deleteCategory = async (id) => {
        try {
            await api.delete(`/api/categories/${id}`);
            setCategories(prev => prev.filter(cat => String(cat.id) !== String(id)));
            return { success: true };
        } catch (e) {
            return { success: false, message: e.response?.data?.message || 'Failed' };
        }
    };

    // Influencer Actions
    const addInfluencer = async (infData) => {
        try {
            const res = await api.post('/api/influencers', infData);
            setInfluencers(prev => [...prev, res.data]);
            return { success: true };
        } catch (e) {
            return { success: false, message: e.response?.data?.message || 'Failed' };
        }
    };

    const updateInfluencer = async (id, infData) => {
        try {
            const res = await api.put(`/api/influencers/update/${id}`, infData);
            if (res.data.success) {
                setInfluencers(prev => prev.map(inf => String(inf.id) === String(id) ? { ...inf, ...infData } : inf));
                return { success: true };
            }
            return { success: false, message: res.data.message || 'Update failed' };
        } catch (e) {
            return { success: false, message: e.response?.data?.message || 'Failed' };
        }
    };

    const deleteInfluencer = async (id) => {
        try {
            const res = await api.delete(`/api/influencers/${id}`);
            if (res.data.success) {
                setInfluencers(prev => prev.filter(inf => String(inf.id) !== String(id)));
                return { success: true };
            }
            return { success: false, message: res.data.message || 'Delete failed' };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || error.message };
        }
    };

    const updateInfluencerStatus = async (id, status) => {
        try {
            const res = await api.put(`/api/influencers/status/${id}`, { status });
            if (res.data.success) {
                setInfluencers(prev => prev.map(inf => String(inf.id) === String(id) ? { ...inf, status } : inf));
                return { success: true };
            }
            return { success: false, message: res.data.message || 'Status update failed' };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Failed to update status' };
        }
    };

    const updateInfluencerProfile = async (id, data) => {
        try {
            const res = await api.put(`/api/influencers/update/${id}`, data);
            if (res.data.success) {
                setInfluencers(prev => prev.map(inf => String(inf.id) === String(id) ? { ...inf, ...data } : inf));
                if (user && String(user.id) === String(id)) {
                    const updatedUser = { ...user, ...data };
                    localStorage.setItem('sa_user', JSON.stringify(updatedUser));
                    setUser(updatedUser);
                }
                return { success: true };
            }
            return { success: false, message: res.data.message || 'Update failed' };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Update failed' };
        }
    };

    const registerInfluencer = async (infData) => {
        try {
            const res = await api.post('/api/influencers/register', infData);
            return res.data;
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Registration failed' };
        }
    };

    const loginInfluencer = async (credentials) => {
        try {
            console.log("[Context] Influencer Login:", credentials.email);
            const res = await api.post('/api/influencers/login', credentials);
            if (res.data.success) {
                const { token, user: userData } = res.data;
                const fullUser = { ...userData, token, role: 'influencer' };
                localStorage.setItem('sa_token', token);
                localStorage.setItem('sa_user', JSON.stringify(fullUser));
                api.defaults.headers.common['Authorization'] = token;
                setUser(fullUser);
                return { success: true };
            }
            return { success: false, message: res.data.message || 'Login failed' };
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Login failed';
            return { success: false, message };
        }
    };

    const addUser = async (userData) => {
        try {
            const res = await api.post('/api/users', userData);
            setUsers(prev => [...prev, res.data]);
        } catch (e) { }
    };

    const deleteUser = async (id) => {
        try {
            await api.delete(`/api/users/${id}`);
            setUsers(prev => prev.filter(u => String(u.id) !== String(id)));
        } catch (e) { }
    };

    const addCampaign = async (campData) => {
        try {
            const res = await api.post('/api/campaigns', campData);
            setCampaigns(prev => [...prev, res.data]);
        } catch (e) { }
    };

    const addInquiry = async (inquiryData) => {
        try {
            const res = await api.post('/api/inquiries', inquiryData);
            setInquiries(prev => [res.data, ...prev]);
            return { success: true };
        } catch (error) {
            return { success: false, message: 'Failed to send inquiry' };
        }
    };

    const deleteInquiry = async (id) => {
        try {
            await api.delete(`/api/inquiries/${id}`);
            setInquiries(prev => prev.filter(inq => String(inq.id) !== String(id)));
        } catch (e) { }
    };

    const updateInquiryStatus = async (id, status) => {
        try {
            await api.put(`/api/inquiries/${id}/status`, { status });
            setInquiries(prev => prev.map(inq => String(inq.id) === String(id) ? { ...inq, status } : inq));
            return { success: true };
        } catch (error) {
            return { success: false, message: 'Failed to update status' };
        }
    };

    const refreshData = () => fetchData();

    const stats = {
        activeInfluencers: (influencers || []).length,
        activeCategories: (categories || []).filter(c => c?.status === 'Active').length,
        featuredCreators: (influencers || []).filter(i => i?.isFeatured).length,
        revenue: '$128,430',
        activeCampaigns: (campaigns || []).length,
        newSignups: (users || []).length,
        totalInquiries: (inquiries || []).length
    };

    const value = {
        categories,
        influencers,
        users,
        campaigns,
        inquiries,
        user,
        loading,
        serverStatus,
        login,
        register,
        logout,
        addCategory,
        updateCategory,
        deleteCategory,
        addInfluencer,
        updateInfluencer,
        deleteInfluencer,
        addUser,
        deleteUser,
        addCampaign,
        addInquiry,
        deleteInquiry,
        updateInquiryStatus,
        registerInfluencer,
        loginInfluencer,
        updateInfluencerStatus,
        updateInfluencerProfile,
        refreshData,
        stats
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};
