import type { CollectionConfig } from 'payload'

export const Comments: CollectionConfig = {
  slug: 'comments',
  access: {
    delete: ({ req: { user } }) => {
      if (user && user.role === 'admin') {
        return true
      }
      return false
    },
  },
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
