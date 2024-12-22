import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
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
      relationTo: 'tag-groups',
      required: true,
      hasMany: false,
    }
  ],
}
