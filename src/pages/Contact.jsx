import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-5xl font-bold text-center mb-4">
                    Get in <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Touch</span>
                </h1>
                <p className="text-xl text-gray-600 text-center mb-12">We'd love to hear from you</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-4">
                                <Mail className="w-6 h-6 text-purple-600 mt-1" />
                                <div>
                                    <p className="font-medium text-gray-900">Email</p>
                                    <a href="mailto:contact@doringus.com" className="text-gray-600 hover:text-purple-600">
                                        contact@doringus.com
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <Phone className="w-6 h-6 text-purple-600 mt-1" />
                                <div>
                                    <p className="font-medium text-gray-900">Phone</p>
                                    <a href="tel:+15551234567" className="text-gray-600 hover:text-purple-600">
                                        +1 (555) 123-4567
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <MapPin className="w-6 h-6 text-purple-600 mt-1" />
                                <div>
                                    <p className="font-medium text-gray-900">Address</p>
                                    <p className="text-gray-600">123 Marketing St, Digital City, DC 12345</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-600 focus:outline-none"
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-600 focus:outline-none"
                            />
                            <textarea
                                rows="4"
                                placeholder="Your Message"
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-600 focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-full font-semibold hover:shadow-xl transition-all"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
