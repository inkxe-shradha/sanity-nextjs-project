import { urlForImage } from '@/helpers/sanity.helper';
import Image from 'next/image';
import Link from 'next/link';

type IProps = {
  title: string;
  metaDescription: string;
  blogImage: {
    alt: string;
    asset: { _ref: string };
  };
  slug: {
    current: string;
  };
};

const BlogCards = ({ title, metaDescription, blogImage, slug }: IProps) => {
  const postImage = urlForImage(blogImage);
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 ">
        <Image
          src={postImage}
          alt={blogImage.alt}
          width={400}
          height={256}
          className="object-cover w-full h-64 max-h-64 group-hover:scale-110 transition duration-500"
        />
        <h3 className="text-xl font-bold my-5 text-black">{title}</h3>
        <p className="text-gray-700 my-4">{metaDescription}</p>
        <Link
          href={`/blog/${slug.current}`}
          className="text-violet-600 font-semibold hover:underline"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCards;
