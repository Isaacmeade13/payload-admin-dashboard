import type { CollectionConfig } from 'payload'
import { defaultAccessControl } from '@/accessControlHelpers'

export const OwnerProfile: CollectionConfig = {
  slug: 'owner-profile',
  admin: {
    useAsTitle: 'companyName'
  },
  versions: {
    drafts: true
  },
  access: {
    ...defaultAccessControl()
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      required: true,
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
