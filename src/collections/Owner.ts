import type { CollectionConfig } from 'payload'
import { defaultAccessControl } from '@/accessControlHelpers'

export const Owner: CollectionConfig = {
  slug: 'owner',
  auth: {
    tokenExpiration: 7200, // How many seconds to keep the user logged in
    verify: true, // Require email verification before being allowed to authenticate
    maxLoginAttempts: 5, // Automatically lock a user out after X amount of failed logins
    lockTime: 600 * 1000, // Time period to allow the max login attempts
  },
  admin: {
    useAsTitle: 'email'
  },
  access: {
    ...defaultAccessControl(),
    read: ({ req: { user }, data }) => {
      if(user?.collection === 'admin'){
        return true
      }
      return false
    },
  },
  fields: [
    {
      name: 'profile',
      type: 'relationship',
      relationTo: 'owner-profile',
      required: true
    }
  ],
}
