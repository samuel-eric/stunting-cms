import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    verify: false,
    maxLoginAttempts: 0,
  },
  access: {
    admin: ({ req: { user } }) => {
      if (user && user.role === 'admin') {
        return true
      }
      return false
    },
    create: () => true,
    update: ({ req: { user }, id }) => (user ? user.id === id : false),
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'role',
      type: 'select',
      options: ['admin', 'user'],
      defaultValue: 'user',
      admin: {
        isClearable: false,
        isSortable: false,
      },
    },
    {
      name: 'username',
      type: 'text',
      unique: true,
      required: true,
    },
    {
      name: 'profile',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'bookmarks',
      type: 'relationship',
      relationTo: 'articles',
      hasMany: true,
    },
    {
      name: 'forums',
      type: 'join',
      collection: 'forums',
      on: 'writer',
    },
  ],
  endpoints: [
    {
      path: '/:id/password-token',
      method: 'get',
      handler: async (req) => {
        const userId = req.routeParams?.id
        if (!req.user || req.user.id !== Number(userId)) {
          return Response.json({ error: 'forbidden' }, { status: 403 })
        }
        const token = await req.payload.forgotPassword({
          collection: 'users',
          data: {
            email: req.user.email,
          },
          disableEmail: true,
        })
        return Response.json({ token })
      },
    },
  ],
}
