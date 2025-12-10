import { Block } from 'payload'
import { blockCommonFields } from '@/fields/blockCommonFields'
import { link } from '@/fields/link'

export const ClassesBlock: Block = {
  slug: 'classesBlock',
  interfaceName: 'ClassesBlock',
  imageURL: '/assets/blocks/Classes.png',
  imageAltText: 'Classes Block Image',
  labels: {
    singular: 'Classes Block',
    plural: 'Classes Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'Hold & Skema',
    },
    {
      name: 'showButton',
      type: 'checkbox',
      label: 'Show button',
      defaultValue: false,
      admin: {
        description: 'Button to redirect to Hold & Skema page',
      },
    },
    // Add the link field, but only show it when showButton is enabled
    link({
      overrides: {
        name: 'link',
        label: 'Button',
        admin: {
          condition: (data, siblingData) => {
            // Try both data and siblingData
            return Boolean(data?.showButton) || Boolean(siblingData?.showButton)
          },
        },
      },
      appearances: ['default', 'outline', 'brandGradient', 'blackGradient', 'glassyGradient'],
    }),
    {
      name: 'classes',
      type: 'relationship',
      label: 'Classes to display',
      relationTo: 'classes',
      hasMany: true,
      required: true,
    },
    ...blockCommonFields,
  ],
}

export default ClassesBlock
