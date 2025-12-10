import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_memberships_block_memberships_link_style" AS ENUM('default', 'outline', 'brand', 'black');
  CREATE TYPE "public"."enum_pages_blocks_memberships_block_spacing" AS ENUM('none', 'default', 'small');
  CREATE TYPE "public"."enum_pages_blocks_slider_block_slides_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_slider_block_slides_link_appearance" AS ENUM('default', 'transparent');
  CREATE TYPE "public"."enum__pages_v_blocks_memberships_block_memberships_link_style" AS ENUM('default', 'outline', 'brand', 'black');
  CREATE TYPE "public"."enum__pages_v_blocks_memberships_block_spacing" AS ENUM('none', 'default', 'small');
  CREATE TYPE "public"."enum__pages_v_blocks_slider_block_slides_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_slider_block_slides_link_appearance" AS ENUM('default', 'transparent');
  ALTER TYPE "public"."enum_pages_blocks_content_columns_link_appearance" ADD VALUE 'transparent';
  ALTER TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" ADD VALUE 'transparent';
  ALTER TYPE "public"."enum_header_buttons_links_link_appearance" ADD VALUE 'transparent';
  CREATE TABLE IF NOT EXISTS "pages_blocks_memberships_block_memberships_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_memberships_block_memberships" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"price" varchar,
  	"popular" boolean DEFAULT false,
  	"badge_text" varchar,
  	"age_group" varchar,
  	"link_url" varchar,
  	"link_text" varchar,
  	"link_style" "enum_pages_blocks_memberships_block_memberships_link_style" DEFAULT 'default',
  	"savings_text" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_memberships_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visibility" boolean DEFAULT true,
  	"anchor" varchar,
  	"spacing" "enum_pages_blocks_memberships_block_spacing" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_memberships_block_memberships_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_memberships_block_memberships" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"price" varchar,
  	"popular" boolean DEFAULT false,
  	"badge_text" varchar,
  	"age_group" varchar,
  	"link_url" varchar,
  	"link_text" varchar,
  	"link_style" "enum__pages_v_blocks_memberships_block_memberships_link_style" DEFAULT 'default',
  	"savings_text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_memberships_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"visibility" boolean DEFAULT true,
  	"anchor" varchar,
  	"spacing" "enum__pages_v_blocks_memberships_block_spacing" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_slider_block_slides" ADD COLUMN "link_type" "enum_pages_blocks_slider_block_slides_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_slider_block_slides" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "pages_blocks_slider_block_slides" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_slider_block_slides" ADD COLUMN "link_appearance" "enum_pages_blocks_slider_block_slides_link_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_slider_block_slides" ADD COLUMN "link_type" "enum__pages_v_blocks_slider_block_slides_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_slider_block_slides" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_slider_block_slides" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_slider_block_slides" ADD COLUMN "link_appearance" "enum__pages_v_blocks_slider_block_slides_link_appearance" DEFAULT 'default';
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_memberships_block_memberships_features" ADD CONSTRAINT "pages_blocks_memberships_block_memberships_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_memberships_block_memberships"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_memberships_block_memberships" ADD CONSTRAINT "pages_blocks_memberships_block_memberships_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_memberships_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_memberships_block" ADD CONSTRAINT "pages_blocks_memberships_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_memberships_block_memberships_features" ADD CONSTRAINT "_pages_v_blocks_memberships_block_memberships_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_memberships_block_memberships"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_memberships_block_memberships" ADD CONSTRAINT "_pages_v_blocks_memberships_block_memberships_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_memberships_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_memberships_block" ADD CONSTRAINT "_pages_v_blocks_memberships_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_memberships_block_memberships_features_order_idx" ON "pages_blocks_memberships_block_memberships_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_memberships_block_memberships_features_parent_id_idx" ON "pages_blocks_memberships_block_memberships_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_memberships_block_memberships_order_idx" ON "pages_blocks_memberships_block_memberships" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_memberships_block_memberships_parent_id_idx" ON "pages_blocks_memberships_block_memberships" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_memberships_block_order_idx" ON "pages_blocks_memberships_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_memberships_block_parent_id_idx" ON "pages_blocks_memberships_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_memberships_block_path_idx" ON "pages_blocks_memberships_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_memberships_block_memberships_features_order_idx" ON "_pages_v_blocks_memberships_block_memberships_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_memberships_block_memberships_features_parent_id_idx" ON "_pages_v_blocks_memberships_block_memberships_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_memberships_block_memberships_order_idx" ON "_pages_v_blocks_memberships_block_memberships" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_memberships_block_memberships_parent_id_idx" ON "_pages_v_blocks_memberships_block_memberships" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_memberships_block_order_idx" ON "_pages_v_blocks_memberships_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_memberships_block_parent_id_idx" ON "_pages_v_blocks_memberships_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_memberships_block_path_idx" ON "_pages_v_blocks_memberships_block" USING btree ("_path");
  ALTER TABLE "pages_blocks_slider_block_slides" DROP COLUMN IF EXISTS "link_text";
  ALTER TABLE "_pages_v_blocks_slider_block_slides" DROP COLUMN IF EXISTS "link_text";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_memberships_block_memberships_features" CASCADE;
  DROP TABLE "pages_blocks_memberships_block_memberships" CASCADE;
  DROP TABLE "pages_blocks_memberships_block" CASCADE;
  DROP TABLE "_pages_v_blocks_memberships_block_memberships_features" CASCADE;
  DROP TABLE "_pages_v_blocks_memberships_block_memberships" CASCADE;
  DROP TABLE "_pages_v_blocks_memberships_block" CASCADE;
  ALTER TABLE "pages_blocks_slider_block_slides" ADD COLUMN "link_text" varchar;
  ALTER TABLE "_pages_v_blocks_slider_block_slides" ADD COLUMN "link_text" varchar;
  ALTER TABLE "pages_blocks_slider_block_slides" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "pages_blocks_slider_block_slides" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "pages_blocks_slider_block_slides" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "pages_blocks_slider_block_slides" DROP COLUMN IF EXISTS "link_appearance";
  ALTER TABLE "_pages_v_blocks_slider_block_slides" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "_pages_v_blocks_slider_block_slides" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "_pages_v_blocks_slider_block_slides" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "_pages_v_blocks_slider_block_slides" DROP COLUMN IF EXISTS "link_appearance";
  ALTER TABLE "public"."pages_blocks_content_columns" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_appearance";
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_appearance" AS ENUM('default', 'outline', 'brandGradient', 'blackGradient', 'glassyGradient');
  ALTER TABLE "public"."pages_blocks_content_columns" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum_pages_blocks_content_columns_link_appearance" USING "link_appearance"::"public"."enum_pages_blocks_content_columns_link_appearance";
  ALTER TABLE "public"."_pages_v_blocks_content_columns" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance";
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline', 'brandGradient', 'blackGradient', 'glassyGradient');
  ALTER TABLE "public"."_pages_v_blocks_content_columns" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" USING "link_appearance"::"public"."enum__pages_v_blocks_content_columns_link_appearance";
  ALTER TABLE "public"."header_buttons_links" ALTER COLUMN "link_appearance" SET DATA TYPE text;
  DROP TYPE "public"."enum_header_buttons_links_link_appearance";
  CREATE TYPE "public"."enum_header_buttons_links_link_appearance" AS ENUM('default', 'outline', 'brandGradient', 'blackGradient', 'glassyGradient');
  ALTER TABLE "public"."header_buttons_links" ALTER COLUMN "link_appearance" SET DATA TYPE "public"."enum_header_buttons_links_link_appearance" USING "link_appearance"::"public"."enum_header_buttons_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_memberships_block_memberships_link_style";
  DROP TYPE "public"."enum_pages_blocks_memberships_block_spacing";
  DROP TYPE "public"."enum_pages_blocks_slider_block_slides_link_type";
  DROP TYPE "public"."enum_pages_blocks_slider_block_slides_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_memberships_block_memberships_link_style";
  DROP TYPE "public"."enum__pages_v_blocks_memberships_block_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_slider_block_slides_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_slider_block_slides_link_appearance";`)
}
