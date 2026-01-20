import { createClient } from 'next-sanity';

export default createClient({
  projectId: process.env.PROJECT_ID,
  dataset: process.env.DATASET,
  apiVersion: '2024-06-01',
  useCdn: false,
});

export const options = { next: { revalidate: 30 } };
