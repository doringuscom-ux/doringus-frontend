import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import {
    Video, Instagram, Trash2, ExternalLink, Play,
    LayoutGrid, Youtube, Search, ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VideosManagement = () => {
    const { influencers = [] } = useAdmin() || {};

    // Flatten all videos from all influencers
    const allVideos = (influencers || []).reduce((acc, inf) => {
        const yt = (inf.youtubeVideos || []).map(v => ({ type: 'youtube', link: v, influencer: inf.name, influencerId: inf.id }));
        const reels = (inf.instagramReels || []).map(v => ({ type: 'reel', link: v, influencer: inf.name, influencerId: inf.id }));
        return [...acc, ...yt, ...reels];
    }, []);

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <LayoutGrid className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Content Repository</span>
                    </div>
                    <h1 className="text-5xl font-black text-gray-900 tracking-tighter italic">
                        Vision<span className="text-primary italic">.</span> Gallery
                    </h1>
                    <p className="text-gray-400 mt-2 font-bold uppercase tracking-widest text-xs">Aggregated visual assets from your creator network.</p>
                </div>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allVideos.length === 0 ? (
                    <div className="col-span-full bg-white p-24 rounded-[3.5rem] border-4 border-dashed border-gray-50 flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center text-gray-300 mb-8">
                            <Video className="w-10 h-10" />
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 tracking-tight italic">Gallery Empty.</h3>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-2 italic">Add video links in individual creator profiles to populate this space.</p>
                    </div>
                ) : (
                    allVideos.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 group"
                        >
                            <div className="relative aspect-video rounded-3xl overflow-hidden bg-gray-900 mb-6 group">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

                                {item.type === 'youtube' ? (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-rose-500 z-20">
                                        <Youtube className="w-12 h-12 mb-2 group-hover:scale-110 transition-transform" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/60">YT Stream</span>
                                    </div>
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-pink-500 z-20">
                                        <Instagram className="w-12 h-12 mb-2 group-hover:scale-110 transition-transform" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/60">IG Reel</span>
                                    </div>
                                )}

                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center bg-black/40 backdrop-blur-sm"
                                >
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black">
                                        <ExternalLink className="w-6 h-6" />
                                    </div>
                                </a>
                            </div>

                            <div className="flex items-center justify-between px-2">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-black text-gray-900 italic">{item.influencer}</span>
                                        <ArrowUpRight className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 truncate max-w-[180px]">
                                        {item.type} Source Transmission
                                    </div>
                                </div>
                                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                    <Play className="w-5 h-5 fill-current" />
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default VideosManagement;
