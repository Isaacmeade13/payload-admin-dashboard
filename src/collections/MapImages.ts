import type { CollectionConfig } from 'payload'

export const MapImages: CollectionConfig = {
  slug: 'map-images',
  access: {
    read: () => true,
  },
  fields: [],
  upload: true,
}
