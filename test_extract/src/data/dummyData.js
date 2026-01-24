import { Instagram, Youtube, Twitter, Facebook } from 'lucide-react';

export const influencers = [
    {
        id: 1,
        name: "Sarah Jenkins",
        niche: "Fashion & Lifestyle",
        followers: "1.2M",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        platforms: ["Instagram", "TikTok"]
    },
    {
        id: 2,
        name: "David Chen",
        niche: "Tech & Gadgets",
        followers: "850K",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        platforms: ["YouTube", "Twitter"]
    },
    {
        id: 3,
        name: "Bella Rossi",
        niche: "Beauty & Wellness",
        followers: "2.1M",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
        platforms: ["Instagram", "YouTube"]
    },
    {
        id: 4,
        name: "Marcus Johnson",
        niche: "Fitness & Health",
        followers: "500K",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
        platforms: ["TikTok", "Instagram"]
    }
];

export const stats = [
    { label: "Influencers", value: "2.5M+" },
    { label: "Brands", value: "15k+" },
    { label: "Campaigns", value: "85k+" },
    { label: "Countries", value: "150+" },
];

export const plans = [
    {
        name: "Starter",
        price: "$49",
        features: ["5 Active Campaigns", "50 Influencer Discoveries", "Basic Analytics", "Email Support"],
        recommended: false
    },
    {
        name: "Growth",
        price: "$149",
        features: ["Unlimited Campaigns", "Unlimited Discovery", "Advanced Analytics", "Dedicated Manager", "API Access"],
        recommended: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        features: ["White Labeling", "Custom Contracts", "Priority Support", "Strategy Workshop", "Data Export"],
        recommended: false
    }
];
