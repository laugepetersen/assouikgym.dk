import { GlobalConfig } from 'payload'

const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'typography',
      type: 'group',
      label: 'Typography',
      fields: [
        // Heading 1
        {
          name: 'heading1',
          type: 'group',
          label: 'Heading 1',
          fields: [
            {
              name: 'fontSize',
              type: 'text',
              label: 'Font Size',
              defaultValue: '3rem',
              admin: { width: '50%' },
            },
            {
              name: 'fontWeight',
              type: 'select',
              label: 'Font Weight',
              options: ['300', '400', '500', '600', '700', '800'],
              defaultValue: '700',
              admin: { width: '50%' },
            },
            {
              name: 'lineHeight',
              type: 'text',
              label: 'Line Height',
              defaultValue: '1.2',
              admin: { width: '50%' },
            },
            {
              name: 'letterSpacing',
              type: 'text',
              label: 'Letter Spacing',
              defaultValue: '-0.02em',
              admin: { width: '50%' },
            },
          ],
        },
        // Heading 2
        {
          name: 'heading2',
          type: 'group',
          label: 'Heading 2',
          fields: [
            {
              name: 'fontSize',
              type: 'text',
              label: 'Font Size',
              defaultValue: '2.5rem',
              admin: { width: '50%' },
            },
            {
              name: 'fontWeight',
              type: 'select',
              label: 'Font Weight',
              options: ['300', '400', '500', '600', '700', '800'],
              defaultValue: '600',
              admin: { width: '50%' },
            },
            {
              name: 'lineHeight',
              type: 'text',
              label: 'Line Height',
              defaultValue: '1.25',
              admin: { width: '50%' },
            },
            {
              name: 'letterSpacing',
              type: 'text',
              label: 'Letter Spacing',
              defaultValue: '-0.01em',
              admin: { width: '50%' },
            },
          ],
        },
        // Heading 3
        {
          name: 'heading3',
          type: 'group',
          label: 'Heading 3',
          fields: [
            {
              name: 'fontSize',
              type: 'text',
              label: 'Font Size',
              defaultValue: '2rem',
              admin: { width: '50%' },
            },
            {
              name: 'fontWeight',
              type: 'select',
              label: 'Font Weight',
              options: ['300', '400', '500', '600', '700'],
              defaultValue: '600',
              admin: { width: '50%' },
            },
            {
              name: 'lineHeight',
              type: 'text',
              label: 'Line Height',
              defaultValue: '1.3',
              admin: { width: '50%' },
            },
            {
              name: 'letterSpacing',
              type: 'text',
              label: 'Letter Spacing',
              defaultValue: '0',
              admin: { width: '50%' },
            },
          ],
        },
        // Heading 4
        {
          name: 'heading4',
          type: 'group',
          label: 'Heading 4',
          fields: [
            {
              name: 'fontSize',
              type: 'text',
              label: 'Font Size',
              defaultValue: '1.5rem',
              admin: { width: '50%' },
            },
            {
              name: 'fontWeight',
              type: 'select',
              label: 'Font Weight',
              options: ['300', '400', '500', '600'],
              defaultValue: '500',
              admin: { width: '50%' },
            },
            {
              name: 'lineHeight',
              type: 'text',
              label: 'Line Height',
              defaultValue: '1.35',
              admin: { width: '50%' },
            },
            {
              name: 'letterSpacing',
              type: 'text',
              label: 'Letter Spacing',
              defaultValue: '0.01em',
              admin: { width: '50%' },
            },
          ],
        },
        // Paragraph
        {
          name: 'paragraph',
          type: 'group',
          label: 'Paragraph',
          fields: [
            {
              name: 'fontSize',
              type: 'text',
              label: 'Font Size',
              defaultValue: '1rem',
              admin: { width: '50%' },
            },
            {
              name: 'fontWeight',
              type: 'select',
              label: 'Font Weight',
              options: ['300', '400', '500'],
              defaultValue: '400',
              admin: { width: '50%' },
            },
            {
              name: 'lineHeight',
              type: 'text',
              label: 'Line Height',
              defaultValue: '1.5',
              admin: { width: '50%' },
            },
            {
              name: 'letterSpacing',
              type: 'text',
              label: 'Letter Spacing',
              defaultValue: '0',
              admin: { width: '50%' },
            },
          ],
        },
        // Small Text
        {
          name: 'small',
          type: 'group',
          label: 'Small Text',
          fields: [
            {
              name: 'fontSize',
              type: 'text',
              label: 'Font Size',
              defaultValue: '0.875rem',
              admin: { width: '50%' },
            },
            {
              name: 'fontWeight',
              type: 'select',
              label: 'Font Weight',
              options: ['300', '400', '500'],
              defaultValue: '400',
              admin: { width: '50%' },
            },
            {
              name: 'lineHeight',
              type: 'text',
              label: 'Line Height',
              defaultValue: '1.6',
              admin: { width: '50%' },
            },
            {
              name: 'letterSpacing',
              type: 'text',
              label: 'Letter Spacing',
              defaultValue: '0.01em',
              admin: { width: '50%' },
            },
          ],
        },
        // Button Text
        {
          name: 'buttonText',
          type: 'group',
          label: 'Button Text',
          fields: [
            {
              name: 'fontSize',
              type: 'text',
              label: 'Font Size',
              defaultValue: '1rem',
              admin: { width: '50%' },
            },
            {
              name: 'fontWeight',
              type: 'select',
              label: 'Font Weight',
              options: ['500', '600', '700'],
              defaultValue: '600',
              admin: { width: '50%' },
            },
            {
              name: 'lineHeight',
              type: 'text',
              label: 'Line Height',
              defaultValue: '1.5',
              admin: { width: '50%' },
            },
            {
              name: 'letterSpacing',
              type: 'text',
              label: 'Letter Spacing',
              defaultValue: '0.025em',
              admin: { width: '50%' },
            },
          ],
        },
      ],
    },
    // Colors group (unchanged from your original)
    {
      name: 'colors',
      type: 'group',
      label: 'Colors',
      fields: [
        {
          name: 'brandGradient',
          type: 'group',
          label: 'Brand Gradient',
          fields: [
            { name: 'start', type: 'text', label: 'Start Color', defaultValue: '#FFEE03' },
            { name: 'end', type: 'text', label: 'End Color', defaultValue: '#FFBF01' },
          ],
        },
        {
          name: 'blackGradient',
          type: 'group',
          label: 'Black Gradient',
          fields: [
            { name: 'start', type: 'text', label: 'Start Color', defaultValue: '#2F2F2F' },
            { name: 'end', type: 'text', label: 'End Color', defaultValue: '#000000' },
          ],
        },
        { name: 'black', type: 'text', label: 'Black', defaultValue: '#1F1F1F' },
        {
          name: 'textSecondary',
          type: 'text',
          label: 'Text Secondary',
          defaultValue: 'rgba(31, 31, 31, 0.8)',
        },
        {
          name: 'textSecondaryInversed',
          type: 'text',
          label: 'Text Secondary Inversed',
          defaultValue: 'rgba(255, 255, 255, 0.8)',
        },
        { name: 'white', type: 'text', label: 'White', defaultValue: '#FFFFFF' },
        { name: 'beige', type: 'text', label: 'Beige', defaultValue: '#F5F1EE' },
      ],
    },
  ],
}

export default SiteSettings
