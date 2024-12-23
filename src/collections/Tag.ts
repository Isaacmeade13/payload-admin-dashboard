import type { CollectionConfig } from 'payload'
import { defaultAccessControl } from '@/accessControlHelpers'

export const Tag: CollectionConfig = {
  slug: 'tag',
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
    {
      name: 'tagGroup',
      type: 'relationship',
      relationTo: 'tag-group',
      required: true,
      hasMany: false,
    },
  ],
}
