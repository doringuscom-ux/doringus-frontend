import { ShieldCheck, Zap, BarChart3, Users } from 'lucide-react';

const features = [
    {
        icon: Users,
        title: "Vetted Creators",
        desc: "Access a curated network of authentic influencers with verified engagement metrics."
    },
    {
        icon: BarChart3,
        title: "Real-Time ROI",
        desc: "Track every click, conversion, and rupee spent with our advanced analytics dashboard."
    },
    {
        icon: ShieldCheck,
        title: "Secure Payments",
        desc: "Automated payouts and escrow services ensure safety for both brands and creators."
    },
    {
        icon: Zap,
        title: "Fast Campaigns",
        desc: "Launch campaigns in minutes, not days. Streamlined workflow from brief to content."
    }
];

const WhySocialAdda = () => {
    return (
        <section className="py-24 bg-surface-secondary border-t border-gray-100">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl lg:text-5xl font-bold font-display text-text-main mb-6">Why Industry Leaders <br /><span className="text-primary">Choose Social Adda</span></h2>
                    <p className="text-text-secondary text-lg">We combine cutting-edge technology with human expertise to deliver influencer marketing campaigns that scale.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-6">
                                <feature.icon className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-lg font-bold font-display text-text-main mb-3">{feature.title}</h3>
                            <p className="text-text-secondary leading-relaxed text-sm">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhySocialAdda;
