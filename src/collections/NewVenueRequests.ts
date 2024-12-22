import type { CollectionConfig, FieldHookArgs } from 'payload'

export const NewVenueRequests: CollectionConfig = {
  slug: 'new-venue-requests',
  admin: {
    useAsTitle: 'title'
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        hidden: true, // hides the field from the admin panel
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            // ensures data is not stored in DB
            delete siblingData['title']
          }
        ],
        afterRead: [
          ({ data }: FieldHookArgs<any, any, any>) => {
            return data ? `${data.company} - ${data.spaceName} `:'no title';
          }
        ],
      }
    },
    {
      name: 'companyName',
      type: 'textarea',
    },
    {
      name: 'spaceName',
      type: 'textarea',
    },
    {
      name: 'venueDescription',
      type: 'textarea',
    },
    {
      name: 'address',
      type: 'textarea',
    },
    {
      name: 'activities',
      type: 'relationship',
      relationTo: 'activities',
      required: true,
      hasMany: true
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      required: true,
      hasMany: true
    },
    {
      name: 'cancellationPolicy',
      type: 'textarea',
    },
    {
      name: 'minimumCancellationDuration',
      type: 'textarea',
    },
    {
      name: 'operationalHours',
      type: 'textarea',
    },
    {
      name: 'pricingModel',
      type: 'textarea',
    },
    {
      name: 'seatingCapacity',
      type: 'textarea',
    },
    {
      name: 'diningCapacity',
      type: 'textarea',
    },
    {
      name: 'standingCapacity',
      type: 'textarea',
    },
    {
      name: 'contactInformation',
      type: 'textarea',
    },
  ],
}
