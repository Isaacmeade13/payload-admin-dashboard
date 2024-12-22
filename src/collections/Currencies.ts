import type { CollectionConfig } from 'payload'

export const Currencies: CollectionConfig = {
  slug: 'currencies',
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
      name: 'symbol',
      type: 'text',
      required: true,
    },
  ],
}
