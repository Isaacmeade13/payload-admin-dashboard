import type { CollectionConfig } from 'payload';
import { defaultAccessControl } from '@/accessControlHelpers';

export const SpaceIncludes: CollectionConfig = {
  slug: 'spaceIncludes',
  admin: {
    useAsTitle: 'text',
  },

  access: {
    ...defaultAccessControl(),
  },
  fields: [
    {
      name: 'text',
      type: 'text',
    },
    {
      name: 'spaceIncludesGroup',
      type: 'relationship',
      relationTo: 'venue',
      hasMany: false,
    },
  ],
};
