import type { CollectionConfig } from 'payload'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
    },
    {
      name: 'isRecommended',
      type: 'checkbox',
      label: 'Is the article recommended?',
      defaultValue: false,
      index: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
      hooks: {
        afterRead: [
          async ({ req, value }) => {
            if (req.payloadAPI === 'REST' && req.headers.get('x-app-request') == 'true') {
              const data: SerializedEditorState = value
              const html = convertLexicalToHTML({ data })
              return html
            }
          },
        ],
      },
    },
  ],
}
