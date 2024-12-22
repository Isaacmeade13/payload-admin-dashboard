import type { CollectionConfig } from 'payload'

export const Location: CollectionConfig = {
  slug: 'location',
  admin: {
    useAsTitle: 'name'
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
}
