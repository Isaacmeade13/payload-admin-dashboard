import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "venue_rels" RENAME COLUMN "venue_id" TO "space_include_id";
  ALTER TABLE "_venue_v_rels" RENAME COLUMN "venue_id" TO "space_include_id";
  ALTER TABLE "venue_rels" DROP CONSTRAINT "venue_rels_venue_fk";
  
  ALTER TABLE "_venue_v_rels" DROP CONSTRAINT "_venue_v_rels_venue_fk";
  
  DROP INDEX IF EXISTS "venue_rels_venue_id_idx";
  DROP INDEX IF EXISTS "_venue_v_rels_venue_id_idx";
  DO $$ BEGIN
   ALTER TABLE "venue_rels" ADD CONSTRAINT "venue_rels_space_include_fk" FOREIGN KEY ("space_include_id") REFERENCES "public"."space_include"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_venue_v_rels" ADD CONSTRAINT "_venue_v_rels_space_include_fk" FOREIGN KEY ("space_include_id") REFERENCES "public"."space_include"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "venue_rels_space_include_id_idx" ON "venue_rels" USING btree ("space_include_id");
  CREATE INDEX IF NOT EXISTS "_venue_v_rels_space_include_id_idx" ON "_venue_v_rels" USING btree ("space_include_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "venue_rels" RENAME COLUMN "space_include_id" TO "venue_id";
  ALTER TABLE "_venue_v_rels" RENAME COLUMN "space_include_id" TO "venue_id";
  ALTER TABLE "venue_rels" DROP CONSTRAINT "venue_rels_space_include_fk";
  
  ALTER TABLE "_venue_v_rels" DROP CONSTRAINT "_venue_v_rels_space_include_fk";
  
  DROP INDEX IF EXISTS "venue_rels_space_include_id_idx";
  DROP INDEX IF EXISTS "_venue_v_rels_space_include_id_idx";
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
  CREATE INDEX IF NOT EXISTS "_venue_v_rels_venue_id_idx" ON "_venue_v_rels" USING btree ("venue_id");`)
}
