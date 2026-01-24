import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/axiosConfig';

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
    const fetchData = async () => {
        setLoading(true);

        try {
            console.log("[Context] Testing Backend Health...");
            try {
                const health = await api.get('/health');
                console.log("[Context] Health Response:", health.data);

                if (health.data.engine === 'Doringus-Core-v2' || health.data.version === '2.0.1') {
                    setServerStatus('Online');
                } else if (health.data.status === 'ok') {
                    setServerStatus('Online');
                    console.log("[Context] Server version check passed with status OK.");
                } else {
                    setServerStatus('Unknown');
                }
            } catch (e) {
                setServerStatus('Offline');
                console.error("Backend unreachable at /health. Error:", e.message);
            }

            const requests = [
                api.get('/categories').catch(e => ({ data: [] })),
                api.get('/influencers').catch(e => ({ data: [] })),
                api.get('/inquiries').catch(e => ({ data: [] }))
            ];

            if (user?.token && (user.role === 'admin' || user.role === 'superadmin')) {
                requests.push(api.get('/users').catch(() => ({ data: [] })));
                requests.push(api.get('/campaigns').catch(() => ({ data: [] })));
            }

            const results = await Promise.allSettled(requests);

            if (results[0].status === 'fulfilled' && Array.isArray(results[0].value.data)) setCategories(results[0].value.data);
            if (results[1].status === 'fulfilled' && Array.isArray(results[1].value.data)) setInfluencers(results[1].value.data);
            if (results[2].status === 'fulfilled' && Array.isArray(results[2].value.data)) setInquiries(results[2].value.data);

            if (user?.token && (user.role === 'admin' || user.role === 'superadmin')) {
                if (results[3] && results[3].status === 'fulfilled' && Array.isArray(results[3].value.data)) setUsers(results[3].value.data);
                if (results[4] && results[4].status === 'fulfilled' && Array.isArray(results[4].value.data)) setCampaigns(results[4].value.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // Refresh every 30 seconds to keep system health updated
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, [user?.token, user?.role]);

    // Auth Actions
    const login = async (username, password) => {
        try {
            const res = await api.post('/auth/login', { username, password });
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
            const res = await api.post('/auth/register', userData);
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
            const res = await api.post('/categories', catData);
            setCategories(prev => [...prev, res.data]);
            return { success: true };
        } catch (e) {
            return { success: false, message: e.response?.data?.message || 'Failed' };
        }
    };

    const updateCategory = async (id, catData) => {
        try {
            await api.put(`/categories/${id}`, catData);
            setCategories(prev => prev.map(cat => String(cat.id) === String(id) ? { ...cat, ...catData } : cat));
            return { success: true };
        } catch (e) {
            return { success: false, message: e.response?.data?.message || 'Failed' };
        }
    };

    const deleteCategory = async (id) => {
        try {
            await api.delete(`/categories/${id}`);
            setCategories(prev => prev.filter(cat => String(cat.id) !== String(id)));
            return { success: true };
        } catch (e) {
            return { success: false, message: e.response?.data?.message || 'Failed' };
        }
    };

    // Influencer Actions
    const addInfluencer = async (infData) => {
        try {
            const res = await api.post('/influencers', infData);
            setInfluencers(prev => [...prev, res.data]);
            return { success: true };
        } catch (e) {
            return { success: false, message: e.response?.data?.message || 'Failed' };
        }
    };

    const updateInfluencer = async (id, infData) => {
        try {
            const res = await api.put(`/influencers/update/${id}`, infData);
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
            const res = await api.delete(`/influencers/${id}`);
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
            const res = await api.put(`/influencers/status/${id}`, { status });
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
            const res = await api.put(`/influencers/update/${id}`, data);
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
            const res = await api.post('/influencers/register', infData);
            return res.data;
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Registration failed' };
        }
    };

    const loginInfluencer = async (credentials) => {
        try {
            console.log("[Context] Influencer Login:", credentials.email);
            const res = await api.post('/influencers/login', credentials);
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
            const res = await api.post('/users', userData);
            setUsers(prev => [...prev, res.data]);
        } catch (e) { }
    };

    const deleteUser = async (id) => {
        try {
            await api.delete(`/users/${id}`);
            setUsers(prev => prev.filter(u => String(u.id) !== String(id)));
        } catch (e) { }
    };

    const addCampaign = async (campData) => {
        try {
            const res = await api.post('/campaigns', campData);
            setCampaigns(prev => [...prev, res.data]);
        } catch (e) { }
    };

    const addInquiry = async (inquiryData) => {
        try {
            const res = await api.post('/inquiries', inquiryData);
            setInquiries(prev => [res.data, ...prev]);
            return { success: true };
        } catch (error) {
            return { success: false, message: 'Failed to send inquiry' };
        }
    };

    const deleteInquiry = async (id) => {
        try {
            await api.delete(`/inquiries/${id}`);
            setInquiries(prev => prev.filter(inq => String(inq.id) !== String(id)));
        } catch (e) { }
    };

    const updateInquiryStatus = async (id, status) => {
        try {
            await api.put(`/inquiries/${id}/status`, { status });
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
