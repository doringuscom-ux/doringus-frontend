import { ArrowRight } from 'lucide-react';

const CTA = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">

            <div className="container mx-auto px-4 relative z-10 text-center">
                <div className="max-w-4xl mx-auto rounded-[2.5rem] bg-primary px-8 py-20 shadow-2xl shadow-primary/30 relative overflow-hidden">
                    {/* Subtle Background Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />

                    <h2 className="text-4xl lg:text-6xl font-bold font-display mb-6 leading-tight text-white relative z-10">
                        Turn Influence <br /> into Income
                    </h2>
                    <p className="text-xl text-white/90 mb-10 max-w-xl mx-auto relative z-10">
                        Join 15,000+ brands and 7.5L+ creators making magic happen. Start your journey today.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                        <button className="px-8 py-4 rounded-full bg-white text-primary font-bold text-lg hover:scale-105 transition-transform w-full sm:w-auto shadow-lg">
                            Join as Influencer
                        </button>
                        <button className="px-8 py-4 rounded-full bg-black/20 text-white border border-white/20 font-bold text-lg hover:bg-black/30 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center backdrop-blur-sm">
                            Launch a Campaign
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
