import 'dotenv/config'
// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig, DatabaseAdapter } from 'payload'
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
import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const whichEnvironment = (): 'localPg' | 'vercel' =>{
  if(process.env.ENVIRONMENT === 'vercel'){
    return 'vercel'
  }
  return 'localPg'
}

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
  db: function(){
    switch (whichEnvironment()) {
      case 'localPg':
        return postgresAdapter({
          pool: {
            connectionString: process.env.POSTGRES_URL || '',
          },
        });
      // more details - https://payloadcms.com/docs/database/postgres
      case 'vercel':
        return vercelPostgresAdapter({
          pool: {
            connectionString: process.env.POSTGRES_URL || ''
          }
        });
    }
  }(),
  /*
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
  }),
  */
  /*db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),*/
  sharp,
  plugins: function(){
    switch (whichEnvironment()) {
      case 'localPg':
        return [
          payloadCloudPlugin(),
          // storage-adapter-placeholder
        ]
      case 'vercel':
        return [
          vercelBlobStorage({
            collections: {
              'gallery-media': true,
              'logo-image': true,
              'map-image': true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN || '',
          }),
        ]
    }
  }()
   ,
})
