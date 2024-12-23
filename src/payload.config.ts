// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Admin } from './collections/Admin'
import { Venue } from './collections/Venue'
import { Currency } from './collections/Currency'
import { Activity } from './collections/Activity'
import { Owner } from './collections/Owner'
import { OwnerProfile } from './collections/OwnerProfile'
import { Tag } from './collections/Tag'
import { TagGroup } from './collections/TagGroup'
import { Location } from './collections/Location'
import { GalleryMedia } from './collections/GalleryMedia'
import { LogoImage } from './collections/LogoImage'
import { MapImage } from './collections/MapImage'
import { NewVenueRequest } from './collections/NewVenueRequest'
import { VenueBookingRequest } from './collections/VenueBookingRequest'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Admin.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    VenueBookingRequest, NewVenueRequest, Venue, OwnerProfile, Owner, Activity, Tag, TagGroup,
     GalleryMedia, LogoImage, MapImage, Location, Currency, Admin,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
  }),
  /*db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),*/
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
