import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_memberships_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_memberships_link_appearance" AS ENUM('default', 'outline', 'brandGradient', 'blackGradient', 'glassyGradient');
  CREATE TABLE IF NOT EXISTS "memberships_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "memberships" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"price" varchar NOT NULL,
  	"popular" boolean DEFAULT false,
  	"badge_text" varchar,
  	"age_group" varchar,
  	"link_type" "enum_memberships_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_memberships_link_appearance" DEFAULT 'default',
  	"savings_text" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "memberships_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  ALTER TABLE "pages_blocks_memberships_block_memberships_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_memberships_block_memberships" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_memberships_block_memberships_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_memberships_block_memberships" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_memberships_block_memberships_features" CASCADE;
  DROP TABLE "pages_blocks_memberships_block_memberships" CASCADE;
  DROP TABLE "_pages_v_blocks_memberships_block_memberships_features" CASCADE;
  DROP TABLE "_pages_v_blocks_memberships_block_memberships" CASCADE;
  ALTER TABLE "pages_rels" ADD COLUMN "memberships_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "memberships_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "memberships_id" integer;
  DO $$ BEGIN
   ALTER TABLE "memberships_features" ADD CONSTRAINT "memberships_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."memberships"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "memberships_rels" ADD CONSTRAINT "memberships_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."memberships"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "memberships_rels" ADD CONSTRAINT "memberships_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "memberships_rels" ADD CONSTRAINT "memberships_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "memberships_features_order_idx" ON "memberships_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "memberships_features_parent_id_idx" ON "memberships_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "memberships_slug_idx" ON "memberships" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "memberships_updated_at_idx" ON "memberships" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "memberships_created_at_idx" ON "memberships" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "memberships_rels_order_idx" ON "memberships_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "memberships_rels_parent_idx" ON "memberships_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "memberships_rels_path_idx" ON "memberships_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "memberships_rels_pages_id_idx" ON "memberships_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "memberships_rels_posts_id_idx" ON "memberships_rels" USING btree ("posts_id");
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_memberships_fk" FOREIGN KEY ("memberships_id") REFERENCES "public"."memberships"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_memberships_fk" FOREIGN KEY ("memberships_id") REFERENCES "public"."memberships"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_memberships_fk" FOREIGN KEY ("memberships_id") REFERENCES "public"."memberships"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_rels_memberships_id_idx" ON "pages_rels" USING btree ("memberships_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_memberships_id_idx" ON "_pages_v_rels" USING btree ("memberships_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_memberships_id_idx" ON "payload_locked_documents_rels" USING btree ("memberships_id");
  DROP TYPE "public"."enum_pages_blocks_memberships_block_memberships_link_style";
  DROP TYPE "public"."enum__pages_v_blocks_memberships_block_memberships_link_style";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_memberships_block_memberships_link_style" AS ENUM('default', 'outline', 'brand', 'black');
  CREATE TYPE "public"."enum__pages_v_blocks_memberships_block_memberships_link_style" AS ENUM('default', 'outline', 'brand', 'black');
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
  
  ALTER TABLE "memberships_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "memberships" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "memberships_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "memberships_features" CASCADE;
  DROP TABLE "memberships" CASCADE;
  DROP TABLE "memberships_rels" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_memberships_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_memberships_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_memberships_fk";
  
  DROP INDEX IF EXISTS "pages_rels_memberships_id_idx";
  DROP INDEX IF EXISTS "_pages_v_rels_memberships_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_memberships_id_idx";
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
   ALTER TABLE "_pages_v_blocks_memberships_block_memberships_features" ADD CONSTRAINT "_pages_v_blocks_memberships_block_memberships_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_memberships_block_memberships"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_memberships_block_memberships" ADD CONSTRAINT "_pages_v_blocks_memberships_block_memberships_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_memberships_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_memberships_block_memberships_features_order_idx" ON "pages_blocks_memberships_block_memberships_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_memberships_block_memberships_features_parent_id_idx" ON "pages_blocks_memberships_block_memberships_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_memberships_block_memberships_order_idx" ON "pages_blocks_memberships_block_memberships" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_memberships_block_memberships_parent_id_idx" ON "pages_blocks_memberships_block_memberships" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_memberships_block_memberships_features_order_idx" ON "_pages_v_blocks_memberships_block_memberships_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_memberships_block_memberships_features_parent_id_idx" ON "_pages_v_blocks_memberships_block_memberships_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_memberships_block_memberships_order_idx" ON "_pages_v_blocks_memberships_block_memberships" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_memberships_block_memberships_parent_id_idx" ON "_pages_v_blocks_memberships_block_memberships" USING btree ("_parent_id");
  ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "memberships_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN IF EXISTS "memberships_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "memberships_id";
  DROP TYPE "public"."enum_memberships_link_type";
  DROP TYPE "public"."enum_memberships_link_appearance";`)
}
