import { Facebook, Twitter, Instagram, Linkedin, Mail, ArrowUpRight, Heart, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const FooterLink = ({ href, children }) => (
    <li>
        <a
            href={href}
            className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
            <span className="relative overflow-hidden">
                <span className="block transition-transform group-hover:-translate-y-full">{children}</span>
                <span className="absolute top-0 left-0 block transition-transform translate-y-full group-hover:translate-y-0 text-primary">
                    {children}
                </span>
            </span>
            <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
        </a>
    </li>
);

const SocialIcon = ({ Icon }) => (
    <motion.a
        href="#"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white hover:bg-primary hover:shadow-lg hover:shadow-primary/30 transition-all"
    >
        <Icon className="w-5 h-5" />
    </motion.a>
);

const Footer = () => {
    return (
        <footer className="bg-[#050505] text-white pt-32 pb-12 relative overflow-hidden border-t border-white/5">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
            <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-12 gap-16 mb-24">
                    {/* Brand Section */}
                    <div className="md:col-span-5 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <a href="/" className="flex items-center gap-2 mb-8 group">
                                <Zap className="w-10 h-10 fill-primary text-primary transition-transform group-hover:scale-110 group-hover:rotate-12" />
                                <span className="text-3xl font-black tracking-tighter italic uppercase text-white">DO RING US</span>
                            </a>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                                The leading marketplace for the modern creator economy. We bridge the gap between visionary brands and authentic voices to create impactful digital experiences.
                            </p>
                        </motion.div>

                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <SocialIcon key={i} Icon={Icon} />
                            ))}
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div className="md:col-span-2">
                        <h4 className="font-bold text-lg mb-8 text-white">Platform</h4>
                        <ul className="space-y-4">
                            <FooterLink href="#">Browse Creators</FooterLink>
                            <FooterLink href="#">How it Works</FooterLink>
                            <FooterLink href="#">Pricing</FooterLink>
                            <FooterLink href="#">Success Stories</FooterLink>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div className="md:col-span-2">
                        <h4 className="font-bold text-lg mb-8 text-white">Company</h4>
                        <ul className="space-y-4">
                            <FooterLink href="#">About Us</FooterLink>
                            <FooterLink href="#">Careers</FooterLink>
                            <FooterLink href="#">Blog</FooterLink>
                            <FooterLink href="#">Contact</FooterLink>
                            <FooterLink href="#">Press Kit</FooterLink>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="md:col-span-3">
                        <h4 className="font-bold text-lg mb-8 text-white">Stay Updated</h4>
                        <p className="text-gray-400 mb-6 text-sm">
                            Join 15,000+ creators and brands getting our weekly insights.
                        </p>
                        <form className="relative group">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-sm font-medium"
                            />
                            <button className="absolute right-2 top-2 bottom-2 bg-primary text-white p-3 rounded-xl hover:scale-105 transition-transform shadow-lg shadow-primary/25">
                                <Mail className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-6">
                    <p className="font-medium flex items-center gap-2">
                        &copy; 2026 DO RING US Inc. Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> in India.
                    </p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
