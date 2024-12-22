import type { CollectionConfig, Field, FieldHookArgs } from 'payload'


export const Venues: CollectionConfig = {
  slug: 'venues',
  admin: {
    useAsTitle: '_title'
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
            },
            {
              name: 'owner',
              relationTo: 'owners',
              type: 'relationship',
              required: true,
              hasMany: false,
              maxDepth: 2,
            },
            {
              name: 'maxGuestsCount', // guests
              type: 'number',
              hasMany: false,
              min: 0
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
              ]
            },
            {
              name: 'areaSize',
              type: 'group',
              interfaceName: 'AreaSize',
              fields: [
                {
                  type: 'row',
                  fields:[
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
                  ],
                }
              ]
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

            {
              name: 'galleryImages',
              type: 'upload',
              relationTo: 'gallery-media',
              hasMany: true,
            },
          ]
        },
        {
          label: 'Params',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'tags',
                  relationTo: 'tags',
                  type: 'relationship',
                  hasMany: true,
                  maxDepth: 1,
                },
                {
                  name: 'activities',
                  type: 'relationship',
                  relationTo: 'activities',
                  hasMany: true
                },
              ]
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
          ]
        },
        {
          label: 'Geo',
          fields: [
            {
              name: 'locations',
              type: 'relationship',
              relationTo: 'locations',
              hasMany: true,
              required: true
            },
            {
              name: 'map',
              type: 'upload',
              relationTo: 'map-images',
              hasMany: false,
            },
            {
              name: 'geoCoords',
              type: 'point',
            },
          ]
        }
      ]
    },
    {
      name: '_title',
      type: 'text',
      admin: {
        hidden: true, // hides the field from the admin panel
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            // ensures data is not stored in DB
            delete siblingData['_title']
          }
        ],
        afterRead: [
          async ({ data, req }: FieldHookArgs<any, any, any>) => {
            console.log(data);
            if(data){
              const owner = await req.payload.findByID({
                collection: 'owners',
                id: data.owner,
                depth: 0
              });
              return data ? `${owner.name} - ${data.title} `:'no title';
            }
            return 'no title'
          }
        ],
      }
    },
  ],
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

