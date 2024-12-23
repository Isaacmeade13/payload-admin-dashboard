import type { CollectionConfig } from 'payload'
import { defaultAccessControl } from '@/accessControlHelpers'

export const VenueBookingRequest: CollectionConfig = {
  slug: 'venue-booking-request',
  admin: {
    useAsTitle: 'desiredVenue'
  },
  access: {
    ...defaultAccessControl(),
    create: ({ req: { user }, data }) => {
      return true
    },
  },
  fields: [
    {
      name: 'desiredVenue',
      type: 'relationship',
      relationTo: 'venue',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyy',
        },
      },
    },
    {
      name: 'start',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'timeOnly',
          displayFormat: 'h:mm',
        },
      },
    },
    {
      name: 'end',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'timeOnly',
          displayFormat: 'h:mm',
        },
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    }
  ],
}
