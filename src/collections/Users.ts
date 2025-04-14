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
}
