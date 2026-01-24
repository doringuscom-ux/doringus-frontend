import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Video, Instagram, Trash2, ExternalLink, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const VideosManagement = () => {
    const { influencers } = useAdmin();

    // Flatten all videos from all influencers
    const allVideos = influencers.reduce((acc, inf) => {
        const yt = (inf.youtubeVideos || []).map(v => ({ type: 'youtube', link: v, influencer: inf.name, influencerId: inf.id }));
        const reels = (inf.instagramReels || []).map(v => ({ type: 'reel', link: v, influencer: inf.name, influencerId: inf.id }));
        return [...acc, ...yt, ...reels];
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Videos & Reels Gallery</h1>
                    <p className="text-gray-500">Overview of all content uploaded for influencers.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allVideos.length === 0 ? (
                    <div className="col-span-full bg-white p-12 rounded-3xl border border-dashed border-gray-200 text-center">
                        <Video className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-gray-900">No Videos Yet</h3>
                        <p className="text-gray-500">Add videos in the Influencer Management section.</p>
                    </div>
                ) : (
                    allVideos.map((item, idx) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            key={idx}
                            className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col gap-4"
                        >
                            <div className={`aspect-video rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center relative group`}>
                                {item.type === 'youtube' ? (
                                    <div className="flex flex-col items-center text-red-500">
                                        <Video className="w-10 h-10 mb-2" />
                                        <span className="text-xs font-bold uppercase tracking-widest">YouTube Video</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center text-pink-500">
                                        <Instagram className="w-10 h-10 mb-2" />
                                        <span className="text-xs font-bold uppercase tracking-widest">Instagram Reel</span>
                                    </div>
                                )}
                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <ExternalLink className="text-white w-8 h-8" />
                                </a>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-black text-gray-900">{item.influencer}</div>
                                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter truncate max-w-[150px]">{item.link}</div>
                                </div>
                                <div className="p-2 bg-gray-50 rounded-lg">
                                    <Play className="w-4 h-4 text-primary" />
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
