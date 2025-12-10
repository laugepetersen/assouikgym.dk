import type { Field } from 'payload'
import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      name: 'title',
      type: 'textarea',
      label: 'Title',
      admin: {
        rows: 3,
        description: 'Use <br /> to add line breaks',
      },
    },
    {
      name: 'description', // Added description field
      type: 'textarea',
      label: 'Description',
      admin: {
        condition: (_, { type } = {}) => type === 'lowImpact',
        rows: 3,
      },
    },
    {
      name: 'features',
      type: 'array',
      admin: {
        condition: (_, { type } = {}) => ['highImpact'].includes(type),
      },
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
      label: 'Feature Items',
    },
    linkGroup({
      appearances: ['default', 'outline', 'brandGradient', 'blackGradient', 'glassyGradient'],
      overrides: {
        maxRows: 2,
      },
    }),
    // Background layers section
    {
      name: 'backgroundLayers',
      type: 'group',
      admin: {
        condition: (_, { type } = {}) => ['highImpact'].includes(type),
      },
      label: 'Background Layers',
      fields: [
        {
          name: 'baseLayer',
          type: 'group',
          label: 'Base Layer (Bottom)',
          fields: [
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              label: 'Media',
              admin: {
                description: 'Can be an image or video',
              },
            },
            {
              name: 'youtubeUrl',
              type: 'text',
              label: 'YouTube Video URL',
              admin: {
                description: 'Optional YouTube video URL for background',
              },
            },
            {
              name: 'fallbackImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Fallback Image',
              admin: {
                description: 'Image to display while video is loading',
              },
            },
          ],
        },
        {
          name: 'overlayColor',
          type: 'text',
          label: 'Overlay Color',
          defaultValue: '#000000',
          admin: {
            description: 'HEX color code (e.g. #000000 for black)',
          },
        },
        {
          name: 'overlayOpacity',
          type: 'number',
          label: 'Overlay Opacity',
          min: 0,
          max: 100,
          defaultValue: 0,
          admin: {
            description: 'Opacity of the overlay (0-100)',
          },
        },
      ],
    },
    {
      name: 'ownerName',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => ['highImpact'].includes(type),
      },
      label: 'Owner Name',
      defaultValue: 'YOUSSEF ASSOUIK',
    },
    {
      name: 'ownerTitle',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => ['highImpact'].includes(type),
      },
      label: 'Owner Title',
      defaultValue: 'Klubejer & verdensmester',
    },
    {
      name: 'brandLogo',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact'].includes(type),
      },
      relationTo: 'media',
      label: 'Brand Logo',
    },
  ],
  label: false,
}
