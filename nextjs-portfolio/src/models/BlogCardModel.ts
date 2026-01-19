export type BlogPost = {
  _id: string;
  title: string;
  metaDescription: string;
  blogImage: {
    alt: string;
    asset: { _ref: string };
  };
  slug: {
    current: string;
  };
  _createdAt: string;
  author?: Author;
};

export type Author = {
  authorName: {
    name: string;
  };
};
