import type { CollectionConfig, Field } from 'payload';
import { defaultAccessControl } from '@/accessControlHelpers';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

export const Venue: CollectionConfig = {
  slug: 'venue',
  admin: {
    useAsTitle: 'title',
  },
  versions: {
    drafts: true,
  },
  access: {
    ...defaultAccessControl(),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General Info',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'about',
              type: 'richText',
              editor: lexicalEditor({}),
            },
            {
              name: 'owner',
              relationTo: 'owner-profile',
              type: 'relationship',
              required: true,
              hasMany: false,
            },
            {
              name: 'isSuperHost',
              type: 'checkbox',
            },
            {
              name: 'isFlexible',
              type: 'checkbox',
            },
            {
              name: 'maxGuestsCount', // guests
              type: 'number',
              hasMany: false,
              min: 0,
              required: true,
            },
            {
              name: 'price',
              type: 'group',
              interfaceName: 'Price',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'value',
                      type: 'number',
                      hasMany: false,
                      required: true,
                    },
                    {
                      name: 'per',
                      type: 'text',
                      hasMany: false,
                      required: true,
                    },
                    {
                      name: 'currency',
                      type: 'relationship',
                      relationTo: 'currency',
                      hasMany: false,
                      required: true,
                    },
                  ],
                },
              ],
            },
            {
              name: 'minBookingHours',
              type: 'number',
              required: true,
            },
            {
              name: 'areaSize',
              type: 'group',
              interfaceName: 'AreaSize',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'value',
                      type: 'number',
                      required: true,
                    },
                    {
                      name: 'units',
                      type: 'select',
                      required: true,
                      hasMany: false,
                      options: [
                        {
                          label: 'Square foot',
                          value: 'square-foot',
                        },
                        {
                          label: 'Square meter',
                          value: 'square-meter',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: 'benefits',
              type: 'richText',
              editor: lexicalEditor({}),
            },
            {
              name: 'rating',
              type: 'number',
              hasMany: false,
              min: 0,
              max: 5,
            },
            {
              name: 'galleryImages',
              type: 'upload',
              relationTo: 'gallery-media',
              hasMany: true,
            },
            {
              name: 'address',
              type: 'textarea',
              required: true,
            },
            {
              name: 'spaceIncludes',
              type: 'relationship',
              relationTo: 'space-include',
              hasMany: true,
            },
            {
              name: 'policy',
              type: 'richText',
              editor: lexicalEditor({}),
            },
            {
              name: 'policyDays',
              type: 'number',
            },
          ],
        },
        {
          label: 'Params',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'tags',
                  relationTo: 'tag',
                  type: 'relationship',
                  hasMany: true,
                  maxDepth: 1,
                },
                {
                  name: 'activities',
                  type: 'relationship',
                  relationTo: 'activity',
                  hasMany: true,
                },
              ],
            },
            getVenueOptionFieldConfig('cateringAndDrinks'),
            getVenueOptionFieldConfig('tablesAndSeating'),
            getVenueOptionFieldConfig('alcoholicBeverages'),
            getVenueOptionFieldConfig('restrooms'),
            getVenueOptionFieldConfig('musicAndAV'),
            getVenueOptionFieldConfig('allowedEvents'),
            getVenueOptionFieldConfig('accommodation'),
            getVenueOptionFieldConfig('parking'),
            getVenueOptionFieldConfig('event'),
          ],
        },
        {
          label: 'Geo',
          fields: [
            {
              name: 'locations',
              type: 'relationship',
              relationTo: 'location',
              hasMany: true,
              required: true,
            },
            {
              name: 'map',
              type: 'upload',
              relationTo: 'map-image',
              hasMany: false,
            },
            {
              name: 'geo',
              type: 'point',
              hidden: true,
            },
          ],
        },
      ],
    },
  ],
};

function getVenueOptionFieldConfig(optionName: string): Field {
  return {
    name: optionName,
    type: 'group',
    interfaceName: 'VenueOption',
    fields: [
      {
        name: 'isAvailable',
        type: 'checkbox',
      },
      {
        name: 'additionalInfo',
        type: 'richText',
        editor: lexicalEditor({}),
      },
    ],
  };
}
