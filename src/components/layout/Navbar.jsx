import { useState, useEffect } from 'react';
import { Menu, X, Zap, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { useAdmin } from '../../context/AdminContext';

const Navbar = ({ darkMode = false }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, logout } = useAdmin();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Determine text colors based on scroll state and dark mode
    const logoColor = isScrolled ? 'text-gray-900' : (darkMode ? 'text-white' : 'text-gray-900');
    const linkColor = isScrolled ? 'text-gray-500' : (darkMode ? 'text-gray-300' : 'text-gray-500');
    const loginColor = isScrolled ? 'text-gray-400' : (darkMode ? 'text-gray-300' : 'text-gray-400');

    // Button style: On dark mode (transparent), make button white/light so it pops against black,
    // or keep it distinct. bg-gray-900 on black is hard to see.
    // When scrolled (white bg), bg-gray-900 is fine.
    // When not scrolled (transparent/black bg), bg-white text-black matches the "premium" dark aesthetic usually.
    const buttonClass = isScrolled
        ? "bg-gray-900 text-white hover:bg-primary hover:shadow-xl hover:shadow-primary/30"
        : (darkMode
            ? "bg-white text-black hover:bg-primary hover:text-white hover:shadow-xl hover:shadow-primary/30"
            : "bg-gray-900 text-white hover:bg-primary hover:shadow-xl hover:shadow-primary/30");

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled
            ? 'py-3'
            : 'py-6'
            }`}>
            <div className="container mx-auto px-4 md:px-6">
                <div className={`relative flex items-center justify-between transition-all duration-500 px-4 md:px-8 py-3 rounded-[2.5rem] border ${isScrolled
                    ? 'bg-white/90 backdrop-blur-2xl border-white/20 shadow-2xl shadow-black/5'
                    : (darkMode
                        ? 'bg-black/20 backdrop-blur-md border-white/10'
                        : 'bg-transparent border-transparent')
                    }`}>
                    {/* Logo */}
                    <Link to="/" className={`flex items-center gap-1.5 text-2xl font-black tracking-tighter italic uppercase transition-colors ${logoColor}`}>
                        <Zap className="w-8 h-8 fill-primary text-primary" />
                        <span>DO RING US</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6 lg:gap-10">
                        <Link to="/about" className={`text-sm font-black uppercase tracking-widest hover:text-primary transition-colors ${linkColor}`}>About Us</Link>
                        <Link to="/influencers" className={`text-sm font-black uppercase tracking-widest hover:text-primary transition-colors ${linkColor}`}>View Artists</Link>

                        <div className="w-px h-6 bg-gray-200 mx-2" />

                        {user ? (
                            <div className="flex items-center gap-6">
                                <Link
                                    to={user.role === 'admin' ? '/admin' : '/influencer/dashboard'}
                                    className="flex items-center gap-2 group"
                                >
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                                        {user.profileImage ? (
                                            <img src={user.profileImage} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-4 h-4 text-primary" />
                                        )}
                                    </div>
                                    <span className={`text-sm font-black uppercase tracking-widest group-hover:text-primary transition-colors ${logoColor}`}>
                                        {user.role === 'admin' ? 'Dashboard' : 'My Profile'}
                                    </span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                    title="Logout"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4 lg:gap-8">
                                <Link to="/login" className={`text-sm font-black uppercase tracking-widest hover:text-primary transition-colors ${loginColor}`}>Log In</Link>
                                <Link to="/register/influencer" className={`px-4 md:px-6 lg:px-8 py-4 rounded-2xl text-xs lg:text-sm font-black uppercase tracking-widest transition-all active:scale-95 ${buttonClass}`}>
                                    Become a Creator
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className={`md:hidden p-2 ${logoColor}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-8 md:hidden shadow-2xl"
                    >
                        <div className="flex flex-col gap-6">
                            <Link to="/about" className="text-lg font-black uppercase tracking-widest text-gray-900">About Us</Link>
                            <Link to="/influencers" className="text-lg font-black uppercase tracking-widest text-gray-900">View Artists</Link>
                            <div className="h-px bg-gray-100 my-2" />
                            {user ? (
                                <>
                                    <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="text-lg font-black uppercase tracking-widest text-primary">Dashboard</Link>
                                    <button onClick={handleLogout} className="text-lg font-black uppercase tracking-widest text-red-500 text-left">Log Out</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-lg font-black uppercase tracking-widest text-gray-400">Log In</Link>
                                    <Link to="/register/influencer" className="bg-primary text-white p-6 rounded-2xl text-center font-black uppercase tracking-widest">Become a Creator</Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav >
    );
};

export default Navbar;
