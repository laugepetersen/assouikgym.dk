import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_memberships_block" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "pages_blocks_memberships_block" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_pages_v_blocks_memberships_block" DROP COLUMN IF EXISTS "title";
  ALTER TABLE "_pages_v_blocks_memberships_block" DROP COLUMN IF EXISTS "description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_memberships_block" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_memberships_block" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_memberships_block" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_memberships_block" ADD COLUMN "description" varchar;`)
}
