'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    slug: string;
    date: string;
    author: string;
    category: string;
    image: string;
    readTime: number;
}

const BlogListingPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const blogPosts: BlogPost[] = [
        {
            id: 1,
            title: 'Building Responsive Web Design with Tailwind CSS',
            excerpt: 'Learn how to create responsive and beautiful web designs using Tailwind CSS utilities.',
            content: 'Complete guide to responsive web design...',
            slug: 'responsive-tailwind',
            date: 'January 10, 2025',
            author: 'John Doe',
            category: 'Tutorial',
            image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop',
            readTime: 8,
        },
        {
            id: 2,
            title: 'Next.js 15: Latest Features and Improvements',
            excerpt: 'Explore the new features in Next.js 15 and how they can improve your workflow.',
            content: 'Deep dive into Next.js 15 features...',
            slug: 'nextjs-15-features',
            date: 'January 8, 2025',
            author: 'Jane Smith',
            category: 'Framework',
            image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&h=400&fit=crop',
            readTime: 10,
        },
        {
            id: 3,
            title: 'TypeScript Best Practices for React Development',
            excerpt: 'Master TypeScript in React with practical examples and industry best practices.',
            content: 'TypeScript tips for React developers...',
            slug: 'typescript-react',
            date: 'January 5, 2025',
            author: 'John Doe',
            category: 'Best Practices',
            image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=400&fit=crop',
            readTime: 12,
        },
        {
            id: 4,
            title: 'Web Performance Optimization Tips',
            excerpt: 'Discover techniques to optimize your website for better performance and user experience.',
            content: 'Performance optimization strategies...',
            slug: 'web-performance',
            date: 'January 1, 2025',
            author: 'Mike Johnson',
            category: 'Performance',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
            readTime: 7,
        },
    ];

    const filteredPosts = blogPosts.filter(
        (post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white">
            {/* Page Header */}
            <section className="bg-linear-to-r from-violet-600 to-violet-800 text-white py-12 md:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
                    <p className="text-lg md:text-xl text-violet-100">
                        Articles, tutorials, and insights on web development and technology
                    </p>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Search Bar */}
                    <div className="mb-10">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg focus:border-violet-600 focus:outline-none transition duration-300"
                        />
                    </div>

                    {/* Blog Posts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredPosts.map((post) => (
                            <article
                                key={post.id}
                                className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2 cursor-pointer"
                            >
                                {/* Image */}
                                <div className="relative h-64 overflow-hidden bg-gray-200">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition duration-500"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-violet-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    {/* Meta Information */}
                                    <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                                        <span>{post.date}</span>
                                        <span>{post.readTime} min read</span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-violet-600 transition">
                                        {post.title}
                                    </h2>

                                    {/* Excerpt */}
                                    <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>

                                    {/* Author */}
                                    <p className="text-sm text-gray-500 mb-6">By {post.author}</p>

                                    {/* Read More Button */}
                                    <Button variant="primary" size="sm" className="w-full text-center justify-center">
                                        Read Article
                                    </Button>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* No Results Message */}
                    {filteredPosts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">No blog posts found. Try adjusting your search.</p>
                        </div>
                    )}

                    {/* Results Count */}
                    {filteredPosts.length > 0 && (
                        <div className="text-center mt-10 text-gray-600">
                            Showing {filteredPosts.length} of {blogPosts.length} articles
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-violet-600 text-white">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Subscribe to My Newsletter</h2>
                    <p className="text-lg text-violet-100 mb-8">
                        Get the latest articles and insights delivered to your inbox every week.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none"
                            required
                        />
                        <Button variant="secondary" size="lg" className="text-center justify-center bg-white text-violet-600 hover:bg-violet-50 border-2 border-white">
                            Subscribe
                        </Button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default BlogListingPage;