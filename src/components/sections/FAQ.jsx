import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: "How does DO RING US work?",
        answer: "DO RING US connects brands with authentic creators. Brands can browse creators by category, view their portfolios and stats, and send inquiries directly. Creators can create profiles to showcase their work and manage collaborations."
    },
    {
        question: "How do I join as a creator?",
        answer: "Click on the 'Become a Creator' button in the header, fill out the registration form with your social media links and details. Our team will review your application and once approved, you'll be visible to brands."
    },
    {
        question: "Is there a fee to use the platform?",
        answer: "Joining DO RING US as a creator is currently free. Brands can browse and send inquiries for free as well. We may offer premium features and campaign management services in the future."
    },
    {
        question: "How are payments handled?",
        answer: "Currently, DO RING US facilitates the connection between brands and creators. Payment terms are negotiated directly between the brand and the creator through our inquiry system."
    },
    {
        question: "What types of creators are on the platform?",
        answer: "We have creators across various niches including Fashion, Travel, Tech, Beauty, Gaming, Food, and more. From micro-influencers to established personalities, we cater to all brand needs."
    }
];

const FAQItem = ({ question, answer, isOpen, onClick, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`border-b border-gray-100 last:border-0 ${isOpen ? 'bg-gray-50/50 rounded-3xl sm:-mx-6 sm:px-6' : 'px-0'}`}
        >
            <button
                onClick={onClick}
                className="w-full py-6 flex items-center justify-between text-left group"
            >
                <div className="flex items-center gap-4">
                    <span className="text-gray-300 font-bold font-display text-xl w-8">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className={`text-xl font-bold font-display transition-colors ${isOpen ? 'text-primary' : 'text-gray-900 group-hover:text-primary/80'}`}>
                        {question}
                    </span>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border ${isOpen ? 'bg-primary border-primary text-white rotate-180' : 'bg-white border-gray-200 text-gray-400 group-hover:border-primary group-hover:text-primary'}`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <p className="pb-8 pl-12 pr-4 text-gray-500 leading-relaxed text-lg">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="py-20 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Left Column: Header */}
                    <div className="lg:col-span-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="sticky top-32"
                        >
                            <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-4 py-2 rounded-full text-sm font-bold mb-8">
                                <HelpCircle className="w-4 h-4" />
                                <span>Support Center</span>
                            </div>
                            <h2 className="text-4xl lg:text-6xl font-black font-display text-gray-900 mb-6 tracking-tight leading-tight">
                                Got Questions? <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                                    We've Got Answers.
                                </span>
                            </h2>
                            <p className="text-gray-500 font-medium text-lg mb-10 leading-relaxed">
                                Everything you need to know about DO RING US. Can't find the answer you're looking for?
                            </p>
                            <a
                                href="mailto:support@doringus.com"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-primary transition-all hover:shadow-xl hover:-translate-y-1"
                            >
                                Contact Support
                            </a>
                        </motion.div>
                    </div>

                    {/* Right Column: Accordion */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-[2rem]">
                            {faqs.map((faq, index) => (
                                <FAQItem
                                    key={index}
                                    index={index}
                                    question={faq.question}
                                    answer={faq.answer}
                                    isOpen={openIndex === index}
                                    onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
