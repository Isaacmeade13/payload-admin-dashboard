import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "venue" DROP CONSTRAINT "venue_space_includes_id_venue_id_fk";
  
  ALTER TABLE "_venue_v" DROP CONSTRAINT "_venue_v_version_space_includes_id_venue_id_fk";
  
  DROP INDEX IF EXISTS "venue_space_includes_idx";
  DROP INDEX IF EXISTS "_venue_v_version_version_space_includes_idx";
  ALTER TABLE "venue_rels" ADD COLUMN "venue_id" integer;
  ALTER TABLE "_venue_v_rels" ADD COLUMN "venue_id" integer;
  DO $$ BEGIN
   ALTER TABLE "venue_rels" ADD CONSTRAINT "venue_rels_venue_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."venue"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_venue_v_rels" ADD CONSTRAINT "_venue_v_rels_venue_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."venue"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "venue_rels_venue_id_idx" ON "venue_rels" USING btree ("venue_id");
  CREATE INDEX IF NOT EXISTS "_venue_v_rels_venue_id_idx" ON "_venue_v_rels" USING btree ("venue_id");
  ALTER TABLE "venue" DROP COLUMN IF EXISTS "space_includes_id";
  ALTER TABLE "_venue_v" DROP COLUMN IF EXISTS "version_space_includes_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "venue_rels" DROP CONSTRAINT "venue_rels_venue_fk";
  
  ALTER TABLE "_venue_v_rels" DROP CONSTRAINT "_venue_v_rels_venue_fk";
  
  DROP INDEX IF EXISTS "venue_rels_venue_id_idx";
  DROP INDEX IF EXISTS "_venue_v_rels_venue_id_idx";
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
  
  CREATE INDEX IF NOT EXISTS "venue_space_includes_idx" ON "venue" USING btree ("space_includes_id");
  CREATE INDEX IF NOT EXISTS "_venue_v_version_version_space_includes_idx" ON "_venue_v" USING btree ("version_space_includes_id");
  ALTER TABLE "venue_rels" DROP COLUMN IF EXISTS "venue_id";
  ALTER TABLE "_venue_v_rels" DROP COLUMN IF EXISTS "venue_id";`)
}
