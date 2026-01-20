import { BlogDetailPage } from '@/containers/BlogPage/BlogDetailPage';
import { BlogPost } from '@/models/BlogCardModel';
import { BLOG_DETAILS_QUERY } from '@/query/blog_details.query';
import BLOG_SLUG_QUERY from '@/query/blog_slug.query';
import client, { options } from '@/sanity/client';
import { SanityDocument } from 'next-sanity';
import { notFound } from 'next/navigation';

type IProps = {
  params: Promise<{
    slug: string;
  }>;
};

const BlogDetailsPageComponent = async ({ params }: IProps) => {
  const { slug } = await params;
  console.log('Fetching blog details for slug:', slug);
  const blogDetails = await client.fetch<SanityDocument<BlogPost>>(
    BLOG_DETAILS_QUERY,
    { slug },
    options
  );
  if (!blogDetails) {
    return notFound();
  }
  return (
    <>
      <BlogDetailPage slug={slug} blogDetails={blogDetails} />
    </>
  );
};

// generate slug
export async function generateStaticParams() {
  const blogs = await client.fetch<SanityDocument[]>(BLOG_SLUG_QUERY);
  return blogs.map((blog) => ({
    slug: blog.slug.current,
  }));
}

export default BlogDetailsPageComponent;
