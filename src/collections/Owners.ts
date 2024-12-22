import type { CollectionConfig } from 'payload'

export const Owners: CollectionConfig = {
  slug: 'owners',
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
      name: 'isPremiumOwner',
      type: 'checkbox',
    },
    {
      name: 'venues',
      type: 'join',
      collection: 'venues',
      on: 'owner'
    }
  ],
}
