import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const InfluencerLogin = () => {
    const { loginInfluencer } = useAdmin();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const res = await loginInfluencer(credentials);
        if (res.success) {
            navigate('/influencer/dashboard');
        } else {
            setError(res.message);
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <Navbar />
            <main className="flex-1 flex items-center justify-center py-20 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full"
                >
                    <div className="text-center mb-10">
                        <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter">Creator Login<span className="text-primary">.</span></h1>
                        <p className="text-gray-500 font-bold text-lg uppercase tracking-widest">Manage your profile & collaborations</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5 bg-gray-50/50 p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                        {error && (
                            <div className="bg-red-50 text-red-600 px-6 py-4 rounded-2xl text-sm font-bold border border-red-100 flex items-center gap-3 tracking-wide">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email" required
                                    value={credentials.email}
                                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                                    className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password" required
                                    value={credentials.password}
                                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                    className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit" disabled={isLoading}
                            className="w-full bg-primary text-white py-5 rounded-2xl font-black text-xl shadow-lg shadow-primary/25 hover:scale-[1.02] transition-all disabled:opacity-50"
                        >
                            {isLoading ? 'Checking...' : 'Sign In'}
                        </button>

                        <div className="text-center space-y-4 pt-4">
                            <p className="text-gray-500 font-bold text-sm">
                                Don't have a profile yet? <Link to="/register/influencer" className="text-primary tracking-tight">Register as Creator</Link>
                            </p>
                            <hr className="border-gray-100" />
                            <Link to="/admin/login" className="text-xs font-black text-gray-300 uppercase tracking-widest hover:text-primary transition-colors inline-block">Admin Access</Link>
                        </div>
                    </form>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
};

export default InfluencerLogin;
