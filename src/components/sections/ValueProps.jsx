import { Zap, BarChart2, ShoppingCart, ArrowRight, Layers, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const ValueProps = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Subtle Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-gray-50/50 to-transparent -z-10" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-4 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-20 max-w-5xl mx-auto">


                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl lg:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight mb-6"
                    >
                        We turn creator influence into <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">measurable business growth.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed"
                    >
                        Stop guessing. Start growing. Our full-stack platform bridges the gap between raw creativity and hard ROI.
                    </motion.p>
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ y: -8 }}
                        className="group bg-white rounded-[2rem] p-3 border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                    >
                        <div className="relative h-56 rounded-[1.5rem] overflow-hidden mb-6">
                            <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-gray-900/0 transition-colors duration-500 z-10" />
                            <img
                                src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop"
                                alt="Creative Strategy"
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                                <Layers className="w-4 h-4 text-primary" />
                                <span className="text-xs font-bold text-gray-900">Strategy</span>
                            </div>
                        </div>
                        <div className="px-3 pb-4">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">Creative Engineering</h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                We analyze cultural trends to craft campaigns that don't just reach audiences—they resonate.
                                <strong className="block mt-2 text-gray-900">92% higher engagement rate.</strong>
                            </p>
                            <div className="flex items-center text-primary font-bold text-sm">
                                <span>Explore Strategy</span>
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ y: -8 }}
                        className="group bg-white rounded-[2rem] p-3 border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:shadow-purple-500/5 transition-all duration-500"
                    >
                        <div className="relative h-56 rounded-[1.5rem] overflow-hidden mb-6">
                            <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-gray-900/0 transition-colors duration-500 z-10" />
                            <img
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
                                alt="Data Analytics"
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                                <BarChart2 className="w-4 h-4 text-purple-600" />
                                <span className="text-xs font-bold text-gray-900">Analytics</span>
                            </div>
                        </div>
                        <div className="px-3 pb-4">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">Intelligent Media</h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                Proprietary algorithms match your brand with creators who scientifically share your target demographic.
                                <strong className="block mt-2 text-gray-900">Real-time full transparency.</strong>
                            </p>
                            <div className="flex items-center text-purple-600 font-bold text-sm">
                                <span>View Analytics</span>
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        whileHover={{ y: -8 }}
                        className="group bg-white rounded-[2rem] p-3 border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500"
                    >
                        <div className="relative h-56 rounded-[1.5rem] overflow-hidden mb-6">
                            <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-gray-900/0 transition-colors duration-500 z-10" />
                            <img
                                src="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=800&auto=format&fit=crop"
                                alt="Social Commerce"
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                                <ShoppingCart className="w-4 h-4 text-blue-600" />
                                <span className="text-xs font-bold text-gray-900">Commerce</span>
                            </div>
                        </div>
                        <div className="px-3 pb-4">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Seamless Commerce</h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                Transform engagement into checkout. Native shopping features to drive sales directly from content.
                                <strong className="block mt-2 text-gray-900">Average 4.2x ROAS.</strong>
                            </p>
                            <div className="flex items-center text-blue-600 font-bold text-sm">
                                <span>Drive Sales</span>
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ValueProps;
