import type { CollectionConfig } from 'payload'
import { defaultAccessControl } from '@/accessControlHelpers'

export const Location: CollectionConfig = {
  slug: 'location',
  admin: {
    useAsTitle: 'name'
  },
  access: {
    ...defaultAccessControl()
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
}
