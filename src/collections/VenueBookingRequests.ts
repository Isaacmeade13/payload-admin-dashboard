import type { CollectionConfig } from 'payload'

export const VenueBookingRequests: CollectionConfig = {
  slug: 'venue-bookings-requests',
  admin: {
    useAsTitle: 'desiredVenue'
  },
  fields: [
    {
      name: 'desiredVenue',
      type: 'relationship',
      relationTo: 'venues',
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
