export const BLOG_LIST_QUERY = `*[_type == "blog"] {
    _id,
    title,
    metaDescription,
    blogImage {
        alt,
        asset->{_ref, url}
    },
    slug {
        current
    },
    _createdAt,
    author {
        "authorName": authorName -> {
            name
        }
    }
}[0...2]`;

export default BLOG_LIST_QUERY;
