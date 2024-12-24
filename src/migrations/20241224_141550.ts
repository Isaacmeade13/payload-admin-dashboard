import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "venue" ADD COLUMN "about" varchar;
  ALTER TABLE "_venue_v" ADD COLUMN "version_about" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "venue" DROP COLUMN IF EXISTS "about";
  ALTER TABLE "_venue_v" DROP COLUMN IF EXISTS "version_about";`)
}
