import BlogListingPage from '@/containers/BlogPage/BlogListingPage';
import { BlogPost } from '@/models/BlogCardModel';
import BLOG_LIST_QUERY from '@/query/blog_list.query';
import client from '@/sanity/client';
import { SanityDocument } from 'next-sanity';

const BlogListingPageComponent = async () => {
  const blogData =
    await client.fetch<SanityDocument<BlogPost>[]>(BLOG_LIST_QUERY);
  return (
    <>
      <BlogListingPage blogPost={blogData} />
    </>
  );
};

export default BlogListingPageComponent;
