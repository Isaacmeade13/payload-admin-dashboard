import type { CollectionConfig } from 'payload'
import { defaultAccessControl } from '@/accessControlHelpers'

export const GalleryMedia: CollectionConfig = {
  slug: 'gallery-media',
  access: {
    ...defaultAccessControl()
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
