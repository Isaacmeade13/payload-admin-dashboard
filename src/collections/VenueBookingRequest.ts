import type { CollectionConfig } from 'payload';
import { defaultAccessControl } from '@/accessControlHelpers';
import transporter from '@/utils/nodemailer';

export const VenueBookingRequest: CollectionConfig = {
  slug: 'venue-booking-request',
  admin: {
    useAsTitle: 'desiredVenue',
  },
  access: {
    ...defaultAccessControl(),
    create: ({ req: { user }, data }) => {
      return true;
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
    },
  ],
  hooks: {
    afterChange: [
      async ({ operation, doc }) => {
        if (
          operation === 'create' &&
          process.env.VERCEL_ENV === 'development'
        ) {
          try {
            const info = await transporter.sendMail({
              from: 'Event Cage',
              to: process.env.EMAIL_TO,
              replyTo: doc?.email || '',
              subject: 'New Booking Request',
              html: `
                <h1>New Booking Request</h1>
                <p><strong>Phone:</strong> ${doc?.phone || 'N/A'}</p>
                <p><strong>Start:</strong> ${doc?.start || 'N/A'}</p>
                <p><strong>End:</strong> ${doc?.end || 'N/A'}</p>
                <p><strong>Email:</strong> ${doc?.email || 'N/A'}</p>
              `,
            });

            console.log('Email sent:', info.messageId);
          } catch (error) {
            console.error('Error sending email:', error);
          }
        }
      },
    ],
  },
};
