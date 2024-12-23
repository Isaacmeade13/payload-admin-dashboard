import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "venue" ADD COLUMN "min_booking_hours" numeric;
  ALTER TABLE "venue" ADD COLUMN "address" varchar;
  ALTER TABLE "_venue_v" ADD COLUMN "version_min_booking_hours" numeric;
  ALTER TABLE "_venue_v" ADD COLUMN "version_address" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "venue" DROP COLUMN IF EXISTS "min_booking_hours";
  ALTER TABLE "venue" DROP COLUMN IF EXISTS "address";
  ALTER TABLE "_venue_v" DROP COLUMN IF EXISTS "version_min_booking_hours";
  ALTER TABLE "_venue_v" DROP COLUMN IF EXISTS "version_address";`)
}
