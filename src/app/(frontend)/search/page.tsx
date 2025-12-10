import type { Metadata } from 'next/types'

import { CardPostData } from '@/components/Card'
import { CollectionArchive } from '@/components/CollectionArchive'
import { getAllStaticPosts } from '@/data/staticData'
import { Search } from '@/search/Component'
import PageClient from './page.client'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}
export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const allPosts = getAllStaticPosts()

  // Simple client-side search filtering (can be enhanced)
  const filteredPosts = query
    ? allPosts.filter((post: any) => {
        const searchTerm = query.toLowerCase()
        return (
          post.title?.toLowerCase().includes(searchTerm) ||
          post.meta?.description?.toLowerCase().includes(searchTerm) ||
          post.meta?.title?.toLowerCase().includes(searchTerm) ||
          post.slug?.toLowerCase().includes(searchTerm)
        )
      })
    : []

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none text-center">
          <h1 className="mb-8 lg:mb-16">Search</h1>

          <div className="max-w-[50rem] mx-auto">
            <Search />
          </div>
        </div>
      </div>

      {filteredPosts.length > 0 ? (
        <CollectionArchive posts={filteredPosts.slice(0, 12) as CardPostData[]} />
      ) : (
        <div className="container">No results found.</div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `AssouikGym Search`,
  }
}
