import type { CollectionConfig } from 'payload';
import { defaultAccessControl } from '@/accessControlHelpers';

export const SpaceInclude: CollectionConfig = {
  slug: 'space-include',
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
  ],
};
