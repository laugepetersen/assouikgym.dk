import { blockCommonFields } from '@/fields/blockCommonFields'
import { linkGroup } from '@/fields/linkGroup'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const TextAndMedia: Block = {
  slug: 'textAndMedia',
  interfaceName: 'TextAndMedia',
  imageURL: '/assets/blocks/TextAndMedia.png',
  imageAltText: 'Text and Media Block Image',
  labels: {
    singular: 'Text & Media Block',
    plural: 'Text & Media Blocks',
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'textAndMedia1',
      label: 'Layout Type',
      options: [
        {
          label: 'Text & Media',
          value: 'textAndMedia1',
        },
        {
          label: 'Video Block',
          value: 'textAndMedia2',
        },
      ],
      required: true,
    },
    {
      name: 'direction',
      type: 'select',
      label: 'Image Direction',
      defaultValue: 'right',
      options: [
        {
          label: 'Image Right',
          value: 'right',
        },
        {
          label: 'Image Left',
          value: 'left',
        },
      ],
      admin: {
        condition: (_, { type } = {}) => type === 'textAndMedia1',
      },
      required: true,
    },
    {
      name: 'heading',
      type: 'richText',
      label: 'Heading',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => {
          return [
            ...defaultFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Items',
      admin: {
        condition: (_, { type } = {}) => type === 'textAndMedia1',
      },
      minRows: 1,
      fields: [
        {
          name: 'icon',
          type: 'upload',
          label: 'Icon',
          relationTo: 'media',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
        },
      ],
    },
    {
      name: 'mediaGallery',
      type: 'group',
      label: 'Media Gallery (Right Side)',
      admin: {
        description: 'Upload separate images for desktop and mobile views.',
      },
      fields: [
        {
          name: 'desktopMedia',
          type: 'upload',
          label: 'Desktop',
          relationTo: 'media',
          admin: {
            description: 'Desktop image for larger screens',
          },
        },
        {
          name: 'mobileMedia',
          type: 'upload',
          label: 'Mobile',
          relationTo: 'media',
          admin: {
            description: 'Mobile image for smaller screens',
          },
        },
        {
          name: 'youtubeUrl',
          type: 'text',
          label: 'YouTube URL',
          admin: {
            description: 'YouTube URL for background video, leave empty for image',
          },
        },
      ],
    },
    {
      admin: {
        condition: (_, { type } = {}) => type === 'textAndMedia1',
      },
      ...linkGroup({
        appearances: ['default', 'outline', 'brandGradient', 'blackGradient'],
        overrides: {
          maxRows: 2,
        },
      }),
    },
    ...blockCommonFields,
  ],
}
