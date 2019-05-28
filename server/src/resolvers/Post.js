const Post = {
  author: ({ id }, args, context) => {
    return context.prisma.post({ id }).author()
  },
}

export { Post }
