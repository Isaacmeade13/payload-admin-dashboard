import type { CollectionConfig, Field } from 'payload'


export const Venues: CollectionConfig = {
  slug: 'venues',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Main Info',
          fields: [
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'owner',
              relationTo: 'owners',
              type: 'relationship',
              required: true,
              hasMany: false
            },
            {
              name: 'featureOptions',
              relationTo: 'feature_options',
              type: 'relationship',
              hasMany: true
            },
            {
              name: 'galleryImages',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              //  required: true,
            },
            {
              name: 'maxGuestsCount', // guests
              type: 'number',
              hasMany: false,
              min: 0
            },
            {
              name: 'benefits',
              type: 'textarea',
            },
            {
              name: 'rating',
              type: 'number',
              hasMany: false,
              min: 0,
              max: 5
            },
            getPriceFieldConfig(),
            {
              name: 'areaSize',
              type: 'group',
              interfaceName: 'AreaSize',
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
                }
              ]
            },
            {
              name: 'activities',
              type: 'relationship',
              relationTo: 'activities',
              hasMany: true
            },
          ]
        },
        {
          label: 'Options',
          fields: [
            getVenueOptionFieldConfig('cateringAndDrinks'),
            getVenueOptionFieldConfig('tablesAndSeating'),
            getVenueOptionFieldConfig('alcoholicBeverages'),
            getVenueOptionFieldConfig('restrooms'),
            getVenueOptionFieldConfig('musicAndAV'),
            getVenueOptionFieldConfig('allowedEvents'),
            getVenueOptionFieldConfig('accommodation'),
            getVenueOptionFieldConfig('parking'),
            getVenueOptionFieldConfig('event'),
          ]
        }
      ]
    }
  ],
}

function getPriceFieldConfig(): Field{
  return {
    name: 'price',
    type: 'group',
    interfaceName: 'Price',
    fields: [
      {
        name: 'value', // guests
        type: 'number',
        hasMany: false,
      },
      {
        name: 'currency',
        type: 'relationship',
        relationTo: 'currencies',
        hasMany: false
      }
    ]
  }
}

function getVenueOptionFieldConfig(optionName: string): Field{
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
        type: 'textarea',
      },
    ]
  }
}

