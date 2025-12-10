import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_classes_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_classes_links_link_appearance" AS ENUM('default', 'brandGradient', 'outline');
  ALTER TYPE "public"."enum_pages_blocks_classes_block_items_links_link_type" RENAME TO "enum_pages_blocks_classes_block_link_type";
  ALTER TYPE "public"."enum_pages_blocks_classes_block_items_links_link_appearance" RENAME TO "enum_pages_blocks_classes_block_link_appearance";
  ALTER TYPE "public"."enum__pages_v_blocks_classes_block_items_links_link_type" RENAME TO "enum__pages_v_blocks_classes_block_link_type";
  ALTER TYPE "public"."enum__pages_v_blocks_classes_block_items_links_link_appearance" RENAME TO "enum__pages_v_blocks_classes_block_link_appearance";
  CREATE TABLE IF NOT EXISTS "classes_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_classes_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_classes_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "classes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"image_id" integer NOT NULL,
  	"age_requirement" varchar,
  	"price" varchar,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "classes_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  ALTER TABLE "pages_blocks_classes_block_items_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_classes_block_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_classes_block_items_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_classes_block_items" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_classes_block_items_links" CASCADE;
  DROP TABLE "pages_blocks_classes_block_items" CASCADE;
  DROP TABLE "_pages_v_blocks_classes_block_items_links" CASCADE;
  DROP TABLE "_pages_v_blocks_classes_block_items" CASCADE;
  ALTER TABLE "pages_blocks_classes_block" ADD COLUMN "show_button" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_classes_block" ADD COLUMN "link_type" "enum_pages_blocks_classes_block_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_classes_block" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "pages_blocks_classes_block" ADD COLUMN "link_url" varchar;
  ALTER TABLE "pages_blocks_classes_block" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_classes_block" ADD COLUMN "link_appearance" "enum_pages_blocks_classes_block_link_appearance" DEFAULT 'default';
  ALTER TABLE "pages_rels" ADD COLUMN "classes_id" integer;
  ALTER TABLE "_pages_v_blocks_classes_block" ADD COLUMN "show_button" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_classes_block" ADD COLUMN "link_type" "enum__pages_v_blocks_classes_block_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_classes_block" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_classes_block" ADD COLUMN "link_url" varchar;
  ALTER TABLE "_pages_v_blocks_classes_block" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_classes_block" ADD COLUMN "link_appearance" "enum__pages_v_blocks_classes_block_link_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_rels" ADD COLUMN "classes_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "classes_id" integer;
  DO $$ BEGIN
   ALTER TABLE "classes_links" ADD CONSTRAINT "classes_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."classes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "classes" ADD CONSTRAINT "classes_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "classes_rels" ADD CONSTRAINT "classes_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."classes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "classes_rels" ADD CONSTRAINT "classes_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "classes_rels" ADD CONSTRAINT "classes_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "classes_links_order_idx" ON "classes_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "classes_links_parent_id_idx" ON "classes_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "classes_slug_idx" ON "classes" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "classes_image_idx" ON "classes" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "classes_updated_at_idx" ON "classes" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "classes_created_at_idx" ON "classes" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "classes_rels_order_idx" ON "classes_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "classes_rels_parent_idx" ON "classes_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "classes_rels_path_idx" ON "classes_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "classes_rels_pages_id_idx" ON "classes_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "classes_rels_posts_id_idx" ON "classes_rels" USING btree ("posts_id");
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_classes_fk" FOREIGN KEY ("classes_id") REFERENCES "public"."classes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_classes_fk" FOREIGN KEY ("classes_id") REFERENCES "public"."classes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_classes_fk" FOREIGN KEY ("classes_id") REFERENCES "public"."classes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_rels_classes_id_idx" ON "pages_rels" USING btree ("classes_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_classes_id_idx" ON "_pages_v_rels" USING btree ("classes_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_classes_id_idx" ON "payload_locked_documents_rels" USING btree ("classes_id");
  ALTER TABLE "pages_blocks_classes_block" DROP COLUMN IF EXISTS "show_all_items";
  ALTER TABLE "pages_blocks_classes_block" DROP COLUMN IF EXISTS "initial_items_to_show";
  ALTER TABLE "pages_blocks_classes_block" DROP COLUMN IF EXISTS "initial_items_to_show_mobile";
  ALTER TABLE "_pages_v_blocks_classes_block" DROP COLUMN IF EXISTS "show_all_items";
  ALTER TABLE "_pages_v_blocks_classes_block" DROP COLUMN IF EXISTS "initial_items_to_show";
  ALTER TABLE "_pages_v_blocks_classes_block" DROP COLUMN IF EXISTS "initial_items_to_show_mobile";
  
  -- Fix: Properly handle the enum type change by first removing the default constraint
  ALTER TABLE "public"."pages_blocks_classes_block" ALTER COLUMN "link_appearance" DROP DEFAULT;
  ALTER TABLE "public"."_pages_v_blocks_classes_block" ALTER COLUMN "link_appearance" DROP DEFAULT;
  
  -- Now create the new enum type with a temporary name
  CREATE TYPE "public"."enum_pages_blocks_classes_block_link_appearance_new" AS ENUM('default', 'outline', 'brandGradient', 'blackGradient', 'glassyGradient');
  CREATE TYPE "public"."enum__pages_v_blocks_classes_block_link_appearance_new" AS ENUM('default', 'outline', 'brandGradient', 'blackGradient', 'glassyGradient');
  
  -- Convert existing data to text and then to the new enum type
  ALTER TABLE "public"."pages_blocks_classes_block" 
    ALTER COLUMN "link_appearance" TYPE "public"."enum_pages_blocks_classes_block_link_appearance_new" 
    USING CASE
      WHEN "link_appearance"::text = 'default' THEN 'default'
      WHEN "link_appearance"::text = 'outline' THEN 'outline'
      WHEN "link_appearance"::text = 'brandGradient' THEN 'brandGradient'
      ELSE 'default'
    END::"public"."enum_pages_blocks_classes_block_link_appearance_new";
    
  ALTER TABLE "public"."_pages_v_blocks_classes_block" 
    ALTER COLUMN "link_appearance" TYPE "public"."enum__pages_v_blocks_classes_block_link_appearance_new" 
    USING CASE
      WHEN "link_appearance"::text = 'default' THEN 'default'
      WHEN "link_appearance"::text = 'outline' THEN 'outline'
      WHEN "link_appearance"::text = 'brandGradient' THEN 'brandGradient'
      ELSE 'default'
    END::"public"."enum__pages_v_blocks_classes_block_link_appearance_new";
  
  -- Drop the old enum types with CASCADE
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_classes_block_link_appearance" CASCADE;
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_classes_block_link_appearance" CASCADE;
  
  -- Rename the new enum types to the original names
  ALTER TYPE "public"."enum_pages_blocks_classes_block_link_appearance_new" RENAME TO "enum_pages_blocks_classes_block_link_appearance";
  ALTER TYPE "public"."enum__pages_v_blocks_classes_block_link_appearance_new" RENAME TO "enum__pages_v_blocks_classes_block_link_appearance";
  
  -- Reset the default values
  ALTER TABLE "public"."pages_blocks_classes_block" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::"public"."enum_pages_blocks_classes_block_link_appearance";
  ALTER TABLE "public"."_pages_v_blocks_classes_block" ALTER COLUMN "link_appearance" SET DEFAULT 'default'::"public"."enum__pages_v_blocks_classes_block_link_appearance";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   -- Fix for down migration - handle the enum types correctly
   ALTER TABLE "public"."pages_blocks_classes_block" ALTER COLUMN "link_appearance" DROP DEFAULT;
   ALTER TABLE "public"."_pages_v_blocks_classes_block" ALTER COLUMN "link_appearance" DROP DEFAULT;
   
   -- Create new enum types with the old values
   CREATE TYPE "public"."enum_pages_blocks_classes_block_items_links_link_appearance_new" AS ENUM('default', 'brandGradient', 'outline');
   CREATE TYPE "public"."enum__pages_v_blocks_classes_block_items_links_link_appearance_new" AS ENUM('default', 'brandGradient', 'outline');
   
   -- Convert data
   ALTER TABLE "public"."pages_blocks_classes_block" 
     ALTER COLUMN "link_appearance" TYPE "public"."enum_pages_blocks_classes_block_items_links_link_appearance_new"
     USING CASE
       WHEN "link_appearance"::text = 'default' THEN 'default'
       WHEN "link_appearance"::text = 'outline' THEN 'outline'
       WHEN "link_appearance"::text = 'brandGradient' THEN 'brandGradient'
       ELSE 'default'
     END::"public"."enum_pages_blocks_classes_block_items_links_link_appearance_new";
     
   ALTER TABLE "public"."_pages_v_blocks_classes_block" 
     ALTER COLUMN "link_appearance" TYPE "public"."enum__pages_v_blocks_classes_block_items_links_link_appearance_new"
     USING CASE
       WHEN "link_appearance"::text = 'default' THEN 'default'
       WHEN "link_appearance"::text = 'outline' THEN 'outline'
       WHEN "link_appearance"::text = 'brandGradient' THEN 'brandGradient'
       ELSE 'default'
     END::"public"."enum__pages_v_blocks_classes_block_items_links_link_appearance_new";
   
   -- Continue with the rest of the down migration
   ALTER TYPE "public"."enum_pages_blocks_classes_block_link_type" RENAME TO "enum_pages_blocks_classes_block_items_links_link_type";
   ALTER TYPE "public"."enum_pages_blocks_classes_block_link_appearance" RENAME TO "enum_pages_blocks_classes_block_items_links_link_appearance";
   ALTER TYPE "public"."enum__pages_v_blocks_classes_block_link_type" RENAME TO "enum__pages_v_blocks_classes_block_items_links_link_type";
   ALTER TYPE "public"."enum__pages_v_blocks_classes_block_link_appearance" RENAME TO "enum__pages_v_blocks_classes_block_items_links_link_appearance";
   
   CREATE TABLE IF NOT EXISTS "pages_blocks_classes_block_items_links" (
     "_order" integer NOT NULL,
     "_parent_id" varchar NOT NULL,
     "id" varchar PRIMARY KEY NOT NULL,
     "link_type" "enum_pages_blocks_classes_block_items_links_link_type" DEFAULT 'reference',
     "link_new_tab" boolean,
     "link_url" varchar,
     "link_label" varchar,
     "link_appearance" "enum_pages_blocks_classes_block_items_links_link_appearance_new" DEFAULT 'default'
   );
   
   CREATE TABLE IF NOT EXISTS "pages_blocks_classes_block_items" (
     "_order" integer NOT NULL,
     "_parent_id" varchar NOT NULL,
     "id" varchar PRIMARY KEY NOT NULL,
     "image_id" integer,
     "title" varchar,
     "age_requirement" varchar,
     "price" varchar,
     "description" varchar
   );
   
   CREATE TABLE IF NOT EXISTS "_pages_v_blocks_classes_block_items_links" (
     "_order" integer NOT NULL,
     "_parent_id" integer NOT NULL,
     "id" serial PRIMARY KEY NOT NULL,
     "link_type" "enum__pages_v_blocks_classes_block_items_links_link_type" DEFAULT 'reference',
     "link_new_tab" boolean,
     "link_url" varchar,
     "link_label" varchar,
     "link_appearance" "enum__pages_v_blocks_classes_block_items_links_link_appearance_new" DEFAULT 'default',
     "_uuid" varchar
   );
   
   CREATE TABLE IF NOT EXISTS "_pages_v_blocks_classes_block_items" (
     "_order" integer NOT NULL,
     "_parent_id" integer NOT NULL,
     "id" serial PRIMARY KEY NOT NULL,
     "image_id" integer,
     "title" varchar,
     "age_requirement" varchar,
     "price" varchar,
     "description" varchar,
     "_uuid" varchar
   );
   
   ALTER TABLE "classes_links" DISABLE ROW LEVEL SECURITY;
   ALTER TABLE "classes" DISABLE ROW LEVEL SECURITY;
   ALTER TABLE "classes_rels" DISABLE ROW LEVEL SECURITY;
   DROP TABLE "classes_links" CASCADE;
   DROP TABLE "classes" CASCADE;
   DROP TABLE "classes_rels" CASCADE;
   
   -- Drop and rename the original enum types for cleaner migration
   DROP TYPE IF EXISTS "public"."enum_pages_blocks_classes_block_items_links_link_appearance";
   DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_classes_block_items_links_link_appearance";
   ALTER TYPE "public"."enum_pages_blocks_classes_block_items_links_link_appearance_new" RENAME TO "enum_pages_blocks_classes_block_items_links_link_appearance";
   ALTER TYPE "public"."enum__pages_v_blocks_classes_block_items_links_link_appearance_new" RENAME TO "enum__pages_v_blocks_classes_block_items_links_link_appearance";
   
   ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_classes_fk";
   ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_classes_fk";
   ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_classes_fk";
   
   DROP INDEX IF EXISTS "pages_rels_classes_id_idx";
   DROP INDEX IF EXISTS "_pages_v_rels_classes_id_idx";
   DROP INDEX IF EXISTS "payload_locked_documents_rels_classes_id_idx";
   
   ALTER TABLE "pages_blocks_classes_block" ADD COLUMN "show_all_items" boolean DEFAULT false;
   ALTER TABLE "pages_blocks_classes_block" ADD COLUMN "initial_items_to_show" numeric DEFAULT 3;
   ALTER TABLE "pages_blocks_classes_block" ADD COLUMN "initial_items_to_show_mobile" numeric DEFAULT 1;
   ALTER TABLE "_pages_v_blocks_classes_block" ADD COLUMN "show_all_items" boolean DEFAULT false;
   ALTER TABLE "_pages_v_blocks_classes_block" ADD COLUMN "initial_items_to_show" numeric DEFAULT 3;
   ALTER TABLE "_pages_v_blocks_classes_block" ADD COLUMN "initial_items_to_show_mobile" numeric DEFAULT 1;
   
   DO $$ BEGIN
     ALTER TABLE "pages_blocks_classes_block_items_links" ADD CONSTRAINT "pages_blocks_classes_block_items_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_classes_block_items"("id") ON DELETE cascade ON UPDATE no action;
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;
   
   DO $$ BEGIN
     ALTER TABLE "pages_blocks_classes_block_items" ADD CONSTRAINT "pages_blocks_classes_block_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;
   
   DO $$ BEGIN
     ALTER TABLE "pages_blocks_classes_block_items" ADD CONSTRAINT "pages_blocks_classes_block_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_classes_block"("id") ON DELETE cascade ON UPDATE no action;
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;
   
   DO $$ BEGIN
     ALTER TABLE "_pages_v_blocks_classes_block_items_links" ADD CONSTRAINT "_pages_v_blocks_classes_block_items_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_classes_block_items"("id") ON DELETE cascade ON UPDATE no action;
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;
   
   DO $$ BEGIN
     ALTER TABLE "_pages_v_blocks_classes_block_items" ADD CONSTRAINT "_pages_v_blocks_classes_block_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;
   
   DO $$ BEGIN
     ALTER TABLE "_pages_v_blocks_classes_block_items" ADD CONSTRAINT "_pages_v_blocks_classes_block_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_classes_block"("id") ON DELETE cascade ON UPDATE no action;
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;
   
   CREATE INDEX IF NOT EXISTS "pages_blocks_classes_block_items_links_order_idx" ON "pages_blocks_classes_block_items_links" USING btree ("_order");
   CREATE INDEX IF NOT EXISTS "pages_blocks_classes_block_items_links_parent_id_idx" ON "pages_blocks_classes_block_items_links" USING btree ("_parent_id");
   CREATE INDEX IF NOT EXISTS "pages_blocks_classes_block_items_order_idx" ON "pages_blocks_classes_block_items" USING btree ("_order");
   CREATE INDEX IF NOT EXISTS "pages_blocks_classes_block_items_parent_id_idx" ON "pages_blocks_classes_block_items" USING btree ("_parent_id");
   CREATE INDEX IF NOT EXISTS "pages_blocks_classes_block_items_image_idx" ON "pages_blocks_classes_block_items" USING btree ("image_id");
   CREATE INDEX IF NOT EXISTS "_pages_v_blocks_classes_block_items_links_order_idx" ON "_pages_v_blocks_classes_block_items_links" USING btree ("_order");
   CREATE INDEX IF NOT EXISTS "_pages_v_blocks_classes_block_items_links_parent_id_idx" ON "_pages_v_blocks_classes_block_items_links" USING btree ("_parent_id");
   CREATE INDEX IF NOT EXISTS "_pages_v_blocks_classes_block_items_order_idx" ON "_pages_v_blocks_classes_block_items" USING btree ("_order");
   CREATE INDEX IF NOT EXISTS "_pages_v_blocks_classes_block_items_parent_id_idx" ON "_pages_v_blocks_classes_block_items" USING btree ("_parent_id");
   CREATE INDEX IF NOT EXISTS "_pages_v_blocks_classes_block_items_image_idx" ON "_pages_v_blocks_classes_block_items" USING btree ("image_id");
   
   ALTER TABLE "pages_blocks_classes_block" DROP COLUMN IF EXISTS "show_button";
   ALTER TABLE "pages_blocks_classes_block" DROP COLUMN IF EXISTS "link_type";
   ALTER TABLE "pages_blocks_classes_block" DROP COLUMN IF EXISTS "link_new_tab";
   ALTER TABLE "pages_blocks_classes_block" DROP COLUMN IF EXISTS "link_url";
   ALTER TABLE "pages_blocks_classes_block" DROP COLUMN IF EXISTS "link_label";
   ALTER TABLE "pages_blocks_classes_block" DROP COLUMN IF EXISTS "link_appearance";
   ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "classes_id";
   ALTER TABLE "_pages_v_blocks_classes_block" DROP COLUMN IF EXISTS "show_button";
   ALTER TABLE "_pages_v_blocks_classes_block" DROP COLUMN IF EXISTS "link_type";
   ALTER TABLE "_pages_v_blocks_classes_block" DROP COLUMN IF EXISTS "link_new_tab";
   ALTER TABLE "_pages_v_blocks_classes_block" DROP COLUMN IF EXISTS "link_url";
   ALTER TABLE "_pages_v_blocks_classes_block" DROP COLUMN IF EXISTS "link_label";
   ALTER TABLE "_pages_v_blocks_classes_block" DROP COLUMN IF EXISTS "link_appearance";
   ALTER TABLE "_pages_v_rels" DROP COLUMN IF EXISTS "classes_id";
   ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "classes_id";
   
   DROP TYPE "public"."enum_classes_links_link_type";
   DROP TYPE "public"."enum_classes_links_link_appearance";`)
}
