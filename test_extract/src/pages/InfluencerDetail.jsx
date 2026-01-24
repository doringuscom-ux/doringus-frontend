import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import {
    Star, MapPin, Clock, CheckCircle, Video, Image, Trophy,
    MessageCircle, Play, ChevronRight, Mail, Briefcase, Share2, ArrowLeft,
    Instagram, Youtube, Twitter, Globe, Send, User, Phone, Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InfluencerDetail = () => {
    const { influencerName } = useParams();
    const { influencers, loading, addInquiry } = useAdmin();
    const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success, error
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        budget: '',
        message: ''
    });

    const influencer = influencers.find(inf => inf.username === influencerName);

    if (loading) return null;

    if (!influencer) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 uppercase tracking-tighter">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-6xl font-black text-gray-900 mb-4"
                >
                    404
                </motion.h1>
                <p className="text-gray-500 mb-8 font-bold">Creator Not Found</p>
                <Link to="/" className="bg-primary text-white px-10 py-4 rounded-full font-black shadow-2xl hover:scale-105 transition-all">
                    Back to Discovery
                </Link>
            </div>
        );
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('sending');

        // Add inquiry to context
        const result = await addInquiry({
            ...formData,
            influencerUsername: influencer.username,
            influencerName: influencer.name
        });

        if (result.success) {
            setFormStatus('success');
            setFormData({ fullName: '', email: '', phone: '', budget: '', message: '' });
            setTimeout(() => setFormStatus('idle'), 5000);
        } else {
            setFormStatus('error');
        }
    };

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-primary/20">
            <Navbar />

            <main className="pt-24">
                {/* Hero Section */}
                <div className="relative h-[60vh] min-h-[500px] overflow-hidden bg-black">
                    <img
                        src={influencer.profileImage || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80"}
                        alt={influencer.name}
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                    <div className="absolute bottom-0 left-0 w-full p-8 lg:p-16">
                        <div className="container mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="max-w-4xl"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="bg-primary text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                                        {influencer.category}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-yellow-400">
                                        <Star className="w-5 h-5 fill-current" />
                                        <span className="font-bold text-lg">{influencer.rating || '4.9'}</span>
                                    </div>
                                </div>
                                <h1 className="text-5xl lg:text-7xl font-black text-white mb-4 tracking-tighter flex items-center gap-4">
                                    {influencer.name}
                                    <CheckCircle className="w-8 h-8 text-blue-500 fill-blue-500/20" />
                                </h1>
                                <p className="text-2xl text-white/70 font-medium mb-8">@{influencer.username}</p>

                                <div className="flex flex-wrap gap-8 text-white">
                                    <div className="flex flex-col">
                                        <span className="text-3xl font-black">{influencer.followers}</span>
                                        <span className="text-xs uppercase tracking-widest opacity-50 font-bold">Followers</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-3xl font-black">{influencer.engagement || '5.2%'}</span>
                                        <span className="text-xs uppercase tracking-widest opacity-50 font-bold">Engagement</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-3xl font-black">{influencer.location || 'London'}</span>
                                        <span className="text-xs uppercase tracking-widest opacity-50 font-bold">Location</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 lg:px-16 -mt-12 relative z-10 pb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* Left Content Side */}
                        <div className="lg:col-span-7 space-y-16">

                            {/* Bio & About */}
                            <section className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-50">
                                <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                                    <User className="w-6 h-6 text-primary" />
                                    About the Creator
                                </h2>
                                <p className="text-xl text-gray-600 leading-relaxed font-medium">
                                    {influencer.bio || "Crafting digital stories that resonate. Specializing in high-impact visual content and authentic brand collaborations."}
                                </p>

                                <div className="mt-8 flex flex-wrap gap-3">
                                    {influencer.skills?.map(skill => (
                                        <span key={skill} className="px-5 py-2.5 bg-gray-50 text-gray-700 rounded-2xl text-sm font-bold border border-gray-100 italic">
                                            #{skill.replace(/\s+/g, '')}
                                        </span>
                                    ))}
                                </div>

                                {/* Social Channels */}
                                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {(influencer.instagramLink || influencer.socialLinks?.instagram) && (
                                        <a href={influencer.instagramLink || `https://instagram.com/${influencer.socialLinks.instagram}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-6 rounded-3xl bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] text-white hover:scale-[1.02] transition-transform shadow-lg shadow-pink-500/20">
                                            <Instagram className="w-10 h-10" />
                                            <div>
                                                <div className="font-black text-xl">{influencer.instagramFollowers || influencer.followers}</div>
                                                <div className="text-xs uppercase tracking-widest font-bold opacity-80 italic">Instagram Feed</div>
                                            </div>
                                        </a>
                                    )}
                                    {(influencer.youtubeLink || influencer.socialLinks?.youtube) && (
                                        <a href={influencer.youtubeLink || `https://youtube.com/@${influencer.socialLinks.youtube}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-6 rounded-3xl bg-primary text-white hover:scale-[1.02] transition-transform shadow-lg shadow-primary/20">
                                            <Youtube className="w-10 h-10" />
                                            <div>
                                                <div className="font-black text-xl">{influencer.youtubeSubscribers || 'Premium'}</div>
                                                <div className="text-xs uppercase tracking-widest font-bold opacity-80 italic">YouTube Channel</div>
                                            </div>
                                        </a>
                                    )}
                                </div>
                            </section>

                            {/* Pricing Section */}
                            <section className="bg-gray-900 p-10 rounded-[2.5rem] text-white">
                                <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                                    <Trophy className="w-6 h-6 text-primary" />
                                    Pricing & Collaborations
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                                        <div className="text-primary font-black mb-1">Per Reel/Post</div>
                                        <div className="text-3xl font-black">{influencer.pricePerReel || influencer.price || '$500'}</div>
                                    </div>
                                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                                        <div className="text-primary font-black mb-1">Collaboration</div>
                                        <div className="text-3xl font-black">{influencer.collaborationPrice || '$1,200'}</div>
                                    </div>
                                </div>
                            </section>

                            {/* Portfolio / Gallery */}
                            <section>
                                <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                                    <Image className="w-6 h-6 text-primary" />
                                    Content Portfolio
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {influencer.gallery?.map((img, idx) => (
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            key={idx}
                                            className={`rounded-3xl overflow-hidden bg-gray-100 aspect-[4/5] shadow-sm ${idx % 3 === 0 ? 'md:col-span-2 md:aspect-[16/9]' : ''}`}
                                        >
                                            <img src={img} alt="" className="w-full h-full object-cover" />
                                        </motion.div>
                                    )) || [1, 2, 3, 4, 5].map(idx => (
                                        <div key={idx} className="bg-gray-50 rounded-3xl aspect-[4/5] animate-pulse" />
                                    ))}
                                </div>
                            </section>

                            {/* Video Section */}
                            {(influencer.videoUrl || influencer.youtubeVideos?.length > 0) && (
                                <section>
                                    <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                                        <Video className="w-6 h-6 text-primary" />
                                        YouTube Videos
                                    </h2>
                                    <div className="grid grid-cols-1 gap-6">
                                        {influencer.youtubeVideos?.map((video, idx) => (
                                            <div key={idx} className="aspect-video rounded-[2rem] overflow-hidden bg-black shadow-xl">
                                                <iframe
                                                    className="w-full h-full"
                                                    src={video.includes('ember') ? video : `https://www.youtube.com/embed/${video.split('v=')[1]?.split('&')[0] || video}`}
                                                    title="YouTube video player"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                        )) || influencer.videoUrl && (
                                            <div className="aspect-video rounded-[3rem] overflow-hidden bg-black shadow-2xl">
                                                <iframe
                                                    className="w-full h-full"
                                                    src={influencer.videoUrl}
                                                    title="YouTube video player"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            )}

                            {/* Instagram Reels Section */}
                            {influencer.instagramReels?.length > 0 && (
                                <section>
                                    <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                                        <Instagram className="w-6 h-6 text-primary" />
                                        Instagram Reels
                                    </h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                        {influencer.instagramReels.map((reel, idx) => (
                                            <a key={idx} href={reel} target="_blank" rel="noopener noreferrer" className="aspect-[9/16] rounded-3xl bg-gray-100 flex items-center justify-center p-4 text-center group hover:bg-gray-200 transition-colors">
                                                <div className="flex flex-col items-center">
                                                    <Play className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                                                    <span className="font-black text-sm uppercase tracking-widest">Watch Reel</span>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Right Sidebar - Inquiry Form */}
                        <div className="lg:col-span-5">
                            <div className="sticky top-32 space-y-6">

                                <div className="bg-white p-8 lg:p-10 rounded-[3rem] shadow-2xl shadow-primary/10 border border-primary/5">
                                    <div className="mb-8">
                                        <h3 className="text-3xl font-black text-gray-900 mb-2 italic">Book {influencer.name.split(' ')[0]}</h3>
                                        <p className="text-gray-500 font-medium">Fill out the form below to initiate a collaboration.</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="relative">
                                            <User className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                            <input
                                                required
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                placeholder="Full Name"
                                                className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-bold placeholder:text-gray-400"
                                            />
                                        </div>

                                        <div className="relative">
                                            <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="Email Address"
                                                className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-bold placeholder:text-gray-400"
                                            />
                                        </div>

                                        <div className="relative">
                                            <Briefcase className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                            <input
                                                required
                                                type="text"
                                                name="budget"
                                                value={formData.budget}
                                                onChange={handleInputChange}
                                                placeholder="Campaign Budget (e.g. $1,000)"
                                                className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-bold placeholder:text-gray-400"
                                            />
                                        </div>

                                        <div className="relative">
                                            <textarea
                                                required
                                                rows="4"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                placeholder="Briefly describe your campaign goal..."
                                                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-bold placeholder:text-gray-400 resize-none"
                                            ></textarea>
                                        </div>

                                        <button
                                            disabled={formStatus === 'sending'}
                                            type="submit"
                                            className={`w-full py-5 rounded-2xl font-black text-white text-lg shadow-xl transition-all flex items-center justify-center gap-3 overflow-hidden relative
                                                ${formStatus === 'success' ? 'bg-green-500 shadow-green-500/20' : 'bg-primary shadow-primary/20 hover:scale-[1.02]'}`}
                                        >
                                            <AnimatePresence mode="wait">
                                                {formStatus === 'idle' && (
                                                    <motion.div
                                                        key="idle"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="flex items-center gap-2"
                                                    >
                                                        Send Inquiry <Send className="w-5 h-5" />
                                                    </motion.div>
                                                )}
                                                {formStatus === 'sending' && (
                                                    <motion.div
                                                        key="sending"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        className="flex items-center gap-2"
                                                    >
                                                        Sending...
                                                    </motion.div>
                                                )}
                                                {formStatus === 'success' && (
                                                    <motion.div
                                                        key="success"
                                                        initial={{ opacity: 0, scale: 0.5 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        className="flex flex-col items-center text-center py-2"
                                                    >
                                                        <span className="font-black text-sm">Thank you! We will contact you soon.</span>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </button>

                                        <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest mt-4">
                                            Secure Inquiry • No Commitment Required
                                        </p>
                                    </form>
                                </div>

                                {/* Extra Info Cards */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Price Guide</h4>
                                        <p className="text-xl font-black text-gray-900">{influencer.price || "Starts from $500"}</p>
                                    </div>
                                    <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Response Time</h4>
                                        <p className="text-xl font-black text-gray-900">{influencer.responseTime || "24 Hours"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default InfluencerDetail;
