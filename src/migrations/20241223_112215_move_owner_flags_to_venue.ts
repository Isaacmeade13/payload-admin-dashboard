import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "venue" ADD COLUMN "is_super_host" boolean;
  ALTER TABLE "venue" ADD COLUMN "is_flexible" boolean;
  ALTER TABLE "_venue_v" ADD COLUMN "version_is_super_host" boolean;
  ALTER TABLE "_venue_v" ADD COLUMN "version_is_flexible" boolean;
  ALTER TABLE "owner_profile" DROP COLUMN IF EXISTS "is_super_host";
  ALTER TABLE "_owner_profile_v" DROP COLUMN IF EXISTS "version_is_super_host";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "owner_profile" ADD COLUMN "is_super_host" boolean;
  ALTER TABLE "_owner_profile_v" ADD COLUMN "version_is_super_host" boolean;
  ALTER TABLE "venue" DROP COLUMN IF EXISTS "is_super_host";
  ALTER TABLE "venue" DROP COLUMN IF EXISTS "is_flexible";
  ALTER TABLE "_venue_v" DROP COLUMN IF EXISTS "version_is_super_host";
  ALTER TABLE "_venue_v" DROP COLUMN IF EXISTS "version_is_flexible";`)
}
