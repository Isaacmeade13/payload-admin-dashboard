import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_venue_area_size_units" AS ENUM('square-foot', 'square-meter');
  CREATE TYPE "public"."enum_venue_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__venue_v_version_area_size_units" AS ENUM('square-foot', 'square-meter');
  CREATE TYPE "public"."enum__venue_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_owner_profile_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__owner_profile_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE IF NOT EXISTS "venue_booking_request" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"desired_venue_id" integer NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"start" timestamp(3) with time zone NOT NULL,
  	"end" timestamp(3) with time zone NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "new_venue_request" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"company_name" varchar,
  	"space_name" varchar,
  	"venue_description" varchar,
  	"address" varchar,
  	"activities" varchar,
  	"cancellation_policy" varchar,
  	"minimum_cancellation_duration" varchar,
  	"operational_hours" varchar,
  	"pricing_model" varchar,
  	"seating_capacity" varchar,
  	"dining_capacity" varchar,
  	"standing_capacity" varchar,
  	"contact_information" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "new_venue_request_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tag_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "venue" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"about" jsonb,
  	"owner_id" integer,
  	"is_super_host" boolean,
  	"is_flexible" boolean,
  	"max_guests_count" numeric,
  	"price_value" numeric,
  	"price_per" varchar,
  	"price_currency_id" integer,
  	"min_booking_hours" numeric,
  	"area_size_value" numeric,
  	"area_size_units" "enum_venue_area_size_units",
  	"benefits" jsonb,
  	"rating" numeric,
  	"address" varchar,
  	"policy" jsonb,
  	"policy_days" numeric,
  	"catering_and_drinks_is_available" boolean,
  	"catering_and_drinks_additional_info" jsonb,
  	"tables_and_seating_is_available" boolean,
  	"tables_and_seating_additional_info" jsonb,
  	"alcoholic_beverages_is_available" boolean,
  	"alcoholic_beverages_additional_info" jsonb,
  	"restrooms_is_available" boolean,
  	"restrooms_additional_info" jsonb,
  	"music_and_a_v_is_available" boolean,
  	"music_and_a_v_additional_info" jsonb,
  	"allowed_events_is_available" boolean,
  	"allowed_events_additional_info" jsonb,
  	"accommodation_is_available" boolean,
  	"accommodation_additional_info" jsonb,
  	"parking_is_available" boolean,
  	"parking_additional_info" jsonb,
  	"event_is_available" boolean,
  	"event_additional_info" jsonb,
  	"map_id" integer,
  	"geo" geometry(Point),
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_venue_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "venue_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"gallery_media_id" integer,
  	"space_include_id" integer,
  	"tag_id" integer,
  	"activity_id" integer,
  	"location_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_venue_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_about" jsonb,
  	"version_owner_id" integer,
  	"version_is_super_host" boolean,
  	"version_is_flexible" boolean,
  	"version_max_guests_count" numeric,
  	"version_price_value" numeric,
  	"version_price_per" varchar,
  	"version_price_currency_id" integer,
  	"version_min_booking_hours" numeric,
  	"version_area_size_value" numeric,
  	"version_area_size_units" "enum__venue_v_version_area_size_units",
  	"version_benefits" jsonb,
  	"version_rating" numeric,
  	"version_address" varchar,
  	"version_policy" jsonb,
  	"version_policy_days" numeric,
  	"version_catering_and_drinks_is_available" boolean,
  	"version_catering_and_drinks_additional_info" jsonb,
  	"version_tables_and_seating_is_available" boolean,
  	"version_tables_and_seating_additional_info" jsonb,
  	"version_alcoholic_beverages_is_available" boolean,
  	"version_alcoholic_beverages_additional_info" jsonb,
  	"version_restrooms_is_available" boolean,
  	"version_restrooms_additional_info" jsonb,
  	"version_music_and_a_v_is_available" boolean,
  	"version_music_and_a_v_additional_info" jsonb,
  	"version_allowed_events_is_available" boolean,
  	"version_allowed_events_additional_info" jsonb,
  	"version_accommodation_is_available" boolean,
  	"version_accommodation_additional_info" jsonb,
  	"version_parking_is_available" boolean,
  	"version_parking_additional_info" jsonb,
  	"version_event_is_available" boolean,
  	"version_event_additional_info" jsonb,
  	"version_map_id" integer,
  	"version_geo" geometry(Point),
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__venue_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_venue_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"gallery_media_id" integer,
  	"space_include_id" integer,
  	"tag_id" integer,
  	"activity_id" integer,
  	"location_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "owner_profile" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company_name" varchar,
  	"logo_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_owner_profile_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "_owner_profile_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_company_name" varchar,
  	"version_logo_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__owner_profile_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "owner" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"profile_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"_verified" boolean,
  	"_verificationtoken" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "activity" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "tag" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"tag_group_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "tag_group" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "gallery_media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "logo_image" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "map_image" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "location" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "currency" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"symbol" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "space_include" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "admin" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"venue_booking_request_id" integer,
  	"new_venue_request_id" integer,
  	"venue_id" integer,
  	"owner_profile_id" integer,
  	"owner_id" integer,
  	"activity_id" integer,
  	"tag_id" integer,
  	"tag_group_id" integer,
  	"gallery_media_id" integer,
  	"logo_image_id" integer,
  	"map_image_id" integer,
  	"location_id" integer,
  	"currency_id" integer,
  	"space_include_id" integer,
  	"admin_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"owner_id" integer,
  	"admin_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  DO $$ BEGIN
   ALTER TABLE "venue_booking_request" ADD CONSTRAINT "venue_booking_request_desired_venue_id_venue_id_fk" FOREIGN KEY ("desired_venue_id") REFERENCES "public"."venue"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "new_venue_request_rels" ADD CONSTRAINT "new_venue_request_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."new_venue_request"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "new_venue_request_rels" ADD CONSTRAINT "new_venue_request_rels_tag_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "venue" ADD CONSTRAINT "venue_owner_id_owner_profile_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."owner_profile"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "venue" ADD CONSTRAINT "venue_price_currency_id_currency_id_fk" FOREIGN KEY ("price_currency_id") REFERENCES "public"."currency"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "venue" ADD CONSTRAINT "venue_map_id_map_image_id_fk" FOREIGN KEY ("map_id") REFERENCES "public"."map_image"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "venue_rels" ADD CONSTRAINT "venue_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."venue"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "venue_rels" ADD CONSTRAINT "venue_rels_gallery_media_fk" FOREIGN KEY ("gallery_media_id") REFERENCES "public"."gallery_media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "venue_rels" ADD CONSTRAINT "venue_rels_space_include_fk" FOREIGN KEY ("space_include_id") REFERENCES "public"."space_include"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "venue_rels" ADD CONSTRAINT "venue_rels_tag_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "venue_rels" ADD CONSTRAINT "venue_rels_activity_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activity"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "venue_rels" ADD CONSTRAINT "venue_rels_location_fk" FOREIGN KEY ("location_id") REFERENCES "public"."location"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_venue_v" ADD CONSTRAINT "_venue_v_parent_id_venue_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."venue"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_venue_v" ADD CONSTRAINT "_venue_v_version_owner_id_owner_profile_id_fk" FOREIGN KEY ("version_owner_id") REFERENCES "public"."owner_profile"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_venue_v" ADD CONSTRAINT "_venue_v_version_price_currency_id_currency_id_fk" FOREIGN KEY ("version_price_currency_id") REFERENCES "public"."currency"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_venue_v" ADD CONSTRAINT "_venue_v_version_map_id_map_image_id_fk" FOREIGN KEY ("version_map_id") REFERENCES "public"."map_image"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_venue_v_rels" ADD CONSTRAINT "_venue_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_venue_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_venue_v_rels" ADD CONSTRAINT "_venue_v_rels_gallery_media_fk" FOREIGN KEY ("gallery_media_id") REFERENCES "public"."gallery_media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_venue_v_rels" ADD CONSTRAINT "_venue_v_rels_space_include_fk" FOREIGN KEY ("space_include_id") REFERENCES "public"."space_include"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_venue_v_rels" ADD CONSTRAINT "_venue_v_rels_tag_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_venue_v_rels" ADD CONSTRAINT "_venue_v_rels_activity_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activity"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_venue_v_rels" ADD CONSTRAINT "_venue_v_rels_location_fk" FOREIGN KEY ("location_id") REFERENCES "public"."location"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "owner_profile" ADD CONSTRAINT "owner_profile_logo_id_logo_image_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."logo_image"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_owner_profile_v" ADD CONSTRAINT "_owner_profile_v_parent_id_owner_profile_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."owner_profile"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_owner_profile_v" ADD CONSTRAINT "_owner_profile_v_version_logo_id_logo_image_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."logo_image"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "owner" ADD CONSTRAINT "owner_profile_id_owner_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."owner_profile"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tag" ADD CONSTRAINT "tag_tag_group_id_tag_group_id_fk" FOREIGN KEY ("tag_group_id") REFERENCES "public"."tag_group"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_venue_booking_request_fk" FOREIGN KEY ("venue_booking_request_id") REFERENCES "public"."venue_booking_request"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_new_venue_request_fk" FOREIGN KEY ("new_venue_request_id") REFERENCES "public"."new_venue_request"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_venue_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."venue"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_owner_profile_fk" FOREIGN KEY ("owner_profile_id") REFERENCES "public"."owner_profile"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_owner_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."owner"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_activity_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activity"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tag_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tag_group_fk" FOREIGN KEY ("tag_group_id") REFERENCES "public"."tag_group"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_media_fk" FOREIGN KEY ("gallery_media_id") REFERENCES "public"."gallery_media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_logo_image_fk" FOREIGN KEY ("logo_image_id") REFERENCES "public"."logo_image"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_map_image_fk" FOREIGN KEY ("map_image_id") REFERENCES "public"."map_image"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_location_fk" FOREIGN KEY ("location_id") REFERENCES "public"."location"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_currency_fk" FOREIGN KEY ("currency_id") REFERENCES "public"."currency"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_space_include_fk" FOREIGN KEY ("space_include_id") REFERENCES "public"."space_include"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_admin_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."admin"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_owner_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."owner"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_admin_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."admin"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "venue_booking_request_desired_venue_idx" ON "venue_booking_request" USING btree ("desired_venue_id");
  CREATE INDEX IF NOT EXISTS "venue_booking_request_updated_at_idx" ON "venue_booking_request" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "venue_booking_request_created_at_idx" ON "venue_booking_request" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "new_venue_request_updated_at_idx" ON "new_venue_request" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "new_venue_request_created_at_idx" ON "new_venue_request" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "new_venue_request_rels_order_idx" ON "new_venue_request_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "new_venue_request_rels_parent_idx" ON "new_venue_request_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "new_venue_request_rels_path_idx" ON "new_venue_request_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "new_venue_request_rels_tag_id_idx" ON "new_venue_request_rels" USING btree ("tag_id");
  CREATE INDEX IF NOT EXISTS "venue_owner_idx" ON "venue" USING btree ("owner_id");
  CREATE INDEX IF NOT EXISTS "venue_price_price_currency_idx" ON "venue" USING btree ("price_currency_id");
  CREATE INDEX IF NOT EXISTS "venue_map_idx" ON "venue" USING btree ("map_id");
  CREATE INDEX IF NOT EXISTS "venue_updated_at_idx" ON "venue" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "venue_created_at_idx" ON "venue" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "venue__status_idx" ON "venue" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "venue_rels_order_idx" ON "venue_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "venue_rels_parent_idx" ON "venue_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "venue_rels_path_idx" ON "venue_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "venue_rels_gallery_media_id_idx" ON "venue_rels" USING btree ("gallery_media_id");
  CREATE INDEX IF NOT EXISTS "venue_rels_space_include_id_idx" ON "venue_rels" USING btree ("space_include_id");
  CREATE INDEX IF NOT EXISTS "venue_rels_tag_id_idx" ON "venue_rels" USING btree ("tag_id");
  CREATE INDEX IF NOT EXISTS "venue_rels_activity_id_idx" ON "venue_rels" USING btree ("activity_id");
  CREATE INDEX IF NOT EXISTS "venue_rels_location_id_idx" ON "venue_rels" USING btree ("location_id");
  CREATE INDEX IF NOT EXISTS "_venue_v_parent_idx" ON "_venue_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_venue_v_version_version_owner_idx" ON "_venue_v" USING btree ("version_owner_id");
  CREATE INDEX IF NOT EXISTS "_venue_v_version_price_version_price_currency_idx" ON "_venue_v" USING btree ("version_price_currency_id");
  CREATE INDEX IF NOT EXISTS "_venue_v_version_version_map_idx" ON "_venue_v" USING btree ("version_map_id");
  CREATE INDEX IF NOT EXISTS "_venue_v_version_version_updated_at_idx" ON "_venue_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_venue_v_version_version_created_at_idx" ON "_venue_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_venue_v_version_version__status_idx" ON "_venue_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_venue_v_created_at_idx" ON "_venue_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_venue_v_updated_at_idx" ON "_venue_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_venue_v_latest_idx" ON "_venue_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_venue_v_rels_order_idx" ON "_venue_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_venue_v_rels_parent_idx" ON "_venue_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_venue_v_rels_path_idx" ON "_venue_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_venue_v_rels_gallery_media_id_idx" ON "_venue_v_rels" USING btree ("gallery_media_id");
  CREATE INDEX IF NOT EXISTS "_venue_v_rels_space_include_id_idx" ON "_venue_v_rels" USING btree ("space_include_id");
  CREATE INDEX IF NOT EXISTS "_venue_v_rels_tag_id_idx" ON "_venue_v_rels" USING btree ("tag_id");
  CREATE INDEX IF NOT EXISTS "_venue_v_rels_activity_id_idx" ON "_venue_v_rels" USING btree ("activity_id");
  CREATE INDEX IF NOT EXISTS "_venue_v_rels_location_id_idx" ON "_venue_v_rels" USING btree ("location_id");
  CREATE INDEX IF NOT EXISTS "owner_profile_logo_idx" ON "owner_profile" USING btree ("logo_id");
  CREATE INDEX IF NOT EXISTS "owner_profile_updated_at_idx" ON "owner_profile" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "owner_profile_created_at_idx" ON "owner_profile" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "owner_profile__status_idx" ON "owner_profile" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "_owner_profile_v_parent_idx" ON "_owner_profile_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_owner_profile_v_version_version_logo_idx" ON "_owner_profile_v" USING btree ("version_logo_id");
  CREATE INDEX IF NOT EXISTS "_owner_profile_v_version_version_updated_at_idx" ON "_owner_profile_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_owner_profile_v_version_version_created_at_idx" ON "_owner_profile_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_owner_profile_v_version_version__status_idx" ON "_owner_profile_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_owner_profile_v_created_at_idx" ON "_owner_profile_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_owner_profile_v_updated_at_idx" ON "_owner_profile_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_owner_profile_v_latest_idx" ON "_owner_profile_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "owner_profile_idx" ON "owner" USING btree ("profile_id");
  CREATE INDEX IF NOT EXISTS "owner_updated_at_idx" ON "owner" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "owner_created_at_idx" ON "owner" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "owner_email_idx" ON "owner" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "activity_updated_at_idx" ON "activity" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "activity_created_at_idx" ON "activity" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "tag_tag_group_idx" ON "tag" USING btree ("tag_group_id");
  CREATE INDEX IF NOT EXISTS "tag_updated_at_idx" ON "tag" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "tag_created_at_idx" ON "tag" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "tag_group_updated_at_idx" ON "tag_group" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "tag_group_created_at_idx" ON "tag_group" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "gallery_media_updated_at_idx" ON "gallery_media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "gallery_media_created_at_idx" ON "gallery_media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "gallery_media_filename_idx" ON "gallery_media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "logo_image_updated_at_idx" ON "logo_image" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "logo_image_created_at_idx" ON "logo_image" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "logo_image_filename_idx" ON "logo_image" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "map_image_updated_at_idx" ON "map_image" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "map_image_created_at_idx" ON "map_image" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "map_image_filename_idx" ON "map_image" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "location_updated_at_idx" ON "location" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "location_created_at_idx" ON "location" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "currency_updated_at_idx" ON "currency" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "currency_created_at_idx" ON "currency" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "space_include_updated_at_idx" ON "space_include" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "space_include_created_at_idx" ON "space_include" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "admin_updated_at_idx" ON "admin" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "admin_created_at_idx" ON "admin" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "admin_email_idx" ON "admin" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_venue_booking_request_id_idx" ON "payload_locked_documents_rels" USING btree ("venue_booking_request_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_new_venue_request_id_idx" ON "payload_locked_documents_rels" USING btree ("new_venue_request_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_venue_id_idx" ON "payload_locked_documents_rels" USING btree ("venue_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_owner_profile_id_idx" ON "payload_locked_documents_rels" USING btree ("owner_profile_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_owner_id_idx" ON "payload_locked_documents_rels" USING btree ("owner_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_activity_id_idx" ON "payload_locked_documents_rels" USING btree ("activity_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_tag_id_idx" ON "payload_locked_documents_rels" USING btree ("tag_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_tag_group_id_idx" ON "payload_locked_documents_rels" USING btree ("tag_group_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_gallery_media_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_logo_image_id_idx" ON "payload_locked_documents_rels" USING btree ("logo_image_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_map_image_id_idx" ON "payload_locked_documents_rels" USING btree ("map_image_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_location_id_idx" ON "payload_locked_documents_rels" USING btree ("location_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_currency_id_idx" ON "payload_locked_documents_rels" USING btree ("currency_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_space_include_id_idx" ON "payload_locked_documents_rels" USING btree ("space_include_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_admin_id_idx" ON "payload_locked_documents_rels" USING btree ("admin_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_owner_id_idx" ON "payload_preferences_rels" USING btree ("owner_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_admin_id_idx" ON "payload_preferences_rels" USING btree ("admin_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "venue_booking_request" CASCADE;
  DROP TABLE "new_venue_request" CASCADE;
  DROP TABLE "new_venue_request_rels" CASCADE;
  DROP TABLE "venue" CASCADE;
  DROP TABLE "venue_rels" CASCADE;
  DROP TABLE "_venue_v" CASCADE;
  DROP TABLE "_venue_v_rels" CASCADE;
  DROP TABLE "owner_profile" CASCADE;
  DROP TABLE "_owner_profile_v" CASCADE;
  DROP TABLE "owner" CASCADE;
  DROP TABLE "activity" CASCADE;
  DROP TABLE "tag" CASCADE;
  DROP TABLE "tag_group" CASCADE;
  DROP TABLE "gallery_media" CASCADE;
  DROP TABLE "logo_image" CASCADE;
  DROP TABLE "map_image" CASCADE;
  DROP TABLE "location" CASCADE;
  DROP TABLE "currency" CASCADE;
  DROP TABLE "space_include" CASCADE;
  DROP TABLE "admin" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_venue_area_size_units";
  DROP TYPE "public"."enum_venue_status";
  DROP TYPE "public"."enum__venue_v_version_area_size_units";
  DROP TYPE "public"."enum__venue_v_version_status";
  DROP TYPE "public"."enum_owner_profile_status";
  DROP TYPE "public"."enum__owner_profile_v_version_status";`)
}
