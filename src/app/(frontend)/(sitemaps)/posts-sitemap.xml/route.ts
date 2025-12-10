import { getAllStaticPosts } from '@/data/staticData'
import { getServerSideSitemap } from 'next-sitemap'
import { unstable_cache } from 'next/cache'

const getPostsSitemap = unstable_cache(
  async () => {
    const allPosts = getAllStaticPosts()
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    const dateFallback = new Date().toISOString()

    const sitemap = allPosts
      .filter((post: any) => Boolean(post?.slug))
      .map((post: any) => ({
        loc: `${SITE_URL}/posts/${post?.slug}`,
        lastmod: post.updatedAt || dateFallback,
      }))

    return sitemap
  },
  ['posts-sitemap'],
  {
    tags: ['posts-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPostsSitemap()

  return getServerSideSitemap(sitemap)
}
