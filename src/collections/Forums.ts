import type { CollectionConfig } from 'payload'

export const Forums: CollectionConfig = {
  slug: 'forums',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    delete: async ({ req: { user, payload }, id }) => {
      if (user !== null) {
        try {
          const forum = await payload.findByID({
            collection: 'forums',
            id: id!,
            depth: 0,
          })
          return forum.writer === user.id
        } catch (_error) {
          return false
        }
      } else {
        return false
      }
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
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'body',
      type: 'textarea',
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
