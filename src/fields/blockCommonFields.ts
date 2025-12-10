import { Field } from 'payload'

// Common properties for blocks to be reused across different block types
export const blockCommonFields: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'visibility',
        type: 'checkbox',
        label: 'Visibility',
        admin: {
          description: 'Toggle to show/hide the block without deleting it',
          width: '100%',
        },
        defaultValue: true,
      },
      {
        name: 'anchor',
        type: 'text',
        label: 'Anchor ID',
        admin: {
          description: 'Slug format to name the ID of section and be able to link to it',
          width: '50%',
        },
      },
      {
        name: 'spacing',
        type: 'select',
        label: 'Spacing',
        admin: {
          description: 'Select top/bottom spacing',
          width: '50%',
        },
        options: [
          {
            label: 'None',
            value: 'none',
          },
          {
            label: 'Default',
            value: 'default',
          },
          {
            label: 'Small',
            value: 'small',
          },
        ],
        defaultValue: 'default',
      },
    ],
  },
]
