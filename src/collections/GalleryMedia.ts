import type { CollectionConfig } from 'payload'

export const GalleryMedia: CollectionConfig = {
  slug: 'gallery-media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
    },
  ],
  upload: true,
}
