import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your_project_id',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_VIEWER_TOKEN,
  stega: {
    studioUrl:
      process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3333',
  },
});

// Write client (for mutations - used in webhooks/server actions)
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your_project_id',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

export const option = { next: { revalidate: 30 } };
