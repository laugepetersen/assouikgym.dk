import type { Block, Field } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
import { blockCommonFields } from '@/fields/blockCommonFields'

const mediaGridItemFields: Field[] = [
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media', // Adjust this to match your media collection slug
    required: true,
  },
  {
    name: 'heading',
    type: 'text',
    required: true,
  },
  {
    name: 'description',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ defaultFeatures }) => {
        return [
          ...defaultFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
  },
  link({
    appearances: ['default', 'transparent'],
    makeOptional: true,
  }),
]

export const MediaGridBlock: Block = {
  slug: 'mediaGridBlock',
  interfaceName: 'MediaGridBlock',
  imageURL: '/assets/blocks/MediaGrid.png', // Optional: add your own block image
  imageAltText: 'Media Grid Block Image', // Optional
  fields: [
    {
      name: 'items',
      type: 'array',
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: {
            path: '@/components/RowLabel',
            clientProps: {
              fieldToShow: 'heading',
              fallback: 'Item',
            },
          },
        },
      },
      fields: mediaGridItemFields,
      minRows: 1,
    },
    ...blockCommonFields,
  ],
}
