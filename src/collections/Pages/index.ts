import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { hero } from '@/heros/config'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { TextAndMedia } from '@/blocks/TextAndMedia/config'
import { RichText } from '@/blocks/RichTextBlock/config'
import { Banner } from '@/blocks/BannerBlock/config'
import SliderBlock from '@/blocks/SliderBlock/config'
import ClassesBlock from '@/blocks/Classes/config'
import { MembershipsBlock } from '@/blocks/Memberships/config'
import { MediaGridBlock } from '@/blocks/MediaGridBlock/config'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) => {
      // Get the original preview path
      const originalPath = generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req,
      })

      // Extract just the pathname and query parameters, removing any existing domain
      let cleanPath = originalPath
      if (originalPath.includes('://')) {
        // If it has a protocol, extract just the path portion
        const url = new URL(originalPath)
        cleanPath = url.pathname + url.search
      }

      // Use the public-facing domain from environment variable or config
      // You can set this in your .env file
      const publicDomain = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

      // Ensure clean joining of URL parts
      const baseUrl = publicDomain.endsWith('/') ? publicDomain.slice(0, -1) : publicDomain
      const pathWithoutLeadingSlash = cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath

      return `${baseUrl}/${pathWithoutLeadingSlash}`
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                Content,
                MediaBlock,
                FormBlock,
                TextAndMedia,
                RichText,
                Banner,
                MembershipsBlock,
                SliderBlock,
                ClassesBlock,
                MediaGridBlock,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
