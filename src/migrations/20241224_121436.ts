import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "venue" ADD COLUMN "price_per" varchar;
  ALTER TABLE "venue" ADD COLUMN "policy" varchar;
  ALTER TABLE "venue" ADD COLUMN "policy_days" numeric;
  ALTER TABLE "_venue_v" ADD COLUMN "version_price_per" varchar;
  ALTER TABLE "_venue_v" ADD COLUMN "version_policy" varchar;
  ALTER TABLE "_venue_v" ADD COLUMN "version_policy_days" numeric;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "venue" DROP COLUMN IF EXISTS "price_per";
  ALTER TABLE "venue" DROP COLUMN IF EXISTS "policy";
  ALTER TABLE "venue" DROP COLUMN IF EXISTS "policy_days";
  ALTER TABLE "_venue_v" DROP COLUMN IF EXISTS "version_price_per";
  ALTER TABLE "_venue_v" DROP COLUMN IF EXISTS "version_policy";
  ALTER TABLE "_venue_v" DROP COLUMN IF EXISTS "version_policy_days";`)
}
