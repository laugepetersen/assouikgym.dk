/**
 * Static data utilities - reads from JSON files instead of Payload CMS
 * This allows the app to run without a database
 */

import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')

// Cache for loaded data
const cache = new Map<string, any>()

function readJsonFile<T>(filePath: string): T | null {
  try {
    const fullPath = path.join(DATA_DIR, filePath)
    if (!fs.existsSync(fullPath)) {
      console.warn(`Static data file not found: ${fullPath}`)
      return null
    }

    const content = fs.readFileSync(fullPath, 'utf-8')
    return JSON.parse(content) as T
  } catch (error) {
    console.error(`Error reading static data file ${filePath}:`, error)
    return null
  }
}

export function getStaticCollection<T>(collection: string): T[] {
  const cacheKey = `collection:${collection}`

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }

  const data = readJsonFile<T[]>(`collections/${collection}.json`)
  const result = data || []

  cache.set(cacheKey, result)
  return result
}

export function getStaticGlobal<T>(global: string): T | null {
  const cacheKey = `global:${global}`

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }

  const data = readJsonFile<T>(`globals/${global}.json`)

  if (data) {
    cache.set(cacheKey, data)
  }

  return data || null
}

export function getStaticPageBySlug(slug: string) {
  const pages = getStaticCollection<any>('pages')
  return pages.find((page: any) => page.slug === slug) || null
}

export function getStaticPostBySlug(slug: string) {
  const posts = getStaticCollection<any>('posts')
  return posts.find((post: any) => post.slug === slug) || null
}

export function getAllStaticPages() {
  return getStaticCollection<any>('pages')
}

export function getAllStaticPosts() {
  return getStaticCollection<any>('posts')
}
