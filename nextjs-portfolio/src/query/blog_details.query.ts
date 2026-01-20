export const BLOG_DETAILS_QUERY = `*[_type == "blog" && slug.current == $slug][0]{
    _id,
    title,
    metaDescription,
    blogImage {
        alt,
        asset->{_ref, url}
    },
    _createdAt,
    author {
        "authorName": authorName -> {
            name,
            biography,
            profileImage {
                alt,
                asset->{_ref, url}
            }
        }
    },
    content
}`;
