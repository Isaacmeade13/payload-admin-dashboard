import type { CollectionConfig } from 'payload'

export const defaultAccessControl = (): CollectionConfig['access'] =>({
  create: ({ req: { user }, data }) => {
    if(user?.collection === 'admin'){
      return true
    }
    return false
  },
  read: () => true,
  update: ({ req: { user }, data }) => {
    if(user?.collection === 'admin'){
      return true
    }
    return false
  },
  delete: ({ req: { user }, data }) => {
    if(user?.collection === 'admin'){
      return true
    }
    return false
  },

  readVersions: ({ req: { user }, data }) => {
    if(user?.collection === 'admin'){
      return true
    }
    return false
  },
})