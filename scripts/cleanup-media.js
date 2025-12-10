#!/usr/bin/env node

/**
 * Script to clean up media library:
 * 1. Remove size variants from JSON data (keep only main url)
 * 2. Remove resized image files (keep only originals)
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DATA_DIR = path.join(__dirname, '../data')
const MEDIA_DIR = path.join(__dirname, '../public/media')

// Pattern to match resized images (e.g., image-300x300.jpg, image-500x500.png)
const RESIZED_PATTERN = /-\d+x\d+\.(jpg|jpeg|png|webp|gif)$/i

/**
 * Get all JSON files recursively
 */
function getAllJsonFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      getAllJsonFiles(filePath, fileList)
    } else if (file.endsWith('.json')) {
      fileList.push(filePath)
    }
  })

  return fileList
}

/**
 * Clean media object - remove thumbnailURL and sizes, keep only url
 */
function cleanMediaObject(obj) {
  if (!obj || typeof obj !== 'object') return obj

  if (Array.isArray(obj)) {
    return obj.map(cleanMediaObject)
  }

  const cleaned = { ...obj }

  // Remove thumbnailURL and sizes from media objects
  if (cleaned.url && (cleaned.thumbnailURL || cleaned.sizes)) {
    delete cleaned.thumbnailURL
    delete cleaned.sizes
  }

  // Recursively clean nested objects
  for (const key in cleaned) {
    if (cleaned[key] && typeof cleaned[key] === 'object') {
      cleaned[key] = cleanMediaObject(cleaned[key])
    }
  }

  return cleaned
}

/**
 * Get all image files in media directory
 */
function getImageFiles(dir) {
  const files = fs.readdirSync(dir)
  return files.filter((file) => {
    const ext = path.extname(file).toLowerCase()
    return ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'].includes(ext)
  })
}

/**
 * Identify original vs resized images
 */
function categorizeImages(files) {
  const originals = new Set()
  const resized = []

  // First pass: identify resized images
  files.forEach((file) => {
    if (RESIZED_PATTERN.test(file)) {
      resized.push(file)
    } else {
      originals.add(file)
    }
  })

  return { originals: Array.from(originals), resized }
}

/**
 * Main cleanup function
 */
function cleanup() {
  console.log('🧹 Starting media cleanup...\n')

  // Step 1: Clean JSON data files
  console.log('📝 Cleaning JSON data files...')
  const jsonFiles = getAllJsonFiles(DATA_DIR)
  let cleanedCount = 0

  jsonFiles.forEach((filePath) => {
    try {
      const content = fs.readFileSync(filePath, 'utf8')
      const data = JSON.parse(content)
      const cleaned = cleanMediaObject(data)
      fs.writeFileSync(filePath, JSON.stringify(cleaned, null, 2) + '\n')
      cleanedCount++
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message)
    }
  })

  console.log(`✅ Cleaned ${cleanedCount} JSON files\n`)

  // Step 2: Identify and remove resized images
  console.log('🖼️  Analyzing media files...')
  if (!fs.existsSync(MEDIA_DIR)) {
    console.log('⚠️  Media directory not found, skipping file cleanup')
    return
  }

  const imageFiles = getImageFiles(MEDIA_DIR)
  const { originals, resized } = categorizeImages(imageFiles)

  console.log(`📊 Found ${originals.length} original images`)
  console.log(`📊 Found ${resized.length} resized images\n`)

  if (resized.length === 0) {
    console.log('✨ No resized images to remove!')
    return
  }

  // Ask for confirmation (in a real script, you might want to use readline)
  console.log('🗑️  The following resized images will be removed:')
  console.log('   (showing first 10)')
  resized.slice(0, 10).forEach((file) => console.log(`   - ${file}`))
  if (resized.length > 10) {
    console.log(`   ... and ${resized.length - 10} more`)
  }
  console.log()

  // Remove resized images
  let removedCount = 0
  resized.forEach((file) => {
    try {
      const filePath = path.join(MEDIA_DIR, file)
      fs.unlinkSync(filePath)
      removedCount++
    } catch (error) {
      console.error(`❌ Error removing ${file}:`, error.message)
    }
  })

  console.log(`✅ Removed ${removedCount} resized image files`)
  console.log(`💾 Saved approximately ${removedCount * 50}KB (estimated)\n`)

  console.log('✨ Cleanup complete!')
}

// Run cleanup
cleanup()
