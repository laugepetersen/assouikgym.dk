import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_footer_top_section_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_top_section_links_link_appearance" AS ENUM('default', 'outline', 'brandGradient', 'blackGradient');
  CREATE TABLE IF NOT EXISTS "footer_top_section_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_top_section_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_footer_top_section_links_link_appearance" DEFAULT 'default'
  );
  
  DROP TABLE "footer_nav_items" CASCADE;
  DO $$ BEGIN
   ALTER TABLE "footer_top_section_links" ADD CONSTRAINT "footer_top_section_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "footer_top_section_links_order_idx" ON "footer_top_section_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_top_section_links_parent_id_idx" ON "footer_top_section_links" USING btree ("_parent_id");
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "top_section_button_text";
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "top_section_button_link";
  DROP TYPE "public"."enum_footer_nav_items_link_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_footer_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE IF NOT EXISTS "footer_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  DROP TABLE "footer_top_section_links" CASCADE;
  ALTER TABLE "footer" ADD COLUMN "top_section_button_text" varchar DEFAULT 'Læs mere';
  ALTER TABLE "footer" ADD COLUMN "top_section_button_link" varchar DEFAULT '#';
  DO $$ BEGIN
   ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "footer_nav_items_order_idx" ON "footer_nav_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_nav_items_parent_id_idx" ON "footer_nav_items" USING btree ("_parent_id");
  DROP TYPE "public"."enum_footer_top_section_links_link_type";
  DROP TYPE "public"."enum_footer_top_section_links_link_appearance";`)
}
