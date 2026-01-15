import { BlogDetailPage } from "@/containers/BlogPage/BlogDetailPage"

type IProps = {
    params: Promise<{
        slug: string
    }>
}

const BlogDetailsPageComponent = async ({ params }: IProps) => {
    const { slug } = await params;
    return (
        <>
            <BlogDetailPage slug={slug} />
        </>
    )
}

export default BlogDetailsPageComponent