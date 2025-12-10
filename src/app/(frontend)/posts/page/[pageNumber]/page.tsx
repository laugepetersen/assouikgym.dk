import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { getAllStaticPosts } from '@/data/staticData'
import { notFound } from 'next/navigation'
import PageClient from './page.client'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const allPosts = getAllStaticPosts()

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const limit = 12
  const startIndex = (sanitizedPageNumber - 1) * limit
  const endIndex = startIndex + limit
  const posts = allPosts.slice(startIndex, endIndex)
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
        <PageRange
          collection="posts"
          currentPage={sanitizedPageNumber}
          limit={12}
          totalDocs={totalDocs}
        />
      </div>

      <CollectionArchive posts={posts} />

      <div className="container">
        {sanitizedPageNumber && totalPages > 1 && (
          <Pagination page={sanitizedPageNumber} totalPages={totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `AssouikGym Posts Page ${pageNumber || ''}`,
  }
}

export async function generateStaticParams() {
  const allPosts = getAllStaticPosts()
  const totalPages = Math.ceil(allPosts.length / 12)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
