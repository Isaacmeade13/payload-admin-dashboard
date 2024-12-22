import type { CollectionConfig } from 'payload'

export const Tag: CollectionConfig = {
  slug: 'tag',
  admin: {
    useAsTitle: 'title'
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
    }
  ],
}
