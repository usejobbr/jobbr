const User = {
  posts: ({ id }, args, context) => {
    return context.prisma.user({ id }).posts()
  },
}

export { User }
