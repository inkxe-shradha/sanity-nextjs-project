'use client';

import Image from 'next/image';
import { BlogPost } from '@/models/BlogCardModel';
import { PortableText, SanityDocument } from 'next-sanity';
import { urlForImage } from '@/helpers/sanity.helper';
import { dateOnlyFormatter } from '@/helpers/date.helper';
import Link from 'next/link';
import { ArrowBigLeft, Backpack } from 'lucide-react';

type IProps = {
  slug: string;
  blogDetails: SanityDocument<BlogPost>;
};

export const BlogDetailPage = ({ slug, blogDetails }: IProps) => {
  const { title, blogImage, content, author, _createdAt } = blogDetails;
  const blogImageURL = urlForImage(blogImage);
  const authorImageURL = author?.authorName?.profileImage
    ? urlForImage(author.authorName.profileImage)
    : '';

  return (
    <article className="bg-white animate-fadeIn">
      {/* Hero image */}
      <header className="w-full bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="relative h-64 md:h-96">
            <Image
              src={blogImageURL}
              alt={blogImage.alt}
              fill
              className="object-cover rounded-b-2xl shadow-lg"
            />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              <span className="text-violet-600">{title}</span>
            </h1>
            {/* Back to list page */}
            <Link
              href="/blog"
              className="text-violet-600 flex font-semibold items-center hover:underline"
            >
              <ArrowBigLeft /> Back to Blog
            </Link>
          </div>

          {/* Author block */}
          <div className="flex items-center gap-4 mt-6">
            <div className="w-14 h-14 rounded-full relative overflow-hidden ring-2 ring-violet-100">
              <Image
                src={authorImageURL}
                alt={author?.authorName?.name ?? 'Unknown Author'}
                fill
                className="object-cover w-14 h-14"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {author?.authorName?.name ?? 'Unknown Author'}
              </p>
              <p className="text-sm text-gray-600">
                {author?.authorName.biography ?? 'Developer'}
              </p>
            </div>
          </div>

          {/* Content area */}
          <section className="mt-8 space-y-6 leading-relaxed text-gray-700">
            <PortableText value={content} />
          </section>

          {/* Published date */}
          <footer className="mt-12 border-t pt-6">
            <p className="text-sm text-gray-600">
              Published on{' '}
              <span className="text-violet-600 font-medium">
                {/* January 10, 2025 */}
                {dateOnlyFormatter(_createdAt)}
              </span>
            </p>
          </footer>
        </div>
      </main>
    </article>
  );
};

export default BlogDetailPage;
