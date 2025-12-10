import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ADD COLUMN "hero_background_layers_base_layer_fallback_image_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_background_layers_base_layer_fallback_image_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_background_layers_base_layer_fallback_image_id_media_id_fk" FOREIGN KEY ("hero_background_layers_base_layer_fallback_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_background_layers_base_layer_fallback_image_id_media_id_fk" FOREIGN KEY ("version_hero_background_layers_base_layer_fallback_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_hero_background_layers_base_layer_hero_background_layers_base_layer_fallback_image_idx" ON "pages" USING btree ("hero_background_layers_base_layer_fallback_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_background_layers_base_layer_version_hero_background_layers_base_layer_fallback_image_idx" ON "_pages_v" USING btree ("version_hero_background_layers_base_layer_fallback_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" DROP CONSTRAINT "pages_hero_background_layers_base_layer_fallback_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_hero_background_layers_base_layer_fallback_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "pages_hero_background_layers_base_layer_hero_background_layers_base_layer_fallback_image_idx";
  DROP INDEX IF EXISTS "_pages_v_version_hero_background_layers_base_layer_version_hero_background_layers_base_layer_fallback_image_idx";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_background_layers_base_layer_fallback_image_id";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_background_layers_base_layer_fallback_image_id";`)
}
