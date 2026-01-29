import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Ghost } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const NotFound = () => {
    useEffect(() => {
        document.title = "404 - Page Not Found | DO RING US";
    }, []);

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <main className="flex-1 flex items-center justify-center p-4 pt-32 pb-24">
                <div className="max-w-2xl w-full text-center">
                    <div className="relative mb-12">
                        <div className="text-[15rem] font-black text-gray-50 leading-none select-none">404</div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center animate-bounce">
                                <Ghost className="w-16 h-16 text-primary" />
                            </div>
                        </div>
                    </div>

                    <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-6 uppercase italic">
                        Lost in the <span className="text-primary italic">Ecosystem?</span>
                    </h1>
                    <p className="text-gray-500 font-bold text-xl uppercase tracking-widest mb-12 max-w-lg mx-auto leading-relaxed">
                        The creator you are looking for has moved or the link is broken.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Link
                            to="/influencers"
                            className="w-full md:w-auto px-10 py-5 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-primary transition-all flex items-center justify-center gap-3"
                        >
                            <ArrowLeft className="w-4 h-4" /> Explore Marketplace
                        </Link>
                        <Link
                            to="/"
                            className="w-full md:w-auto px-10 py-5 bg-gray-100 text-gray-900 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-gray-200 transition-all flex items-center justify-center gap-3"
                        >
                            <Home className="w-4 h-4" /> Return Home
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default NotFound;
