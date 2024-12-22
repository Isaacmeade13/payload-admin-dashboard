import type { CollectionConfig } from 'payload'

export const  TagGroup: CollectionConfig = {
  slug: 'tag-group',
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
      name: 'tags',
      type: 'join',
      collection: 'tag',
      on: 'tagGroup'
    }
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
}
