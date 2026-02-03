import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAdmin } from '../context/AdminContext';
import { getImageUrl } from '../utils/axiosConfig';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import {
    Star, MapPin, CheckCircle, Video, Image, Trophy,
    Play, Share2, Instagram, Youtube, Send, User, Globe, Mail, Phone, Briefcase, ExternalLink,
    ChevronRight, Clock, DollarSign, ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Instagram Reel Embed optimized for Screenshot 1 style
const ReelEmbed = ({ url }) => {
    const getShortcode = (url) => {
        if (!url) return null;
        if (url.includes('instagram.com')) {
            const match = url.match(/\/(?:p|reels?)\/([A-Za-z0-9_-]+)/);
            return match ? match[1] : null;
        }
        return url;
    };

    const shortcode = getShortcode(url);

    if (!shortcode) return (
        <div className="w-[320px] h-[580px] bg-neutral-900 rounded-xl flex items-center justify-center border border-white/10">
            <Instagram className="w-10 h-10 text-white/20" />
        </div>
    );

    return (
        <div className="w-[320px] h-[580px] bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-200">
            <iframe
                src={`https://www.instagram.com/p/${shortcode}/embed/`}
                className="w-full h-full border-none"
                frameBorder="0"
                scrolling="no"
                allowTransparency="true"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            />
        </div>
    );
};

const InfluencerDetail = () => {
    const { influencerName } = useParams();
    const { influencers, loading, addInquiry } = useAdmin();
    const [formStatus, setFormStatus] = useState('idle');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        budget: '',
        message: ''
    });

    const heroScrollRef = useRef(null);

    const scroll = (direction) => {
        const { current } = heroScrollRef;
        if (current) {
            const scrollAmount = 350; // Card width + gap
            current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const influencer = influencers.find(inf => inf.username === influencerName);

    if (loading) return null;

    if (!influencer) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
                <h1 className="text-4xl font-black mb-4">404</h1>
                <p className="text-gray-500 mb-8 font-bold">Creator Not Found</p>
                <Link to="/" className="bg-primary text-white px-8 py-3 rounded-full font-bold">
                    Back to discovery
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
        <div className="bg-[#fcfcfc] min-h-screen font-sans selection:bg-primary/20">
            <Navbar darkMode={true} />

            {/* SCREENSHOT 1: DARK HERO REELS WITH ARROWS */}
            <section className="bg-[#1a1a1a] pb-40 pt-32 overflow-hidden relative group">
                {/* Navigation Arrows */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-10 top-1/2 -translate-y-1/2 z-[60] w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 hover:scale-110 active:scale-95 hidden lg:flex"
                >
                    <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-10 top-1/2 -translate-y-1/2 z-[60] w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 hover:scale-110 active:scale-95 hidden lg:flex"
                >
                    <ChevronRight className="w-8 h-8" />
                </button>

                <div className="container mx-auto px-4">
                    <div
                        ref={heroScrollRef}
                        className="flex gap-6 overflow-x-auto no-scrollbar py-8 snap-x snap-mandatory touch-pan-x scroll-smooth"
                    >
                        {influencer.instagramReels && influencer.instagramReels.length > 0 ? (
                            influencer.instagramReels.map((reel, idx) => (
                                <div key={idx} className="snap-center shrink-0">
                                    <ReelEmbed url={reel} />
                                </div>
                            ))
                        ) : (
                            [1, 2, 3, 4].map(idx => (
                                <div key={idx} className="w-[320px] h-[580px] bg-neutral-800 rounded-xl animate-pulse shrink-0 snap-center" />
                            ))
                        )}
                    </div>
                </div>
            </section>

            <main className="container mx-auto px-4 lg:px-12 -mt-32">
                {/* PROFILE INFO CARD - CLEANED & ATTRACTIVE */}
                <div className="bg-white rounded-[4rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.08)] border border-gray-50 p-10 lg:p-14 mb-16 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-50">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-orange-400 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                            <div className="relative w-48 h-48 rounded-full overflow-hidden border-8 border-white shadow-2xl bg-gray-50">
                                <img
                                    src={getImageUrl(influencer.profileImage)}
                                    alt={influencer.name}
                                    className="w-full h-full object-cover transform transition duration-700 group-hover:scale-110"
                                />
                            </div>
                        </div>

                        <div className="space-y-6 text-center md:text-left">
                            <div className="space-y-4">
                                <h1 className="text-5xl lg:text-7xl font-black text-[#1e293b] tracking-tighter leading-none italic uppercase">
                                    {influencer.name}
                                </h1>
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
                                    <div className="flex items-center gap-2 text-primary font-bold text-lg">
                                        <Instagram className="w-6 h-6" />
                                        @{influencer.username}
                                    </div>
                                    <div className="flex items-center gap-2 text-[#94a3b8] font-bold text-lg">
                                        <MapPin className="w-5 h-5" />
                                        {influencer.location || 'Global'}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-orange-500 font-black px-4 py-1.5 bg-orange-50 rounded-full border border-orange-100/50">
                                        <Star className="w-5 h-5 fill-current" />
                                        {influencer.rating || '5.0'}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {(influencer.categories && influencer.categories.length > 0) ? (
                                            influencer.categories.map(catId => {
                                                const cat = (useAdmin().categories || []).find(c => c.id === catId || c._id === catId);
                                                return (
                                                    <span key={catId} className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-black uppercase tracking-widest rounded-full border border-primary/20">
                                                        {cat?.label || cat?.name || catId}
                                                    </span>
                                                );
                                            })
                                        ) : (
                                            <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-black uppercase tracking-widest rounded-full border border-primary/20">
                                                {influencer.category || 'Creator'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="shrink-0 w-full lg:w-auto">
                        <button
                            onClick={() => document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group relative w-full lg:w-auto px-12 py-7 bg-[#1e293b] text-white rounded-[2rem] font-black text-xl hover:bg-primary transition-all duration-500 flex items-center justify-center gap-4 overflow-hidden shadow-2xl hover:shadow-primary/40"
                        >
                            <span className="relative z-10">Collaborate Now</span>
                            <ChevronRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform relative z-10" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[goldenrod] to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-24">
                    {/* LEFT COLUMN: ABOUT & PRICING */}
                    <div className="lg:col-span-7 space-y-12">
                        {/* ABOUT SECTION */}
                        <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm space-y-8">
                            <div className="flex items-center gap-4">
                                <User className="w-6 h-6 text-primary" />
                                <h2 className="text-2xl font-black tracking-tight">About the Creator</h2>
                            </div>
                            <p className="text-xl text-gray-500 font-medium leading-relaxed">
                                {influencer.bio || "Crafting digital stories that resonate. Specializing in high-impact visual content and authentic brand collaborations."}
                            </p>

                            <div className="inline-block p-1 rounded-[2.5rem] bg-gradient-to-r from-orange-500 to-primary">
                                <div className="bg-transparent px-10 py-5 rounded-[2.3rem] flex items-center gap-6 text-white min-w-[280px]">
                                    <Instagram className="w-10 h-10" />
                                    <div>
                                        <div className="text-2xl font-black italic">{influencer.followers || influencer.instagramFollowers || '0'}</div>
                                        <div className="text-[10px] font-black uppercase tracking-widest opacity-80">Instagram Feed</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PRICING SECTION */}
                        <div className="bg-[#0f172a] p-10 rounded-[3rem] text-white space-y-10 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl" />
                            <div className="flex items-center gap-4 relative">
                                <Trophy className="w-6 h-6 text-primary" />
                                <h2 className="text-2xl font-black tracking-tight">Pricing & Collaborations</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                                <div className="p-8 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                                    <h4 className="text-primary font-black text-xs uppercase tracking-widest">Per Reel/Post</h4>
                                    <div className="text-4xl font-black italic">{influencer.pricePerReel || influencer.price || '10k'}</div>
                                </div>
                                <div className="p-8 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                                    <h4 className="text-primary font-black text-xs uppercase tracking-widest">Collaboration</h4>
                                    <div className="text-4xl font-black italic">{influencer.collaborationPrice || influencer.price || '10k'}</div>
                                </div>
                            </div>
                        </div>

                        {/* PORTFOLIO GRID */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <Image className="w-6 h-6 text-primary" />
                                <h2 className="text-2xl font-black tracking-tight">Content Portfolio</h2>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                {influencer.gallery?.slice(0, 4).map((img, i) => (
                                    <div key={i} className="aspect-square rounded-[2rem] overflow-hidden border border-gray-100 shadow-lg">
                                        <img src={getImageUrl(img)} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* YOUTUBE SECTION */}
                        {influencer.youtubeVideos && influencer.youtubeVideos.length > 0 && (
                            <div className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <Youtube className="w-6 h-6 text-primary" />
                                    <h2 className="text-2xl font-black tracking-tight">Featured Content</h2>
                                </div>
                                <div className="aspect-video rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl bg-black">
                                    <iframe
                                        className="w-full h-full"
                                        src={`https://www.youtube.com/embed/${influencer.youtubeVideos[0].split('v=')[1]?.split('&')[0] || influencer.youtubeVideos[0].split('/').pop()}`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: BOOKING FORM & TRUST STATS */}
                    <div className="lg:col-span-5">
                        {/* INQUIRY FORM SECTION */}
                        <div id="inquiry-form" className="bg-white p-10 lg:p-16 rounded-[4rem] border border-gray-50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] lg:sticky lg:top-32 h-fit">
                            <div className="mb-12">
                                <h3 className="text-4xl lg:text-5xl font-black text-[#1e293b] mb-4 italic tracking-tight">
                                    Book {influencer.name.split(' ')[0]}
                                </h3>
                                <p className="text-[#64748b] font-medium text-lg leading-relaxed">
                                    Fill out the form below to initiate a collaboration.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="relative group">
                                    <div className="absolute left-7 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-primary transition-colors">
                                        <User className="w-6 h-6" />
                                    </div>
                                    <input
                                        required
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        placeholder="Full Name"
                                        className="w-full pl-16 pr-8 py-6 bg-[#f8fafc] border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-gray-100 outline-none transition-all font-bold text-[#1e293b] placeholder:text-[#94a3b8] text-lg"
                                    />
                                </div>
                                <div className="relative group">
                                    <div className="absolute left-7 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-primary transition-colors">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Email Address"
                                        className="w-full pl-16 pr-8 py-6 bg-[#f8fafc] border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-gray-100 outline-none transition-all font-bold text-[#1e293b] placeholder:text-[#94a3b8] text-lg"
                                    />
                                </div>
                                <div className="relative group">
                                    <div className="absolute left-7 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-primary transition-colors">
                                        <Briefcase className="w-6 h-6" />
                                    </div>
                                    <input
                                        required
                                        type="text"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleInputChange}
                                        placeholder="Campaign Budget (e.g. $1,000)"
                                        className="w-full pl-16 pr-8 py-6 bg-[#f8fafc] border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-gray-100 outline-none transition-all font-bold text-[#1e293b] placeholder:text-[#94a3b8] text-lg"
                                    />
                                </div>
                                <div className="relative group">
                                    <textarea
                                        required
                                        rows="5"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder="Briefly describe your campaign goal..."
                                        className="w-full px-8 py-6 bg-[#f8fafc] border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-gray-100 outline-none transition-all font-bold text-[#1e293b] placeholder:text-[#94a3b8] text-lg resize-none"
                                    />
                                </div>

                                <button
                                    disabled={formStatus === 'sending'}
                                    type="submit"
                                    className={`w-full py-7 rounded-[2.5rem] font-black text-white text-2xl transition-all flex items-center justify-center gap-4 active:scale-[0.98] shadow-2xl tracking-tight
                                        ${formStatus === 'success' ? 'bg-green-500 shadow-green-200' : 'bg-primary hover:bg-primary/90 shadow-primary/20 hover:shadow-primary/40'}`}
                                >
                                    {formStatus === 'idle' && (
                                        <>Send Inquiry <Send className="w-7 h-7 rotate-[-15deg]" /></>
                                    )}
                                    {formStatus === 'sending' && "Processing..."}
                                    {formStatus === 'success' && "Inquiry Sent!"}
                                </button>

                                <div className="text-center pt-8">
                                    <p className="text-[11px] font-black text-[#94a3b8] uppercase tracking-[0.2em]">
                                        SECURE INQUIRY • NO COMMITMENT REQUIRED
                                    </p>
                                </div>
                            </form>

                            {/* Trust Stats Cards integrated */}
                            <div className="grid grid-cols-2 gap-4 mt-12 pt-12 border-t border-gray-100">
                                <div className="bg-[#f8fafc] p-6 rounded-3xl border border-gray-50 space-y-1">
                                    <p className="text-[10px] text-[#94a3b8] font-black uppercase tracking-widest">Price Guide</p>
                                    <div className="text-xl font-black text-[#1e293b]">Starts {influencer.price || '$500'}</div>
                                </div>
                                <div className="bg-[#f8fafc] p-6 rounded-3xl border border-gray-50 space-y-1">
                                    <p className="text-[10px] text-[#94a3b8] font-black uppercase tracking-widest">Response</p>
                                    <div className="text-xl font-black text-[#1e293b]">{influencer.responseTime || '24 Hours'}</div>
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
