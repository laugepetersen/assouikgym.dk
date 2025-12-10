import { blockCommonFields } from '@/fields/blockCommonFields'
import { Block } from 'payload'

export const MembershipsBlock: Block = {
  slug: 'membershipsBlock',
  interfaceName: 'MembershipsBlock',
  imageURL: '/assets/blocks/Memberships.png',
  imageAltText: 'Memberships Block Image',
  labels: {
    singular: 'Membership',
    plural: 'Memberships',
  },
  fields: [
    {
      name: 'memberships',
      type: 'relationship',
      label: 'Membership Options',
      relationTo: 'memberships',
      hasMany: true,
      required: true,
    },
    ...blockCommonFields,
  ],
}
