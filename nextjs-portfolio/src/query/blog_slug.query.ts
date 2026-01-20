export const BLOG_SLUG_QUERY = `*[_type == "blog" && defined(slug.current)]{
    slug {
        current
    }
}`;
export default BLOG_SLUG_QUERY;
