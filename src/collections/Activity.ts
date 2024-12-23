import type { CollectionConfig } from 'payload'
import { defaultAccessControl } from '@/accessControlHelpers'

export const Activity: CollectionConfig = {
  slug: 'activity',
  admin: {
    useAsTitle: 'title'
  },
  access: {
    ...defaultAccessControl()
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
}
