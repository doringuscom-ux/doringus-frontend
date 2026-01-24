import { useState } from 'react';
import { motion } from 'framer-motion';

const showcaseImages = [
    {
        id: 'fashion',
        url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
        alt: 'Fashion Influencer'
    },
    {
        id: 'tech',
        url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
        alt: 'Tech Reviewer'
    },
    {
        id: 'lifestyle',
        url: 'https://artists.sosparty.io/imgs/section-1-img1.webp',
        alt: 'Lifestyle Content'
    },
    {
        id: 'beauty',
        url: 'https://images.unsplash.com/photo-1596462502278-27bfdd403ccc?q=80&w=1200&auto=format&fit=crop',
        alt: 'Beauty Influencer'
    },
    {
        id: 'travel',
        url: 'https://images.unsplash.com/photo-1504198266287-1659872e6590?q=80&w=1200&auto=format&fit=crop',
        alt: 'Travel Creator'
    }
];

const CampaignShowcase = () => {
    const [activeId, setActiveId] = useState('fashion');

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Visual Accordion Container - No Text Header */}
                <div className="flex flex-col lg:flex-row h-[600px] gap-4 rounded-[2.5rem] overflow-hidden">
                    {showcaseImages.map((image) => {
                        const isActive = activeId === image.id;

                        return (
                            <motion.div
                                key={image.id}
                                layout
                                onClick={() => setActiveId(image.id)}
                                onHoverStart={() => setActiveId(image.id)}
                                className={`relative cursor-pointer overflow-hidden rounded-[2rem] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'flex-[10] lg:flex-[6]' : 'flex-[1] lg:flex-[1]'
                                    }`}
                            >
                                <motion.div
                                    className="absolute inset-0 w-full h-full"
                                    layoutId={`image-${image.id}`}
                                >
                                    <img
                                        src={image.url}
                                        alt={image.alt}
                                        className={`w-full h-full object-cover transition-transform duration-1000 ${isActive ? 'scale-100' : 'scale-110 grayscale-[0.5] hover:grayscale-0'
                                            }`}
                                    />
                                    {/* Subtle overlay for inactive items to make active pop more */}
                                    <div className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ${isActive ? 'opacity-0' : 'opacity-100'}`} />
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CampaignShowcase;
