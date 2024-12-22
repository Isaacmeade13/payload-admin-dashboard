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
      name: 'isSuperOwner',
      type: 'checkbox',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      hasMany: false,
      //  required: true,
    },
    {
      name: 'venues',
      type: 'join',
      collection: 'venues',
      on: 'owner'
    }
  ],
}
