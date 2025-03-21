import type { CollectionConfig } from 'payload'

export const Forums: CollectionConfig = {
  slug: 'forums',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'writer',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
    },
    {
      name: 'comments',
      type: 'join',
      collection: 'comments',
      on: 'forum',
    },
  ],
}
