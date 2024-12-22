import type { CollectionConfig } from 'payload'

export const LogoImages: CollectionConfig = {
  slug: 'logo-images',
  access: {
    read: () => true,
  },
  fields: [],
  upload: true,
}
