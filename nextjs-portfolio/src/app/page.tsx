import HomePageContainer from '@/containers/HomePage/HomePage';
import { BlogPost, ProfileDetails } from '@/models/BlogCardModel';
import HOME_QUERY from '@/query/home.query';
import client, { options } from '@/sanity/client';
import { SanityDocument } from 'next-sanity';

export default async function Home() {
  const homePageData = await client.fetch<
    SanityDocument<{
      blogData: BlogPost[];
      profile: ProfileDetails;
    }>
  >(HOME_QUERY, {}, options);

  return <HomePageContainer data={homePageData} />;
}
