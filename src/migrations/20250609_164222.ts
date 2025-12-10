import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_media_grid_block_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_media_grid_block_items_link_appearance" AS ENUM('default', 'transparent');
  CREATE TYPE "public"."enum_pages_blocks_media_grid_block_spacing" AS ENUM('none', 'default', 'small');
  CREATE TYPE "public"."enum__pages_v_blocks_media_grid_block_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_media_grid_block_items_link_appearance" AS ENUM('default', 'transparent');
  CREATE TYPE "public"."enum__pages_v_blocks_media_grid_block_spacing" AS ENUM('none', 'default', 'small');
  CREATE TABLE IF NOT EXISTS "pages_blocks_media_grid_block_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"heading" varchar,
  	"description" jsonb,
  	"link_type" "enum_pages_blocks_media_grid_block_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_media_grid_block_items_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_media_grid_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visibility" boolean DEFAULT true,
  	"anchor" varchar,
  	"spacing" "enum_pages_blocks_media_grid_block_spacing" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_media_grid_block_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"heading" varchar,
  	"description" jsonb,
  	"link_type" "enum__pages_v_blocks_media_grid_block_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_media_grid_block_items_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_media_grid_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"visibility" boolean DEFAULT true,
  	"anchor" varchar,
  	"spacing" "enum__pages_v_blocks_media_grid_block_spacing" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_media_grid_block_items" ADD CONSTRAINT "pages_blocks_media_grid_block_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_media_grid_block_items" ADD CONSTRAINT "pages_blocks_media_grid_block_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_media_grid_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_media_grid_block" ADD CONSTRAINT "pages_blocks_media_grid_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_media_grid_block_items" ADD CONSTRAINT "_pages_v_blocks_media_grid_block_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_media_grid_block_items" ADD CONSTRAINT "_pages_v_blocks_media_grid_block_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_media_grid_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_media_grid_block" ADD CONSTRAINT "_pages_v_blocks_media_grid_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_grid_block_items_order_idx" ON "pages_blocks_media_grid_block_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_grid_block_items_parent_id_idx" ON "pages_blocks_media_grid_block_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_grid_block_items_image_idx" ON "pages_blocks_media_grid_block_items" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_grid_block_order_idx" ON "pages_blocks_media_grid_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_grid_block_parent_id_idx" ON "pages_blocks_media_grid_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_grid_block_path_idx" ON "pages_blocks_media_grid_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_grid_block_items_order_idx" ON "_pages_v_blocks_media_grid_block_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_grid_block_items_parent_id_idx" ON "_pages_v_blocks_media_grid_block_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_grid_block_items_image_idx" ON "_pages_v_blocks_media_grid_block_items" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_grid_block_order_idx" ON "_pages_v_blocks_media_grid_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_grid_block_parent_id_idx" ON "_pages_v_blocks_media_grid_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_grid_block_path_idx" ON "_pages_v_blocks_media_grid_block" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_media_grid_block_items" CASCADE;
  DROP TABLE "pages_blocks_media_grid_block" CASCADE;
  DROP TABLE "_pages_v_blocks_media_grid_block_items" CASCADE;
  DROP TABLE "_pages_v_blocks_media_grid_block" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_media_grid_block_items_link_type";
  DROP TYPE "public"."enum_pages_blocks_media_grid_block_items_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_media_grid_block_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_media_grid_block_items_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_media_grid_block_items_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_media_grid_block_spacing";`)
}
