'use client'

import React from 'react'
import Image from 'next/image'

type IProps = {
    slug: string
}

export const BlogDetailPage = ({ slug }: IProps) => {
    // Dummy data for now (replace with CMS data later)
    const post = {
        title: "Building Responsive Web Design with Tailwind CSS",
        hero: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&h=800&fit=crop",
        author: {
            name: 'John Doe',
            avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=128&h=128&fit=crop',
            bio: 'Front-end developer, designer, and Tailwind enthusiast.',
        },
        content: `
            <p>This is a demo blog post content. You can replace this HTML with the actual content from your CMS (Sanity) when ready.</p>
            <h2>Why responsive design matters</h2>
            <p>Responsive design ensures interfaces work well on any screen size. Tailwind CSS makes it fast to iterate with utility classes.</p>
            <p>Use semantic HTML and accessible components for best results.</p>
        `,
        publishedAt: 'January 10, 2025',
    }

    return (
        <article className="bg-white animate-fadeIn">
            {/* Hero image */}
            <header className="w-full bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <div className="relative h-64 md:h-96">
                        <Image
                            src={post.hero}
                            alt={post.title}
                            fill
                            className="object-cover rounded-b-2xl shadow-lg"
                        />
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="prose prose-lg max-w-none dark:prose-invert">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        <span className="text-violet-600">{post.title}</span>
                    </h1>

                    {/* Author block */}
                    <div className="flex items-center gap-4 mt-6">
                        <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-violet-100">
                            <Image src={post.author.avatar} alt={post.author.name} width={56} height={56} className="object-cover" />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">{post.author.name}</p>
                            <p className="text-sm text-gray-600">{post.author.bio}</p>
                        </div>
                    </div>

                    {/* Content area */}
                    <section className="mt-8 space-y-6 leading-relaxed text-gray-700">
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </section>

                    {/* Published date */}
                    <footer className="mt-12 border-t pt-6">
                        <p className="text-sm text-gray-600">
                            Published on <span className="text-violet-600 font-medium">{post.publishedAt}</span>
                        </p>
                    </footer>
                </div>
            </main>
        </article>
    )
}

export default BlogDetailPage
