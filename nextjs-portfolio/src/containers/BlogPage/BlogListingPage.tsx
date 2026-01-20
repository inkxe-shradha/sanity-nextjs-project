'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import { BlogPost } from '@/models/BlogCardModel';
import { urlForImage } from '@/helpers/sanity.helper';

interface BlogPosts {
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

type BlogListingPageProps = {
  blogPost: BlogPost[];
};

const BlogListingPage = ({ blogPost }: BlogListingPageProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  console.log('Blog Page Data:', blogPost);

  const blogPosts = blogPost;

  const filteredPosts = blogPosts.filter(
    (post) =>
      post?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post?.metaDescription?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="bg-linear-to-r from-violet-600 to-violet-800 text-white py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-lg md:text-xl text-violet-100">
            Check out our latest articles, tutorials, and insights on web
            development, design, and more.
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
              className="w-full px-6 py-3 border-2 text-black border-gray-300 rounded-lg focus:border-violet-600 focus:outline-none transition duration-300"
            />
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts?.map((post) => (
              <article
                key={post._id}
                className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-gray-200">
                  <Image
                    src={urlForImage(post.blogImage)}
                    alt={post.blogImage?.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-violet-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Not specified
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta Information */}
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                    <span>
                      {new Date(post._createdAt).toLocaleDateString()}
                    </span>
                    <span>15 min read</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-violet-600 transition">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.metaDescription}
                  </p>

                  {/* Author */}
                  <p className="text-sm text-gray-500 mb-6">
                    By {post.author?.authorName?.name || 'Unknown Author'}
                  </p>

                  {/* Read More Button */}
                  <Button
                    variant="primary"
                    size="sm"
                    href={`/blog/${post.slug.current}`}
                    className="w-full text-center justify-center"
                  >
                    Read Article
                  </Button>
                </div>
              </article>
            ))}
          </div>

          {/* No Results Message */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No blog posts found. Try adjusting your search.
              </p>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Subscribe to My Newsletter
          </h2>
          <p className="text-lg text-violet-100 mb-8">
            Get the latest articles and insights delivered to your inbox every
            week.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none"
              required
            />
            <Button
              variant="secondary"
              size="lg"
              className="text-center justify-center bg-white text-violet-600 hover:bg-violet-50 border-2 border-white"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default BlogListingPage;
