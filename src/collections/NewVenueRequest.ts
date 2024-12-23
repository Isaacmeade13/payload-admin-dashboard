import type { CollectionConfig, FieldHookArgs } from 'payload'
import { defaultAccessControl } from '@/accessControlHelpers'

export const NewVenueRequest: CollectionConfig = {
  slug: 'new-venue-request',
  admin: {
    useAsTitle: 'title'
  },
  access: {
    ...defaultAccessControl(),
    create: ({ req: { user }, data }) => {
      return true
    },
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
      relationTo: 'activity',
      required: true,
      hasMany: true
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tag',
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
