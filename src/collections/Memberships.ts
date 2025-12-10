// src/collections/Memberships.ts
import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'
import { link } from '@/fields/link'

export const Memberships: CollectionConfig = {
  slug: 'memberships',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Membership Title',
      required: true,
      localized: true,
    },
    ...slugField(),
    {
      name: 'price',
      type: 'text',
      label: 'Monthly Price',
      required: true,
    },
    {
      name: 'popular',
      type: 'checkbox',
      label: 'Mark as Popular',
      defaultValue: false,
    },
    {
      name: 'badgeText',
      type: 'text',
      label: 'Popular Badge Text',
      localized: true,
      admin: {
        condition: (data, siblingData) => siblingData.popular === true,
      },
    },
    {
      name: 'ageGroup',
      type: 'text',
      label: 'Age Group',
      localized: true,
    },
    {
      name: 'features',
      type: 'array',
      label: 'Membership Features',
      fields: [
        {
          name: 'description',
          type: 'text',
          label: 'Feature Description',
          required: true,
          localized: true,
        },
      ],
      admin: {
        initCollapsed: false,
      },
    },
    // {
    //   name: 'link',
    //   type: 'group',
    //   label: 'Call to Action',
    //   fields: [
    //     {
    //       type: 'row',
    //       fields: [
    //         {
    //           name: 'url',
    //           type: 'text',
    //           label: 'Link URL',
    //           required: true,
    //           admin: {
    //             width: '50%',
    //           },
    //         },
    //         {
    //           name: 'text',
    //           type: 'text',
    //           label: 'Link Text',
    //           localized: true,
    //           required: true,
    //           admin: {
    //             width: '50%',
    //           },
    //         },
    //         {
    //           name: 'style',
    //           type: 'select',
    //           label: 'Link Style',
    //           options: [
    //             { label: 'Default', value: 'default' },
    //             { label: 'Outline', value: 'outline' },
    //             { label: 'Brand Gradient', value: 'brand' },
    //             { label: 'Black Gradient', value: 'black' },
    //           ],
    //           defaultValue: 'default',
    //           admin: {
    //             width: '50%',
    //           },
    //         },
    //       ],
    //     },
    //   ],
    // },
    link({
      overrides: {
        name: 'link',
        label: 'Link',
      },
      appearances: ['default', 'outline', 'brandGradient', 'blackGradient', 'glassyGradient'],
    }),
    {
      name: 'savingsText',
      type: 'text',
      label: 'Annual Savings Text',
      localized: true,
    },
  ],
}
