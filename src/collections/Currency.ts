import type { CollectionConfig } from 'payload'

export const Currency: CollectionConfig = {
  slug: 'currency',
  admin: {
    useAsTitle: 'name'
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'symbol',
      type: 'text',
      required: true,
    },
  ],
}
