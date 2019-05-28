import { getUserId } from '../utils'

const Query = {
  feed(parent, args, context) {
    return context.prisma.posts({ where: { published: true } })
  },
  drafts(parent, args, context) {
    const id = getUserId(context)
    const where = {
      published: false,
      author: {
        id,
      },
    }
    return context.prisma.posts({ where })
  },
  users(parent, args, context) {
    return context.prisma.users()
  },
  posts(parent, args, context) {
    return context.prisma.posts()
  },
  post(parent, { id }, context) {
    return context.prisma.post({ id })
  },
  me(parent, args, context) {
    const id = getUserId(context)
    return context.prisma.user({ id })
  },
}

export { Query }
