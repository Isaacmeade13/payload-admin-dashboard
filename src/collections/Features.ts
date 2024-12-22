import { FeatureOption } from '@/payload-types'
import type { CollectionConfig } from 'payload'
import type { Where } from 'payload'

const filterOnlyUnlinkedFeatureOptions: Where = {
  relatedFeature: {
    not_equals: null,
  },
}

export const Features: CollectionConfig = {
  slug: 'features',
  admin: {
    useAsTitle: 'title'
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'featureOptions',
      type: 'join',
      collection: 'feature_options',
      on: 'feature',
      hasMany: true,
      required: true,
    }
    /*{
      name: 'featureOptions',
      type: 'relationship',
      relationTo: 'feature_options',
      required: true,
      hasMany: true,
      // prevent to attach the same featureOption to different feature entities
      unique: true,
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
}
