import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "space_includes" RENAME TO "space_include";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "space_includes_id" TO "space_include_id";
  ALTER TABLE "space_include" DROP CONSTRAINT "space_includes_space_includes_group_id_venue_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_space_includes_fk";
  
  DROP INDEX IF EXISTS "space_includes_space_includes_group_idx";
  DROP INDEX IF EXISTS "space_includes_updated_at_idx";
  DROP INDEX IF EXISTS "space_includes_created_at_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_space_includes_id_idx";
  ALTER TABLE "venue" ADD COLUMN "space_includes_id" integer;
  ALTER TABLE "_venue_v" ADD COLUMN "version_space_includes_id" integer;
  DO $$ BEGIN
   ALTER TABLE "venue" ADD CONSTRAINT "venue_space_includes_id_venue_id_fk" FOREIGN KEY ("space_includes_id") REFERENCES "public"."venue"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_venue_v" ADD CONSTRAINT "_venue_v_version_space_includes_id_venue_id_fk" FOREIGN KEY ("version_space_includes_id") REFERENCES "public"."venue"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_space_include_fk" FOREIGN KEY ("space_include_id") REFERENCES "public"."space_include"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "venue_space_includes_idx" ON "venue" USING btree ("space_includes_id");
  CREATE INDEX IF NOT EXISTS "_venue_v_version_version_space_includes_idx" ON "_venue_v" USING btree ("version_space_includes_id");
  CREATE INDEX IF NOT EXISTS "space_include_updated_at_idx" ON "space_include" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "space_include_created_at_idx" ON "space_include" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_space_include_id_idx" ON "payload_locked_documents_rels" USING btree ("space_include_id");
  ALTER TABLE "space_include" DROP COLUMN IF EXISTS "space_includes_group_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "space_include" RENAME TO "space_includes";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "space_include_id" TO "space_includes_id";
  ALTER TABLE "venue" DROP CONSTRAINT "venue_space_includes_id_venue_id_fk";
  
  ALTER TABLE "_venue_v" DROP CONSTRAINT "_venue_v_version_space_includes_id_venue_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_space_include_fk";
  
  DROP INDEX IF EXISTS "venue_space_includes_idx";
  DROP INDEX IF EXISTS "_venue_v_version_version_space_includes_idx";
  DROP INDEX IF EXISTS "space_include_updated_at_idx";
  DROP INDEX IF EXISTS "space_include_created_at_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_space_include_id_idx";
  ALTER TABLE "space_includes" ADD COLUMN "space_includes_group_id" integer;
  DO $$ BEGIN
   ALTER TABLE "space_includes" ADD CONSTRAINT "space_includes_space_includes_group_id_venue_id_fk" FOREIGN KEY ("space_includes_group_id") REFERENCES "public"."venue"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_space_includes_fk" FOREIGN KEY ("space_includes_id") REFERENCES "public"."space_includes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "space_includes_space_includes_group_idx" ON "space_includes" USING btree ("space_includes_group_id");
  CREATE INDEX IF NOT EXISTS "space_includes_updated_at_idx" ON "space_includes" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "space_includes_created_at_idx" ON "space_includes" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_space_includes_id_idx" ON "payload_locked_documents_rels" USING btree ("space_includes_id");
  ALTER TABLE "venue" DROP COLUMN IF EXISTS "space_includes_id";
  ALTER TABLE "_venue_v" DROP COLUMN IF EXISTS "version_space_includes_id";`)
}
