import type { CollectionConfig } from 'payload';
import { defaultAccessControl } from '@/accessControlHelpers';

export const TagGroup: CollectionConfig = {
  slug: 'tag-group',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    ...defaultAccessControl(),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'tags',
      type: 'join',
      collection: 'tag',
      on: 'tagGroup',
      defaultLimit: 250,
    },
    /* {
      name: 'feature',
      type: 'relationship',
      relationTo: 'features',
      required: true,
      hasMany: false,
    }*/
    /*{
      name: 'relatedFeature',
      type: 'join',
      collection: 'features',
      on: 'featureOptions',
    },*/
    /* {
      name: 'avaliableValues',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
      ],
    }, */
  ],
};
