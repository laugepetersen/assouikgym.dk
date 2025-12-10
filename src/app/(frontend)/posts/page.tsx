import type { Metadata } from 'next'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { getAllStaticPosts } from '@/data/staticData'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const allPosts = getAllStaticPosts()

  // Paginate manually (12 per page)
  const limit = 12
  const posts = allPosts.slice(0, limit)
  const totalDocs = allPosts.length
  const totalPages = Math.ceil(totalDocs / limit)

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Posts</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange collection="posts" currentPage={1} limit={12} totalDocs={totalDocs} />
      </div>

      <CollectionArchive posts={posts} />

      <div className="container">
        {totalPages > 1 && <Pagination page={1} totalPages={totalPages} />}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `AssouikGym Posts`,
  }
}
