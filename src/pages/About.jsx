import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Target, Heart, Zap, Globe, Users, ShieldCheck } from 'lucide-react';

const About = () => {
    return (
        <div className="bg-white min-h-screen">
            <Navbar />

            <main className="pt-24 pb-20 overflow-x-hidden">
                {/* Hero Section */}
                <section className="relative py-24 bg-surface-secondary overflow-hidden">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3" />

                    <div className="container mx-auto px-4 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-4xl mx-auto text-center"
                        >
                            <span className="text-primary font-black uppercase tracking-[0.2em] text-sm mb-6 block">
                                Who We Are
                            </span>
                            <h1 className="text-5xl lg:text-7xl font-black font-display text-gray-900 mb-8 tracking-tighter leading-none">
                                We are the <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                                    Operating System for Influence.
                                </span>
                            </h1>
                            <p className="text-xl lg:text-2xl text-text-secondary leading-relaxed font-medium max-w-2xl mx-auto">
                                Doringus allows brands to scale their creator marketing by automating discovery, management, and measurement.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Our Mission */}
                <section className="py-24 bg-white relative">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] lg:aspect-square">
                                    <img
                                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
                                        alt="Team collaboration"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-8 left-8 text-white">
                                        <p className="font-black text-3xl mb-2">Our Mission</p>
                                        <p className="text-lg opacity-90">To democratize influence.</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-4xl lg:text-5xl font-black font-display text-gray-900 mb-8">
                                    Bridging the gap between <br />
                                    <span className="text-purple-600">Creativity & Commerce.</span>
                                </h2>
                                <p className="text-lg text-gray-500 mb-6 leading-relaxed">
                                    We believe that every brand has a story, and the best people to tell that story are those who have lived it. We are building the infrastructure that powers the next generation of marketing.
                                </p>
                                <p className="text-lg text-gray-500 mb-10 leading-relaxed">
                                    Founded in 2024, Doringus started with a simple question: "How can we make it easier for brands to find the right voices?" Today, we work with over 15,000 brands and 7.5 Lakh influencers across the globe.
                                </p>

                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-4xl font-black text-gray-900 mb-2">15K+</h3>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Global Brands</p>
                                    </div>
                                    <div>
                                        <h3 className="text-4xl font-black text-gray-900 mb-2">₹2B+</h3>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Creator Earnings</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Values Grid */}
                <section className="py-24 bg-gray-50">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl lg:text-5xl font-black font-display text-gray-900">Our Core Values</h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Target,
                                    title: "Impact First",
                                    desc: "We focus on real results. Vanity metrics don't matter if they don't drive growth."
                                },
                                {
                                    icon: Heart,
                                    title: "Authenticity",
                                    desc: "We prioritize genuine connections. Authentic content performs better, always."
                                },
                                {
                                    icon: Zap,
                                    title: "Speed & Scale",
                                    desc: "We move fast. Our technology allows campaigns to launch in minutes, not weeks."
                                }
                            ].map((value, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8">
                                        <value.icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 mb-4">{value.title}</h3>
                                    <p className="text-gray-500 leading-relaxed font-medium">
                                        {value.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team / Story */}
                <section className="py-24 bg-white overflow-hidden">
                    <div className="container mx-auto px-4 lg:px-8 text-center">
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gray-900 text-white font-bold uppercase tracking-widest text-sm mb-8"
                            >
                                <Globe className="w-4 h-4" />
                                <span>Global Reach</span>
                            </motion.div>
                            <h2 className="text-4xl lg:text-6xl font-black font-display text-gray-900 mb-8">
                                Built for the future of <br />
                                the <span className="text-primary italic">Creator Economy</span>.
                            </h2>
                            <p className="text-xl text-gray-500 mb-12">
                                Headquarters in Mumbai. Operations in London & New York.
                            </p>

                            <img
                                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2000&auto=format&fit=crop"
                                alt="Office"
                                className="w-full h-[400px] object-cover rounded-[3rem] shadow-2xl"
                            />
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default About;
