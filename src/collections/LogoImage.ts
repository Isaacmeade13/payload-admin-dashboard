import type { CollectionConfig } from 'payload'

export const LogoImage: CollectionConfig = {
  slug: 'logo-image',
  access: {
    read: () => true,
  },
  fields: [],
  upload: true,
}
