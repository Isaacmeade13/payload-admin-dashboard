// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Admins } from './collections/Admins'
import { Venues } from './collections/Venues'
import { Currencies } from './collections/Currencies'
import { Activity } from './collections/Activities'
import { Owners } from './collections/Owners'
import { Tags } from './collections/Tags'
import { TagGroups } from './collections/TagGroups'
import { Locations } from './collections/Locations'
import { GalleryMedia } from './collections/GalleryMedia'
import { LogoImages } from './collections/LogoImages'
import { MapImages } from './collections/MapImages'
import { NewVenueRequests } from './collections/NewVenueRequests'
import { VenueBookingRequests } from './collections/VenueBookingRequests'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Admins.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    VenueBookingRequests, NewVenueRequests, Venues, Owners, Activity, Tags, TagGroups,
     GalleryMedia, LogoImages, MapImages, Locations, Currencies, Admins,
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
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
