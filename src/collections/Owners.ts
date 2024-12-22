import type { CollectionConfig } from 'payload'

export const Owners: CollectionConfig = {
  slug: 'owners',
  auth: {
    tokenExpiration: 7200, // How many seconds to keep the user logged in
    verify: true, // Require email verification before being allowed to authenticate
    maxLoginAttempts: 5, // Automatically lock a user out after X amount of failed logins
    lockTime: 600 * 1000, // Time period to allow the max login attempts
  },
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
      name: 'isSuperHost',
      type: 'checkbox',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'logo-images',
      hasMany: false,
    },
    {
      name: 'venues',
      type: 'join',
      collection: 'venues',
      on: 'owner'
    }
  ],
}
