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
            <main className="flex-1 flex items-center justify-center py-20 px-4 mt-16 md:mt-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md w-full relative z-10"
                >
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10" />

                    <div className="text-center mb-10">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-black uppercase tracking-widest mb-4">
                            Welcome Back
                        </span>
                        <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter">Creator Login<span className="text-primary">.</span></h1>
                        <p className="text-gray-500 font-bold text-lg uppercase tracking-widest">Manage your profile & collaborations</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 bg-white/70 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/20 shadow-xl shadow-gray-200/50">
                        {error && (
                            <div className="bg-red-50 text-red-600 px-6 py-4 rounded-2xl text-sm font-bold border border-red-100 flex items-center gap-3 tracking-wide animate-pulse">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                                </div>
                                <input
                                    type="email" required
                                    value={credentials.email}
                                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                                    className="w-full pl-12 pr-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all font-bold placeholder:text-gray-300"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                                </div>
                                <input
                                    type="password" required
                                    value={credentials.password}
                                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                    className="w-full pl-12 pr-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all font-bold placeholder:text-gray-300"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit" disabled={isLoading}
                            className="w-full bg-gradient-to-r from-primary to-pink-600 text-white py-5 rounded-2xl font-black text-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                    Checking...
                                </span>
                            ) : 'Sign In'}
                        </button>

                        <div className="text-center space-y-6 pt-4">
                            <p className="text-gray-500 font-bold text-sm">
                                Don't have a profile yet? <Link to="/register/influencer" className="text-primary hover:text-pink-600 transition-colors tracking-tight underline decoration-2 decoration-transparent hover:decoration-current underline-offset-4">Register as Creator</Link>
                            </p>
                        </div>
                    </form>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
};

export default InfluencerLogin;
