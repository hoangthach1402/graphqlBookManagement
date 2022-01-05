// const { books, authors } = require('../data/static')
const Author = require('../models/Author')
const Book = require('../models/Book')

const resolvers = {
  //  QUERRY
  Query: {
    books: async (parent, args, { mongooseDataMethods }) =>
      await mongooseDataMethods.getAllBooks(),
    book: async (parent, { id }, { mongooseDataMethods }) =>
      await mongooseDataMethods.getBook(id),
    authors: async (parent, args, { mongooseDataMethods }) =>
      await mongooseDataMethods.getAllAuthors(),
    author: async (parent, { id }, { mongooseDataMethods }) =>
      await mongooseDataMethods.getAuthorById(id),
  },
  Book: {
    author: async ({ authorId }, args, { mongooseDataMethods }) => {
      const result = await mongooseDataMethods.getAuthorById(authorId)
      console.log(result)
      return result
      // console.log(authorId)
    },
  },
  Author: {
    books: async ({ _id }, args, { mongooseDataMethods }) => {
      const result = await mongooseDataMethods.getAllBooks({ authorId: _id })
      // console.log(parent)
      return result
    },
  },
  //   MUTATION
  Mutation: {
    createAuthor: async (parent, args, { mongooseDataMethods }) => {
      await mongooseDataMethods.createAuthor(args)
    },
    createBook: async (parent, args, { mongooseDataMethods }) => {
      await mongooseDataMethods.createBook(args)
    },
  },
}

module.exports = resolvers
