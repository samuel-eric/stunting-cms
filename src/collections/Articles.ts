import type { CollectionConfig } from 'payload'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    create: ({ req: { user } }) => {
      if (user && user.role === 'admin') {
        return true
      }
      return false
    },
    read: () => true,
    delete: ({ req: { user } }) => {
      if (user && user.role === 'admin') {
        return true
      }
      return false
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      index: true,
      access: {
        update: ({ req: { user } }) => {
          if (user && user.role === 'admin') {
            return true
          }
          return false
        },
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      access: {
        update: ({ req: { user } }) => {
          if (user && user.role === 'admin') {
            return true
          }
          return false
        },
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      access: {
        update: ({ req: { user } }) => {
          if (user && user.role === 'admin') {
            return true
          }
          return false
        },
      },
    },
    {
      name: 'readBy',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
    },
    {
      name: 'isRecommended',
      type: 'checkbox',
      label: 'Is the article recommended?',
      defaultValue: false,
      index: true,
      access: {
        update: ({ req: { user } }) => {
          if (user && user.role === 'admin') {
            return true
          }
          return false
        },
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      access: {
        update: ({ req: { user } }) => {
          if (user && user.role === 'admin') {
            return true
          }
          return false
        },
      },
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
      access: {
        update: ({ req: { user } }) => {
          if (user && user.role === 'admin') {
            return true
          }
          return false
        },
      },
    },
  ],
}
