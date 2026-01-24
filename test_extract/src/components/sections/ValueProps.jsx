import { Zap, Mic, ShoppingBag } from 'lucide-react';

const ValueProps = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">We've worked with top brands</p>
                    <h2 className="text-3xl lg:text-5xl font-bold font-display text-text-main leading-tight">
                        From concept to content, we put creators at the heart of creativity, media, and commerce to <span className="text-primary font-extrabold">drive performance</span> across the funnel
                    </h2>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Card 1: Creative */}
                    <div className="bg-surface-secondary p-8 rounded-3xl hover:shadow-lg transition-shadow duration-300">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                                <Zap className="w-5 h-5 text-pink-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-text-main font-display">Creative</h3>
                        </div>
                        <p className="text-text-secondary leading-relaxed text-lg">
                            We craft ideas that move culture. Creator campaigns deliver a <strong className="text-text-main">91% higher 6-second view-through rate</strong> vs. standard ads.
                        </p>
                    </div>

                    {/* Card 2: Media */}
                    <div className="bg-surface-secondary p-8 rounded-3xl hover:shadow-lg transition-shadow duration-300">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                <Mic className="w-5 h-5 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-text-main font-display">Media</h3>
                        </div>
                        <p className="text-text-secondary leading-relaxed text-lg">
                            We orchestrate precision amplification across social platforms and beyond. Creator content drives <strong className="text-text-main">70% higher click-through rate</strong> than non-creator ads.
                        </p>
                    </div>

                    {/* Card 3: Commerce */}
                    <div className="bg-surface-secondary p-8 rounded-3xl hover:shadow-lg transition-shadow duration-300">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <ShoppingBag className="w-5 h-5 text-blue-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-text-main font-display">Commerce</h3>
                        </div>
                        <p className="text-text-secondary leading-relaxed text-lg">
                            We turn creator trust into measurable conversion. Creator-led content drives <strong className="text-text-main">3.3x higher ROI</strong> compared to digital ads.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ValueProps;
