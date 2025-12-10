import { blockCommonFields } from '@/fields/blockCommonFields'
import { link } from '@/fields/link'
import { Block } from 'payload'

export const SliderBlock: Block = {
  slug: 'sliderBlock',
  interfaceName: 'SliderBlock',
  imageURL: '/assets/blocks/Slider.png',
  imageAltText: 'Slider Block Image',
  labels: {
    singular: 'Slider',
    plural: 'Sliders',
  },
  fields: [
    {
      name: 'slides',
      type: 'array',
      label: 'Slides',
      fields: [
        {
          name: 'backgroundImage',
          type: 'upload',
          label: 'Background Image',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Slide Title',
          localized: true,
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Slide Description',
          localized: true,
        },
        link({
          appearances: ['default', 'transparent'],
          makeOptional: true,
        }),
      ],
    },
    ...blockCommonFields,
  ],
}

export default SliderBlock
