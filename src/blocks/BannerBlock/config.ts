import { blockCommonFields } from '@/fields/blockCommonFields'
import { linkGroup } from '@/fields/linkGroup'
import { Block } from 'payload'

export const Banner: Block = {
  slug: 'banner',
  interfaceName: 'Banner',
  imageURL: '/assets/blocks/Banner.png',
  imageAltText: 'Banner Block Image',
  labels: {
    singular: 'Banner',
    plural: 'Banners',
  },
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      label: 'Background Image',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'kicker',
      type: 'text',
      label: 'Kicker',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'content',
      type: 'array',
      label: 'Content',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
    linkGroup({
      appearances: ['default', 'outline', 'brandGradient', 'blackGradient', 'glassyGradient'],
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'showMedia',
      type: 'checkbox',
      label: 'Show Media',
      defaultValue: true,
    },
    {
      name: 'media',
      type: 'upload',
      label: 'Media',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => Boolean(siblingData.showMedia),
      },
    },
    ...blockCommonFields,
  ],
}
