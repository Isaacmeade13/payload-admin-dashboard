import type { CollectionConfig } from 'payload'
import { defaultAccessControl } from '@/accessControlHelpers'

export const Currency: CollectionConfig = {
  slug: 'currency',
  admin: {
    useAsTitle: 'name'
  },
  access: {
    ...defaultAccessControl()
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
