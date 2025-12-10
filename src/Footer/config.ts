import type { GlobalConfig } from 'payload'
import { revalidateFooter } from './hooks/revalidateFooter'
import { linkGroup } from '@/fields/linkGroup'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'topSection',
      type: 'group',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'Vi bruger SportSolution til holdtilmelding',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue:
            'Deep LaCroix-denim slow-carb polaroid. Small retina v-3 moon jar cardigan banh mi humblebreg meditation hotel. Trust carry-on chia family to fit boys.',
        },
        linkGroup({
          appearances: ['default', 'outline', 'brandGradient', 'blackGradient'],
          overrides: {
            maxRows: 2,
          },
        }),
      ],
    },
    {
      name: 'contactInfo',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'text',
          defaultValue: 'info@assouikgym.dk',
        },
        {
          name: 'phone',
          type: 'text',
          defaultValue: '+45 12 34 56 78',
        },
        {
          name: 'cvr',
          type: 'text',
          defaultValue: 'Cvr 41254335',
        },
        {
          name: 'address',
          type: 'text',
          defaultValue: 'Frederiksundsvej 342, 2700 København',
        },
      ],
    },
    {
      name: 'brandName',
      type: 'text',
      defaultValue: 'Assouik Gym',
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
