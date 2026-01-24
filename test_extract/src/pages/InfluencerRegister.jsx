import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Phone, Instagram, Youtube, DollarSign, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const InfluencerRegister = () => {
    const { registerInfluencer } = useAdmin();
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
        category: 'Fashion' // Default
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

        const res = await registerInfluencer(formData);
        if (res.success) {
            setSuccess(true);
        } else {
            setError(res.message);
        }
        setIsLoading(false);
    };

    if (success) {
        return (
            <div className="min-h-screen bg-white flex flex-col">
                <Navbar />
                <main className="flex-1 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-md w-full text-center bg-gray-50 p-12 rounded-[3rem] border border-gray-100"
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

            <main className="flex-1 flex items-center justify-center py-24 px-4">
                <div className="max-w-2xl w-full">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter">Become a Creator<span className="text-primary">.</span></h1>
                        <p className="text-gray-500 font-bold text-lg uppercase tracking-widest">Join Social Adda & Monetize your influence</p>
                    </div>

                    <div className="bg-gray-50/50 p-1 lg:p-1 rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden">
                        <div className="bg-white p-8 lg:p-12 rounded-[3rem]">
                            <div className="flex gap-4 mb-10 overflow-x-auto pb-2 no-scrollbar">
                                {[1, 2, 3].map(num => (
                                    <div key={num} className={`flex items-center gap-2 px-6 py-2 rounded-full border transition-all ${step === num ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                                        <span className="font-black text-xs">{num}</span>
                                        <span className="font-bold text-xs whitespace-nowrap">{num === 1 ? 'Personal' : num === 2 ? 'Social' : 'Pricing'}</span>
                                    </div>
                                ))}
                            </div>

                            {error && (
                                <div className="bg-red-50 text-red-600 px-6 py-4 rounded-2xl text-sm font-bold border border-red-100 mb-8 flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full" /> {error}
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
                                                    <div className="relative">
                                                        <User className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                                        <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold" placeholder="Sarah Parker" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">Username</label>
                                                    <div className="relative">
                                                        <User className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                                        <input required name="username" value={formData.username} onChange={handleInputChange} className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold" placeholder="sarah_parker" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">Email Address</label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                                        <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold" placeholder="sarah@example.com" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">Phone Number</label>
                                                    <div className="relative">
                                                        <Phone className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                                        <input required name="phone" value={formData.phone} onChange={handleInputChange} className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold" placeholder="+44 7700 900077" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">Password</label>
                                                <div className="relative">
                                                    <Lock className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                                    <input required type="password" name="password" value={formData.password} onChange={handleInputChange} className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold" placeholder="••••••••" />
                                                </div>
                                            </div>

                                            <button type="button" onClick={nextStep} className="w-full bg-primary text-white py-5 rounded-2xl font-black text-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
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
                                                <div className="relative">
                                                    <Instagram className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                                    <input required name="instagramLink" value={formData.instagramLink} onChange={handleInputChange} className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold" placeholder="https://instagram.com/yourname" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">Instagram Followers</label>
                                                <div className="relative">
                                                    <Users className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                                    <input required name="instagramFollowers" value={formData.instagramFollowers} onChange={handleInputChange} className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold" placeholder="e.g. 50K" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">YouTube Channel Link</label>
                                                <div className="relative">
                                                    <Youtube className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                                    <input name="youtubeLink" value={formData.youtubeLink} onChange={handleInputChange} className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold" placeholder="https://youtube.com/c/yourname" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">YouTube Subscribers</label>
                                                <div className="relative">
                                                    <Users className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                                    <input name="youtubeSubscribers" value={formData.youtubeSubscribers} onChange={handleInputChange} className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold" placeholder="e.g. 100K" />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <button type="button" onClick={prevStep} className="py-5 bg-gray-100 text-gray-600 rounded-2xl font-black text-lg transition-all">Back</button>
                                                <button type="button" onClick={nextStep} className="bg-primary text-white py-5 rounded-2xl font-black text-lg shadow-lg shadow-primary/20 transition-all">Continue</button>
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
                                                <div className="relative">
                                                    <DollarSign className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                                    <input required name="pricePerReel" value={formData.pricePerReel} onChange={handleInputChange} className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold" placeholder="$500" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">YouTube Promotion Price</label>
                                                <div className="relative">
                                                    <DollarSign className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                                    <input name="youtubePromotionPrice" value={formData.youtubePromotionPrice} onChange={handleInputChange} className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold" placeholder="$1,000" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-4">Collaboration Price</label>
                                                <div className="relative">
                                                    <DollarSign className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                                    <input required name="collaborationPrice" value={formData.collaborationPrice} onChange={handleInputChange} className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold" placeholder="$2,500" />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <button type="button" onClick={prevStep} className="py-5 bg-gray-100 text-gray-600 rounded-2xl font-black text-lg transition-all">Back</button>
                                                <button type="submit" disabled={isLoading} className="bg-primary text-white py-5 rounded-2xl font-black text-lg shadow-lg shadow-primary/20 transition-all disabled:opacity-50">
                                                    {isLoading ? 'Submitting...' : 'Register Now'}
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </form>
                        </div>
                    </div>

                    <p className="text-center mt-12 text-gray-400 font-bold uppercase tracking-widest text-sm">
                        Already have an account? <Link to="/login" className="text-primary">Login here</Link>
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default InfluencerRegister;
