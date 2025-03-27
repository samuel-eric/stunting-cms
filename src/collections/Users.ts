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
      return user?.email === 'admin@mail.com'
    },
    create: () => true,
    update: ({ req: { user }, id }) => (user ? user.id === id : false),
  },
  fields: [
    // Email added by default
    // Add more fields as needed
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
