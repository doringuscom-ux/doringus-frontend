import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Phone, Instagram, Youtube, DollarSign, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const InfluencerRegister = () => {
    const { registerInfluencer, categories } = useAdmin();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        instagramLink: '',
        youtubeLink: '',
        instagramFollowers: '',
        youtubeSubscribers: '',
        pricePerReel: '',
        youtubePromotionPrice: '',
        collaborationPrice: '',
        category: 'fashion' // Fixed default to match existing categories
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await registerInfluencer(formData);
            if (res.success) {
                setSuccess(true);
            } else {
                setError(res.message || 'Registration failed. Please check if you have filled all fields correctly.');
                // Scroll to error
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError('Could not connect to the server. Please ensure the backend is running.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-white flex flex-col">
                <Navbar />
                <main className="flex-1 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-md w-full text-center bg-gray-50 p-12 rounded-[3rem] border border-gray-100 mt-32"
                    >
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10" />
                        </div>
                        <h1 className="text-3xl font-black text-gray-900 mb-4">Registration Successful!</h1>
                        <p className="text-gray-500 font-medium text-lg leading-relaxed mb-8">
                            Your account is currently <span className="text-primary font-bold">under admin review</span>. We will notify you once it's approved.
                        </p>
                        <Link to="/" className="inline-block bg-primary text-white px-10 py-4 rounded-full font-black shadow-xl hover:scale-105 transition-all">
                            Back to Home
                        </Link>
                    </motion.div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <Navbar />

            <main className="flex-1 flex items-center justify-center py-24 px-4 relative mt-20">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
                </div>

                <div className="max-w-2xl w-full">
                    <div className="text-center mb-12 relative">
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-6 border border-primary/20">
                                Join The Community
                            </span>
                            <h1 className="text-6xl font-black text-gray-900 mb-6 tracking-tighter">Become a Creator<span className="text-primary">.</span></h1>
                            <p className="text-gray-500 font-bold text-lg uppercase tracking-widest max-w-lg mx-auto">Join Doringus & Monetize your influence with thousands of brands worldwide.</p>
                        </motion.div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-2xl p-1 lg:p-2 rounded-[3.5rem] border border-white/50 shadow-2xl shadow-gray-200/50">
                        <div className="bg-white p-8 lg:p-12 rounded-[3rem] border border-gray-100">
                            <div className="flex gap-4 mb-10 overflow-x-auto pb-2 no-scrollbar justify-center">
                                {[1, 2, 3].map(num => (
                                    <div key={num} className={`flex items-center gap-3 px-6 py-3 rounded-full border-2 transition-all ${step === num ? 'bg-primary border-primary text-white shadow-xl shadow-primary/30 scale-105' : 'bg-transparent border-gray-100 text-gray-400'}`}>
                                        <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-black ${step === num ? 'bg-white text-primary' : 'bg-gray-200 text-gray-500'}`}>{num}</span>
                                        <span className="font-bold text-xs whitespace-nowrap uppercase tracking-wider">{num === 1 ? 'Personal' : num === 2 ? 'Social' : 'Pricing'}</span>
                                    </div>
                                ))}
                            </div>

                            {error && (
                                <div className="bg-red-50 text-red-600 px-6 py-4 rounded-2xl text-sm font-bold border border-red-100 mb-8 flex items-center gap-3">
                                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" /> {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <AnimatePresence mode="wait">
                                    {step === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6"
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">Full Name</label>
                                                    <div className="relative group">
                                                        <User className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                                                        <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/10 transition-all font-bold" placeholder="Sarah Parker" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">Username</label>
                                                    <div className="relative group">
                                                        <User className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                                                        <input required name="username" value={formData.username} onChange={handleInputChange} className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/10 transition-all font-bold" placeholder="sarah_parker" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">Email Address</label>
                                                    <div className="relative group">
                                                        <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                                                        <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/10 transition-all font-bold" placeholder="sarah@example.com" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">Phone Number</label>
                                                    <div className="relative group">
                                                        <Phone className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                                                        <input required name="phone" value={formData.phone} onChange={handleInputChange} className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/10 transition-all font-bold" placeholder="+44 7700 900077" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">Category</label>
                                                    <div className="relative group">
                                                        <select
                                                            required
                                                            name="category"
                                                            value={formData.category}
                                                            onChange={handleInputChange}
                                                            className="w-full pl-6 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/10 transition-all font-bold appearance-none cursor-pointer"
                                                        >
                                                            {categories.length > 0 ? (
                                                                categories.map(cat => (
                                                                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                                                                ))
                                                            ) : (
                                                                <option value="fashion">Fashion</option>
                                                            )}
                                                        </select>
                                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none">▼</div>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">Password</label>
                                                    <div className="relative group">
                                                        <Lock className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                                                        <input required type="password" name="password" value={formData.password} onChange={handleInputChange} className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/10 transition-all font-bold" placeholder="••••••••" />
                                                    </div>
                                                </div>
                                            </div>

                                            <button type="button" onClick={nextStep} className="w-full bg-gradient-to-r from-primary to-pink-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                                                Next Step <ArrowRight className="w-6 h-6" />
                                            </button>
                                        </motion.div>
                                    )}

                                    {step === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6"
                                        >
                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">Instagram Profile Link</label>
                                                <div className="relative group">
                                                    <Instagram className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                                                    <input required name="instagramLink" value={formData.instagramLink} onChange={handleInputChange} className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/10 transition-all font-bold" placeholder="https://instagram.com/yourname" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">Instagram Followers</label>
                                                <div className="relative group">
                                                    <Users className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                                                    <input required name="instagramFollowers" value={formData.instagramFollowers} onChange={handleInputChange} className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/10 transition-all font-bold" placeholder="e.g. 50K" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">YouTube Channel Link</label>
                                                <div className="relative group">
                                                    <Youtube className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                                                    <input name="youtubeLink" value={formData.youtubeLink} onChange={handleInputChange} className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/10 transition-all font-bold" placeholder="https://youtube.com/c/yourname" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">YouTube Subscribers</label>
                                                <div className="relative group">
                                                    <Users className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                                                    <input name="youtubeSubscribers" value={formData.youtubeSubscribers} onChange={handleInputChange} className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/10 transition-all font-bold" placeholder="e.g. 100K" />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <button type="button" onClick={prevStep} className="py-5 bg-gray-50 text-gray-500 rounded-2xl font-black text-lg hover:bg-gray-100 transition-all">Back</button>
                                                <button type="button" onClick={nextStep} className="bg-gradient-to-r from-primary to-pink-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all">Continue</button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 3 && (
                                        <motion.div
                                            key="step3"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6"
                                        >
                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">Price Per Reel</label>
                                                <div className="relative group">
                                                    <DollarSign className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                                                    <input required name="pricePerReel" value={formData.pricePerReel} onChange={handleInputChange} className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/10 transition-all font-bold" placeholder="$500" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">YouTube Promotion Price</label>
                                                <div className="relative group">
                                                    <DollarSign className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                                                    <input name="youtubePromotionPrice" value={formData.youtubePromotionPrice} onChange={handleInputChange} className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/10 transition-all font-bold" placeholder="$1,000" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">Collaboration Price</label>
                                                <div className="relative group">
                                                    <DollarSign className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                                                    <input required name="collaborationPrice" value={formData.collaborationPrice} onChange={handleInputChange} className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/10 transition-all font-bold" placeholder="$2,500" />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <button type="button" onClick={prevStep} className="py-5 bg-gray-50 text-gray-500 rounded-2xl font-black text-lg hover:bg-gray-100 transition-all">Back</button>
                                                <button type="submit" disabled={isLoading} className="bg-gradient-to-r from-primary to-pink-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                                                    {isLoading ? <span className="flex items-center justify-center gap-2"><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Processing...</span> : 'Register Now'}
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </form>
                        </div>
                    </div>

                    <p className="text-center mt-12 text-gray-400 font-bold uppercase tracking-widest text-sm bg-white/50 backdrop-blur-sm inline-block px-6 py-2 rounded-full mx-auto">
                        Already have an account? <Link to="/login" className="text-primary hover:text-pink-600 transition-colors underline decoration-2 decoration-transparent hover:decoration-current underline-offset-4">Login here</Link>
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default InfluencerRegister;
