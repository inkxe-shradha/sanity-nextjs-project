'use client';

import React from 'react';
import Image from 'next/image';
import Button from '@/components/Button';

interface PortfolioItem {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
    technologies: string[];
}

const PortfolioPage: React.FC = () => {
    const portfolioItems: PortfolioItem[] = [
        {
            id: 1,
            title: 'E-Commerce Platform',
            category: 'Web Development',
            image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
            description: 'A full-featured e-commerce platform with payment integration and admin dashboard.',
            technologies: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Stripe'],
        },
        {
            id: 2,
            title: 'Mobile App Design',
            category: 'UI/UX Design',
            image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=300&fit=crop',
            description: 'Modern mobile app design with intuitive user interface and smooth interactions.',
            technologies: ['Figma', 'Adobe XD', 'Prototyping'],
        },
        {
            id: 3,
            title: 'Brand Identity System',
            category: 'Branding',
            image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop',
            description: 'Complete brand identity system including logo, colors, and typography guidelines.',
            technologies: ['Adobe Illustrator', 'Brand Strategy', 'Design System'],
        },
        {
            id: 4,
            title: 'Real Estate Portal',
            category: 'Web Development',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
            description: 'Interactive real estate listing platform with advanced search and filtering.',
            technologies: ['React', 'Firebase', 'Google Maps API', 'TypeScript'],
        },
        {
            id: 5,
            title: 'SaaS Dashboard',
            category: 'Web Development',
            image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
            description: 'Analytics dashboard for SaaS application with real-time data visualization.',
            technologies: ['Vue.js', 'Chart.js', 'Node.js', 'PostgreSQL'],
        },
        {
            id: 6,
            title: 'Content Management System',
            category: 'Web Development',
            image: 'https://images.unsplash.com/photo-1559523182-a975c3be65b7?w=400&h=300&fit=crop',
            description: 'Headless CMS with flexible content modeling and API-first architecture.',
            technologies: ['Node.js', 'GraphQL', 'MongoDB', 'React'],
        },
    ];

    const [selectedCategory, setSelectedCategory] = React.useState<string>('All');
    const categories = ['All', ...Array.from(new Set(portfolioItems.map((item) => item.category)))];

    const filteredItems =
        selectedCategory === 'All'
            ? portfolioItems
            : portfolioItems.filter((item) => item.category === selectedCategory);

    return (
        <div className="bg-white">
            {/* Page Header */}
            <section className="bg-linear-to-r from-violet-600 to-violet-800 text-white py-12 md:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">My Portfolio</h1>
                    <p className="text-lg md:text-xl text-violet-100">
                        A curated collection of projects showcasing my expertise and creativity
                    </p>
                </div>
            </section>

            {/* Filter Buttons */}
            <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full font-medium transition duration-300 ${selectedCategory === category
                                    ? 'bg-violet-600 text-white shadow-lg'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Portfolio Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer transform hover:-translate-y-2"
                            >
                                {/* Image Container */}
                                <div className="relative h-56 overflow-hidden bg-gray-200">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition duration-500"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-violet-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-6">
                                        <div className="text-white">
                                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                            <p className="text-sm text-violet-100 line-clamp-2">{item.description}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <p className="text-violet-600 font-semibold text-sm mb-2 uppercase tracking-wide">
                                        {item.category}
                                    </p>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {item.technologies.slice(0, 3).map((tech, index) => (
                                            <span
                                                key={index}
                                                className="text-xs bg-violet-100 text-violet-700 px-3 py-1 rounded-full"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {item.technologies.length > 3 && (
                                            <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                                                +{item.technologies.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    <Button variant="primary" size="sm" className="w-full text-center justify-center">
                                        View Project
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No Results Message */}
                    {filteredItems.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">No projects found in this category.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Blog Section */}
            <BlogSection />

            {/* CTA Section */}
            <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-violet-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
                    <p className="text-lg text-violet-100 mb-8">
                        Let's collaborate and bring your ideas to life. Get in touch with me today!
                    </p>
                    <Button variant="secondary" size="lg" className="text-center justify-center bg-white text-violet-600 hover:bg-violet-50 border-2 border-white">
                        Contact Me
                    </Button>
                </div>
            </section>
        </div>
    );
};

// Blog Section Component
interface BlogCard {
    id: number;
    title: string;
    excerpt: string;
    slug: string;
    date: string;
    image: string;
}

const BlogSection: React.FC = () => {
    const blogCards: BlogCard[] = [
        {
            id: 1,
            title: 'Building Responsive Web Design with Tailwind CSS',
            excerpt: 'Learn how to create responsive and beautiful web designs using Tailwind CSS utilities and best practices.',
            slug: 'responsive-tailwind',
            date: 'January 10, 2025',
            image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
        },
        {
            id: 2,
            title: 'Next.js 15: Latest Features and Improvements',
            excerpt: 'Explore the new features in Next.js 15 and how they can improve your development workflow.',
            slug: 'nextjs-15-features',
            date: 'January 8, 2025',
            image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=250&fit=crop',
        },
        {
            id: 3,
            title: 'TypeScript Best Practices for React Development',
            excerpt: 'Master TypeScript in React with practical examples and industry best practices.',
            slug: 'typescript-react',
            date: 'January 5, 2025',
            image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=250&fit=crop',
        },
    ];

    return (
        <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Blog Posts</h2>
                    <p className="text-gray-600 text-lg">
                        Insights and tips on web development, design, and technology trends
                    </p>
                </div>

                {/* Blog Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                    {blogCards.map((blog) => (
                        <article
                            key={blog.id}
                            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 group"
                        >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden bg-gray-200">
                                <Image
                                    src={blog.image}
                                    alt={blog.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition duration-500"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col h-full">
                                <p className="text-violet-600 text-sm font-semibold mb-2">{blog.date}</p>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-violet-600 transition">
                                    {blog.title}
                                </h3>
                                <p className="text-gray-600 mb-4 grow">{blog.excerpt}</p>

                                <Button variant="primary" size="sm" className="w-full text-center justify-center">
                                    Read More
                                </Button>
                            </div>
                        </article>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center">
                    <Button variant="primary" size="lg" className="text-center justify-center">
                        View All Blog Posts
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default PortfolioPage;
