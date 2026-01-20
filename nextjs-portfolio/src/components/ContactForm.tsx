'use client';

import React, { useState } from 'react';
import Button from './Button';

interface FormData {
    name: string;
    email: string;
    message: string;
}

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Simulate form submission
            await new Promise((resolve) => setTimeout(resolve, 1000));

            console.log('Form submitted:', formData);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });

            // Reset success message after 3 seconds
            setTimeout(() => setSubmitStatus('idle'), 3000);
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="bg-white py-12 md:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
                    <p className="text-gray-600 text-lg">
                        Have a project in mind? Let's work together and create something amazing.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-violet-600 focus:outline-none transition duration-300"
                            placeholder="Your name"
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-violet-600 focus:outline-none transition duration-300"
                            placeholder="your.email@example.com"
                        />
                    </div>

                    {/* Message Field */}
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={6}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-violet-600 focus:outline-none transition duration-300 resize-none"
                            placeholder="Your message here..."
                        />
                    </div>

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-green-800 font-medium">
                                ✓ Thank you! I'll get back to you soon.
                            </p>
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-800 font-medium">
                                ✗ Something went wrong. Please try again.
                            </p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        size="lg"
                        variant="primary"
                        disabled={isSubmitting}
                        className="w-full"
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default ContactForm;
