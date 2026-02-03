import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Target, Zap, Briefcase, Award, TrendingUp, Heart, Star, Rocket, CheckCircle2 } from 'lucide-react';

const About = () => {
    return (
        <div className="bg-black min-h-screen text-white">
            <Navbar darkMode={true} />

            <main className="pt-32 pb-24 overflow-hidden">
                {/* Hero Section */}
                <section className="relative py-24 px-4 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] -z-10 translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] -z-10 -translate-x-1/3 translate-y-1/3" />

                    <div className="container mx-auto max-w-6xl">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-6">
                                    Established Vision
                                </span>
                                <h1 className="text-6xl lg:text-8xl font-black mb-8 tracking-tighter leading-none italic uppercase">
                                    About <br />
                                    <span className="text-primary italic flex items-center gap-3">
                                        <Zap className="w-12 h-12 lg:w-16 lg:h-16 fill-primary" />
                                        DO RING US
                                    </span>
                                </h1>
                                <p className="text-xl text-gray-400 font-bold leading-relaxed mb-8 tracking-wide">
                                    A movement towards fair opportunities, creative freedom, and sustainable digital growth.
                                </p>
                                <p className="text-lg text-gray-500 leading-relaxed max-w-xl">
                                    DO RING US is a dedicated creator collaboration and promotion platform designed to connect UGC Creators, Influencers and Celebrities with brands that value authentic storytelling and impactful digital presence.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1 }}
                                className="relative lg:p-12"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-[3rem] blur-3xl -z-10" />
                                <div className="aspect-square rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative shadow-primary/20">
                                    <img
                                        src="/assets/creators.png"
                                        alt="Creator Energy"
                                        className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                    <div className="absolute bottom-10 left-10">
                                        <p className="text-3xl font-black italic uppercase tracking-tighter">Empowering Talent</p>
                                        <p className="text-primary font-bold">Showcase. Grow. Earn.</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Parent Company Section */}
                <section className="py-24 px-4 bg-zinc-950">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid lg:grid-cols-2 gap-20 items-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="order-2 lg:order-1"
                            >
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/5">
                                        <img src="/assets/office-Digital ORRA.jpg" className="w-full h-full object-cover opacity-60" />
                                    </div>
                                    <div className="aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/5 translate-y-12">
                                        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-60" />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="order-1 lg:order-2"
                            >
                                <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">Our Heritage</span>
                                <h2 className="text-4xl lg:text-5xl font-black mb-8 italic uppercase tracking-tighter">The&nbsp;&nbsp;Legacy of <br /><span className="text-primary">Digital ORRA</span></h2>
                                <p className="text-gray-400 font-medium text-lg leading-relaxed mb-8">
                                    DO RING US is a proud unit of <span className="text-white font-bold">Digital ORRA</span>, a well-established digital marketing company with over <span className="text-primary font-black">20+ years</span> of industry experience.
                                </p>
                                <div className="space-y-4">
                                    {[
                                        "Search Engine Optimization (SEO)",
                                        "Social Media Marketing & Management",
                                        "Google Ads & Meta (Facebook & Instagram) Ads",
                                        "Website Design & Development",
                                        "Graphic Designing & Business Consultancy"


                                    ].map((service, i) => (
                                        <div key={i} className="flex items-center gap-4 text-gray-500 hover:text-white transition-colors group">
                                            <div className="w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
                                            <span className="font-bold text-sm uppercase tracking-widest">{service}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Aim & Objectives */}
                <section className="py-32 px-4 relative overflow-hidden">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-24">
                            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">Purpose & Goal</span>
                            <h2 className="text-5xl lg:text-7xl font-black italic uppercase tracking-tighter mb-8">Our&nbsp;&nbsp; Aim & <span className="text-primary italic">Objectives.</span></h2>
                            <div className="max-w-3xl mx-auto p-12 rounded-[3.5rem] bg-gradient-to-br from-zinc-900 to-black border border-white/5 relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <Target className="w-24 h-24 text-primary" />
                                </div>
                                <h3 className="text-primary font-black uppercase tracking-widest text-sm mb-6">The Collective Aim</h3>
                                <p className="text-2xl font-bold text-white leading-tight italic">
                                    "To create an inclusive and reliable platform where everyone can earn by showcasing their talent, creativity, and influence — regardless of their follower count or background."
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { icon: Trophy, title: "Monetization", desc: "Providing UGC creators and influencers a platform to grow and monetize their talent." },
                                { icon: TrendingUp, title: "Impact", desc: "Helping brands collaborate with the right creators for authentic and impactful promotions." },
                                { icon: Zap, title: "Originality", desc: "Encouraging creativity, originality, and consistency in digital content." },
                                { icon: Star, title: "Value Skill", desc: "Creating earning opportunities for individuals by valuing skill over numbers." },
                                { icon: Heart, title: "Transparency", desc: "Building long-term, transparent, and growth-oriented relationships." },
                                { icon: Rocket, title: "Movement", desc: "Driving fair opportunities and creative freedom in the global economy." }
                            ].map((obj, i) => {
                                const IconComp = obj.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-10 rounded-[2.5rem] bg-zinc-950 border border-white/5 hover:border-primary/30 transition-all group"
                                    >
                                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-black transition-all">
                                            <IconComp className="w-6 h-6" />
                                        </div>
                                        <h4 className="text-xl font-black uppercase tracking-tighter mb-4 italic italic">{obj.title}</h4>
                                        <p className="text-gray-500 font-medium leading-relaxed italic">{obj.desc}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Beliefs Section */}
                <section className="py-24 px-4 bg-zinc-900 relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 blur-[150px] pointer-events-none" />
                    <div className="container mx-auto max-w-4xl text-center relative z-10">
                        <h2 className="text-white text-5xl lg:text-7xl font-black italic uppercase tracking-tighter mb-10">
                            What&nbsp; We &nbsp;<span className="text-primary underline decoration-primary/30 underline-offset-8">Believe &nbsp; In</span>
                        </h2>
                        <p className="text-gray-400 text-xl font-medium leading-relaxed uppercase tracking-wide mb-12 max-w-3xl mx-auto">
                            Every creator has a story, a skill, and a unique voice — our role is to amplify it. With the strategic strength of Digital ORRA and the energy of the community, we are more than just a platform — it’s a movement.
                        </p>
                        <button className="px-12 py-5 bg-primary text-white rounded-full font-black uppercase tracking-[0.2em] hover:scale-105 hover:bg-primary/90 transition-all flex items-center gap-4 mx-auto shadow-xl shadow-primary/20">
                            Join the Community <Rocket className="w-5 h-5" />
                        </button>
                    </div>
                </section>
            </main>

            <Footer darkMode={true} />
        </div>
    );
};

const Trophy = (props) => <Award {...props} />;

export default About;
