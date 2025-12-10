import { blockCommonFields } from '@/fields/blockCommonFields'
import { linkGroup } from '@/fields/linkGroup'
import { Block } from 'payload'

export const RichText: Block = {
  slug: 'richTextBlock',
  interfaceName: 'RichTextBlock',
  imageURL: '/assets/blocks/RichText.png',
  imageAltText: 'RichText Block Image',
  labels: {
    singular: 'RichText Block',
    plural: 'RichText Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'titleDesc',
      type: 'array', // Changed to 'array'
      label: 'Title Description',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'media',
      type: 'upload',
      label: 'Media',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'description',
      type: 'array',
      label: 'Description',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
    linkGroup({
      appearances: ['default', 'outline', 'brandGradient', 'blackGradient'],
      overrides: {
        maxRows: 2,
      },
    }),
    ...blockCommonFields,
  ],
}
