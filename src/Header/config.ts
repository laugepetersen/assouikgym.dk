import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'
import { linkGroup } from '@/fields/linkGroup'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
        // New optional sub-menu field
        {
          name: 'subMenu',
          label: 'Sub Menu',
          type: 'array',
          fields: [
            link({
              appearances: false,
            }),
          ],
          admin: {
            initCollapsed: true,
          },
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    // wrap the linkGroup inside a group so we can assign the desired field name ("buttons")
    {
      name: 'buttons',
      type: 'group',
      fields: [
        linkGroup({
          overrides: {
            maxRows: 2,
          },
        }),
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
