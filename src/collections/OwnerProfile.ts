import type { CollectionConfig } from 'payload'

export const OwnerProfile: CollectionConfig = {
  slug: 'owner-profile',
  admin: {
    useAsTitle: 'companyName'
  },
  versions: {
    drafts: true
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      required: true,
    },
    {
      name: 'isSuperHost',
      type: 'checkbox',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'logo-image',
      hasMany: false,
    },
    {
      name: 'venues',
      type: 'join',
      collection: 'venue',
      on: 'owner'
    }
  ],
}
