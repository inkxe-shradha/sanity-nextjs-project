import { BlogPost } from '@/models/BlogCardModel';
import Button from '../Button';
import BlogCards from './BlogCards';

type IProps = {
  listData?: BlogPost[];
};

const BlogListComponent = ({ listData }: IProps) => {
  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Latest Blog Posts
        </h2>
      </div>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3 mb-10">
        {/* Example blog post cards */}
        {listData?.map((post) => (
          <BlogCards key={post._id} {...post} />
        ))}
      </div>
      <div className="text-center">
        <Button
          variant="primary"
          size="lg"
          href="/blog"
          className="text-center justify-center"
        >
          View more posts
        </Button>
      </div>
    </div>
  );
};

export default BlogListComponent;
