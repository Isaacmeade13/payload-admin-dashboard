import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "new_venue_request_rels" DROP CONSTRAINT "new_venue_request_rels_activity_fk";
  
  DROP INDEX IF EXISTS "new_venue_request_rels_activity_id_idx";
  ALTER TABLE "new_venue_request" ADD COLUMN "activities" varchar;
  ALTER TABLE "new_venue_request_rels" DROP COLUMN IF EXISTS "activity_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "new_venue_request_rels" ADD COLUMN "activity_id" integer;
  DO $$ BEGIN
   ALTER TABLE "new_venue_request_rels" ADD CONSTRAINT "new_venue_request_rels_activity_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activity"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "new_venue_request_rels_activity_id_idx" ON "new_venue_request_rels" USING btree ("activity_id");
  ALTER TABLE "new_venue_request" DROP COLUMN IF EXISTS "activities";`)
}
