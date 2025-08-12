import type { CollectionConfig } from 'payload'

export const Comments: CollectionConfig = {
  slug: 'comments',
  fields: [
    {
      name: 'writer',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'forum',
      type: 'relationship',
      relationTo: 'forums',
      required: true,
    },
    {
      name: 'body',
      type: 'textarea',
      required: true,
    },
  ],
}
