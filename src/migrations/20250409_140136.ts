import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_memberships_block_memberships_features" CASCADE;
  DROP TABLE "pages_blocks_memberships_block_memberships" CASCADE;
  DROP TABLE "pages_blocks_memberships_block" CASCADE;
  DROP TABLE "_pages_v_blocks_memberships_block_memberships_features" CASCADE;
  DROP TABLE "_pages_v_blocks_memberships_block_memberships" CASCADE;
  DROP TABLE "_pages_v_blocks_memberships_block" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_memberships_block_memberships_link_style";
  DROP TYPE "public"."enum_pages_blocks_memberships_block_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_memberships_block_memberships_link_style";
  DROP TYPE "public"."enum__pages_v_blocks_memberships_block_spacing";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_memberships_block_memberships_link_style" AS ENUM('default', 'outline', 'brand', 'black');
  CREATE TYPE "public"."enum_pages_blocks_memberships_block_spacing" AS ENUM('none', 'default', 'small');
  CREATE TYPE "public"."enum__pages_v_blocks_memberships_block_memberships_link_style" AS ENUM('default', 'outline', 'brand', 'black');
  CREATE TYPE "public"."enum__pages_v_blocks_memberships_block_spacing" AS ENUM('none', 'default', 'small');
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
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_memberships_block_path_idx" ON "_pages_v_blocks_memberships_block" USING btree ("_path");`)
}
