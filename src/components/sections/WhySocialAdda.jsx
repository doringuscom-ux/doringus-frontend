import { ShieldCheck, Zap, BarChart3, Users, ArrowUpRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const dashboardImg = 'https://img.freepik.com/free-vector/flat-illustration-social-media-day-celebration_23-2150340638.jpg?t=st=1769234778~exp=1769238378~hmac=40fb7be034c491f4ffe05e58833e384f6a44b4d67b606ee81d0246846f783b25&w=1060';

const features = [
    {
        icon: Users,
        title: "Vetted Creators",
        desc: "Access a curated network of authentic influencers with verified engagement metrics.",
        color: "text-blue-500",
        bg: "bg-blue-50"
    },
    {
        icon: BarChart3,
        title: "Real-Time ROI",
        desc: "Track every click, conversion, and rupee spent with our advanced analytics dashboard.",
        color: "text-emerald-500",
        bg: "bg-emerald-50"
    },
    {
        icon: ShieldCheck,
        title: "Secure Payments",
        desc: "Automated payouts and escrow services ensure safety for both brands and creators.",
        color: "text-purple-500",
        bg: "bg-purple-50"
    },
    {
        icon: Zap,
        title: "Fast Campaigns",
        desc: "Launch campaigns in minutes, not days. Streamlined workflow from brief to content.",
        color: "text-orange-500",
        bg: "bg-orange-50"
    }
];

const WhyDoringus = () => {
    return (
        <section className="py-20 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8">

                {/* Top Section: Image + Content */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 rounded-[2.5rem] blur-3xl -z-10" />
                        <img
                            src={dashboardImg}
                            alt="Doringus Dashboard"
                            className="rounded-[2.5rem] shadow-2xl border border-gray-100 w-full transform hover:scale-[1.02] transition-transform duration-700"
                        />
                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 hidden md:block">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <BarChart3 className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Campaign Growth</p>
                                    <p className="text-2xl font-black text-gray-900">+127%</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-primary font-black uppercase tracking-[0.2em] text-sm mb-4 block">
                            Doringus Understands
                        </span>
                        <h2 className="text-4xl lg:text-6xl font-black font-display text-gray-900 mb-8 leading-tight">
                            Smart Brands Choose <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Intelligent Impact.</span>
                        </h2>

                        <p className="text-gray-500 text-xl font-medium leading-relaxed mb-8">
                            We don't just connect you; we understand your business goals. Doringus is built on the philosophy that influencer marketing should be measurable, scalable, and transparent.
                        </p>

                        <div className="space-y-4 mb-10">
                            {[
                                "Data-driven creator matching based on audience demographics.",
                                "Automated workflow management from contract to payment.",
                                "Real-time performance tracking with detailed analytics."
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <Check className="w-3.5 h-3.5 text-primary" />
                                    </div>
                                    <span className="text-gray-700 font-semibold">{item}</span>
                                </div>
                            ))}
                        </div>

                        <button className="px-8 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-300">
                            Discover the Difference
                        </button>
                    </motion.div>
                </div>

                {/* Bottom Section: Feature Grid */}
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-black text-gray-900">Everything you need to scale</h3>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-gray-50 p-8 rounded-[2rem] hover:bg-white border border-transparent hover:border-gray-100 shadow-sm hover:shadow-xl transition-all group cursor-default"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon className={`w-7 h-7 ${feature.color}`} />
                            </div>
                            <h3 className="text-xl font-black font-display text-gray-900 mb-4 flex items-center justify-between">
                                {feature.title}
                                <ArrowUpRight className="w-5 h-5 text-gray-300 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
                            </h3>
                            <p className="text-gray-500 leading-relaxed font-medium">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyDoringus;
