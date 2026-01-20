import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Github, Mail } from 'lucide-react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { label: 'Home', href: '/' },
        { label: 'Portfolio', href: '/portfolio' },
        { label: 'Blogs', href: '/blog' },
        { label: 'Contact', href: '#contact' },
    ];

    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
        { icon: Github, href: '#', label: 'GitHub' },
        { icon: Mail, href: '#', label: 'Email' },
    ];

    return (
        <footer className="bg-violet-600 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Column 1: About */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Portfolio</h3>
                        <p className="text-violet-100">
                            Showcasing my projects, skills, and experiences in web development.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-violet-100 hover:text-white transition duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Social Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Follow Me</h3>
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        className="text-violet-100 hover:text-white transition duration-300 transform hover:scale-110"
                                        aria-label={social.label}
                                    >
                                        <Icon size={24} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-violet-500 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center text-violet-100 text-sm">
                        <p>&copy; {currentYear} Portfolio. All rights reserved.</p>
                        <div className="flex space-x-4 mt-4 md:mt-0">
                            <Link href="#" className="hover:text-white transition">
                                Privacy Policy
                            </Link>
                            <span>|</span>
                            <Link href="#" className="hover:text-white transition">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
