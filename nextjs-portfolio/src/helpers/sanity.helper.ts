import client from '@/sanity/client';
import { createImageUrlBuilder, SanityImageSource } from '@sanity/image-url';
const { projectId, dataset } = client.config();

export const urlForImage = (source: SanityImageSource): string => {
  // Placeholder implementation; replace with actual image URL builder logic
  return projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source).url() || ''
    : '';
};
