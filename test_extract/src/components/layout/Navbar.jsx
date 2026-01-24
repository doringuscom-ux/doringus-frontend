import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Become a Creator', href: '/register/influencer' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'
                }`}
        >
            <div className="container mx-auto px-6">
                <div
                    className={`flex items-center justify-between transition-all duration-500 px-8 py-4 rounded-[2rem] ${scrolled
                            ? 'bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-white/20'
                            : 'bg-transparent'
                        }`}
                >
                    {/* Logo */}
                    <Link to="/" className="text-3xl font-black tracking-tighter text-gray-900 hover:scale-105 transition-transform flex items-center gap-1 group italic">
                        Social Adda<span className="text-primary group-hover:animate-ping h-2 w-2 bg-primary rounded-full mt-4"></span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-primary transition-all relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/login" className="font-black text-xs uppercase tracking-widest text-gray-900 hover:text-primary transition-colors">Log In</Link>
                        <Link to="/register/influencer">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-primary text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all border-none"
                            >
                                Join Now
                            </motion.button>
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="md:hidden w-12 h-12 flex items-center justify-center bg-gray-50 rounded-2xl text-gray-900 border border-gray-100"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 mx-6 mt-4 md:hidden bg-white/95 backdrop-blur-2xl border border-gray-100 rounded-[2.5rem] shadow-2xl overflow-hidden z-50 p-8"
                    >
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-2xl font-black text-gray-900 italic hover:text-primary transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="h-px bg-gray-100 my-2" />
                            <div className="flex flex-col gap-4">
                                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-gray-500 text-center py-2">
                                    Already have an account? <span className="text-primary">Log In</span>
                                </Link>
                                <Link to="/register/influencer" onClick={() => setMobileMenuOpen(false)}>
                                    <button className="w-full bg-primary text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-primary/20">
                                        Join Social Adda
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
