import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ExternalLink } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Main Footer Content */}
                <div className="flex flex-col items-center space-y-12">
                    {/* Social Links */}
                    <div className="text-center space-y-6">
                        <h3 className="text-2xl font-bold text-white">Connect With Us</h3>
                        <div className="flex space-x-6">
                            {/* whatsapp */}
                            <a
                                href="https://wa.me/919875763585"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/5 p-3 rounded-lg hover:bg-white/10 hover:scale-110 transition-all duration-300"
                                aria-label="WhatsApp"
                            >
                                <Phone className="w-7 h-7 text-white" />
                            </a>
                            <a
                                href="https://www.facebook.com/gajanand.bhardwaz/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/5 p-3 rounded-lg hover:bg-white/10 hover:scale-110 transition-all duration-300"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-7 h-7 text-white" />
                            </a>
                            <a
                                href="https://twitter.com/const_gaju91"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/5 p-3 rounded-lg hover:bg-white/10 hover:scale-110 transition-all duration-300"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-7 h-7 text-white" />
                            </a>
                            <a
                                href="https://instagram.com/pragatidigital.life"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/5 p-3 rounded-lg hover:bg-white/10 hover:scale-110 transition-all duration-300"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-7 h-7 text-white" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/gajuhere/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/5 p-3 rounded-lg hover:bg-white/10 hover:scale-110 transition-all duration-300"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-7 h-7 text-white" />
                            </a>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="text-center space-y-6">
                        <h3 className="text-2xl font-bold text-white">Contact Us</h3>
                        <div className="space-y-4">
                            <a
                                href="mailto:hello@pragatidigital.com"
                                className="flex items-center justify-center text-gray-400 hover:text-white transition-colors text-lg"
                            >
                                <Mail className="w-5 h-5 mr-2" />
                                business@pragatidigital.com
                            </a>
                            <a
                                href="tel:+15551234567"
                                className="flex items-center justify-center text-gray-400 hover:text-white transition-colors text-lg"
                            >
                                <Phone className="w-5 h-5 mr-2" />
                                +91 9875763585
                            </a>
                            <a
                                href="https://maps.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center text-gray-400 hover:text-white transition-colors group text-lg"
                            >
                                <MapPin className="w-5 h-5 mr-2" />
                                <span>
                                    Opp. Powerhouse, Ajmer Road, Bherunda, Nagaur, Rajasthan, India 341031
                                </span>
                                <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-white/10 text-center">
                    <div className="text-gray-400 text-sm">
                        ©{currentYear} Pragati Digital. All Rights Reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}