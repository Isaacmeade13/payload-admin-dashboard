import type { CollectionConfig, Field } from 'payload'


export const Venues: CollectionConfig = {
  slug: 'venues',
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
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    //  required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      hasMany: false,
    //  required: true,
    },

    {
      name: 'maxGuestsCount', // guests
      type: 'number',
      hasMany: false,
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
      name: 'activities',
      type: 'relationship',
      relationTo: 'activities',
      hasMany: true
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

