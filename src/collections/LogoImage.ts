import type { CollectionConfig } from 'payload'
import { defaultAccessControl } from '@/accessControlHelpers'

export const LogoImage: CollectionConfig = {
  slug: 'logo-image',
  access: {
    ...defaultAccessControl()
  },
  fields: [],
  upload: true,
}
