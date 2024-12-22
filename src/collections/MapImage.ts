import type { CollectionConfig } from 'payload'

export const MapImage: CollectionConfig = {
  slug: 'map-image',
  access: {
    read: () => true,
  },
  fields: [],
  upload: true,
}
