import type { CollectionConfig } from 'payload'
import { defaultAccessControl } from '@/accessControlHelpers'

export const Admin: CollectionConfig = {
  slug: 'admin',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    ...defaultAccessControl()
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
