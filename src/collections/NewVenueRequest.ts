import type { CollectionConfig, FieldHookArgs } from 'payload';
import { defaultAccessControl } from '@/accessControlHelpers';
import transporter from '@/utils/nodemailer';

export const NewVenueRequest: CollectionConfig = {
  slug: 'new-venue-request',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    ...defaultAccessControl(),
    create: ({ req: { user }, data }) => {
      return true;
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
            delete siblingData['title'];
          },
        ],
        afterRead: [
          ({ data }: FieldHookArgs<any, any, any>) => {
            return data ? `${data.company} - ${data.spaceName} ` : 'no title';
          },
        ],
      },
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
      type: 'textarea',
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tag',
      required: true,
      hasMany: true,
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
  hooks: {
    afterChange: [
      async ({ operation, doc }) => {
        if (operation === 'create') {
          try {
            const environmentLabel =
              process.env.NODE_ENV === 'development' ? 'DEVELOPMENT' : '';
            const subject = `*** ${environmentLabel} *** New Venue Request`;

            const info = await transporter.sendMail({
              from: 'Event Cage',
              to: process.env.EMAIL_TO,
              replyTo: doc?.email || '',
              subject,
              html: `
                <h1>New Venue Request</h1>
                <p><strong>Company name:</strong> ${doc?.companyName || 'N/A'}</p>
                <p><strong>Space name:</strong> ${doc?.spaceName || 'N/A'}</p>
                <p><strong>Address:</strong> ${doc?.address || 'N/A'}</p>
                <p><strong>Contact information:</strong> ${doc?.contactInformation || 'N/A'}</p>
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
