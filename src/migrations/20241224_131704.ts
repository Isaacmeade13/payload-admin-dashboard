import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "space_includes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"space_includes_group_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "space_includes_id" integer;
  DO $$ BEGIN
   ALTER TABLE "space_includes" ADD CONSTRAINT "space_includes_space_includes_group_id_venue_id_fk" FOREIGN KEY ("space_includes_group_id") REFERENCES "public"."venue"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "space_includes_space_includes_group_idx" ON "space_includes" USING btree ("space_includes_group_id");
  CREATE INDEX IF NOT EXISTS "space_includes_updated_at_idx" ON "space_includes" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "space_includes_created_at_idx" ON "space_includes" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_space_includes_fk" FOREIGN KEY ("space_includes_id") REFERENCES "public"."space_includes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_space_includes_id_idx" ON "payload_locked_documents_rels" USING btree ("space_includes_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "space_includes" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "space_includes" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_space_includes_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_space_includes_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "space_includes_id";`)
}
