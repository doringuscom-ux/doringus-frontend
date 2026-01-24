import { motion } from 'framer-motion';

const videosLeft = [
    "https://influencer-videos.b-cdn.net/influencer-home-header/hh1.mp4",
    "https://influencer-videos.b-cdn.net/influencer-home-header/hh6.mp4",
];
const videosRight = [
    "https://influencer-videos.b-cdn.net/influencer-home-header/hh4.mp4",
    "https://influencer-videos.b-cdn.net/influencer-home-header/hh11.mp4",
];

// Duplicate for loop
const leftColumn = [...videosLeft, ...videosLeft, ...videosLeft];
const rightColumn = [...videosRight, ...videosRight, ...videosRight];

const VideoCard = ({ src }) => {
    return (
        <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <video
                src={src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                loading="lazy"
            />
        </div>
    );
};

const VideoGrid = () => {
    return (
        <div className="relative h-[600px] lg:h-[800px] overflow-hidden flex gap-4 lg:gap-6 mask-linear-fade">
            {/* Gradient Masks for smooth fade in/out */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent z-10" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-10" />

            {/* Column 1 - Slow Scroll */}
            <div className="w-1/2 relative">
                <div className="animate-scroll-up flex flex-col gap-4 lg:gap-6 pb-6">
                    {leftColumn.map((src, idx) => (
                        <VideoCard key={`left-${idx}`} src={src} />
                    ))}
                </div>
            </div>

            {/* Column 2 -  Slightly Faster/Offset Scroll or Same for uniform look */}
            <div className="w-1/2 relative mt-[-100px]"> {/* Offset start */}
                <div className="animate-scroll-up flex flex-col gap-4 lg:gap-6 pb-6" style={{ animationDuration: '35s' }}>
                    {rightColumn.map((src, idx) => (
                        <VideoCard key={`right-${idx}`} src={src} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VideoGrid;
