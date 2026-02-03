import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { User, Mail, Lock, CheckCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'user' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await api.post('/api/auth/register', formData);
            if (res.data.success) {
                localStorage.setItem('token', res.data.token);
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <main className="flex-1 flex items-center justify-center py-20 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full"
                >
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-black text-text-main mb-3 italic">Join DO RING US<span className="text-primary">.</span></h1>
                        <p className="text-gray-500 font-bold text-xs uppercase tracking-[0.2em]">Monetize your influence</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5 bg-gray-50/50 p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                        {error && (
                            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-2xl text-sm font-bold border border-red-100 flex items-center gap-2 tracking-wide">
                                <span className="w-1.5 h-1.5 bg-red-600 rounded-full" /> {error}
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">Username</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text" required
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                                    placeholder="yourname"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email" required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password" required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 py-2">
                            <Link to="/register/influencer" className="flex items-center gap-4 p-4 bg-primary/5 border border-primary/10 rounded-2xl group hover:border-primary transition-all">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    <Star className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="font-black text-gray-900 leading-tight">I am a Creator</div>
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Apply for Premium Profile</div>
                                </div>
                            </Link>
                        </div>

                        <button
                            type="submit" disabled={isLoading}
                            className="w-full bg-primary text-white py-5 rounded-[1.5rem] font-bold text-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50"
                        >
                            {isLoading ? 'Creating Account...' : 'Continue'}
                        </button>

                        <p className="text-center text-gray-500 font-bold text-sm">
                            Already have an account? <Link to="/login" className="text-primary tracking-tight">Login</Link>
                        </p>
                    </form>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
};

export default Register;
