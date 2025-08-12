import type { CollectionConfig, CollectionBeforeDeleteHook } from 'payload'

// Define the beforeDelete hook
const deleteComments: CollectionBeforeDeleteHook = async ({ req, id }) => {
  const { payload } = req

  try {
    const commentsToDelete = await payload.find({
      collection: 'comments',
      where: {
        forum: {
          equals: id,
        },
      },
      depth: 0,
      pagination: false,
    })

    const commentIds = commentsToDelete.docs.map((comment) => comment.id)

    if (commentIds.length > 0) {
      await payload.delete({
        collection: 'comments',
        where: {
          id: {
            in: commentIds,
          },
        },
      })
    }
  } catch (error) {
    console.error('Error deleting associated comments:', error)
  }
}

export const Forums: CollectionConfig = {
  slug: 'forums',
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    beforeDelete: [deleteComments],
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
    update: async ({ req: { user, payload }, id }) => {
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
