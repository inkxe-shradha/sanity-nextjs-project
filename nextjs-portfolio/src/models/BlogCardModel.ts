import { PortableTextBlock } from 'next-sanity';

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
  content: PortableTextBlock[];
};

export type Author = {
  authorName: {
    name: string;
    biography: string;
    profileImage: {
      alt: string;
      asset: { _ref: string };
    };
  };
};

export type ProfileDetails = {
  name: string;
  role: string;
  bio: string;
  profileImage: {
    asset: {
      url: string;
    };
    alt: string;
  };
  email: string;
  socialLinks: {
    platform: string;
    url: string;
  }[];
};
