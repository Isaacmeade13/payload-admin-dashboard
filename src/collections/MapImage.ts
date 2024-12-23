import type { CollectionConfig } from 'payload'
import { defaultAccessControl } from '@/accessControlHelpers'

export const MapImage: CollectionConfig = {
  slug: 'map-image',
  access: {
    ...defaultAccessControl()
  },
  fields: [],
  upload: true,
}
