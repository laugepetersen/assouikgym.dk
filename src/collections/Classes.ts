// src/collections/Classes.ts

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { linkGroup } from '@/fields/linkGroup'
import { slugField } from '@/fields/slug'
import { CollectionConfig } from 'payload'

export const Classes: CollectionConfig = {
  slug: 'classes',
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
      label: 'Class Title',
      required: true,
      localized: true,
    },
    ...slugField(),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Class Image',
      required: true,
    },
    {
      name: 'ageRequirement',
      type: 'text',
      label: 'Age Requirement',
      admin: {
        description: 'e.g. +18 år',
      },
    },
    {
      name: 'price',
      type: 'text',
      label: 'Price',
      admin: {
        description: 'e.g. fra 249 dkk / md',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      localized: true,
    },
    linkGroup({
      appearances: ['default', 'brandGradient', 'outline'],
      overrides: {
        maxRows: 2,
      },
    }),
  ],
}
