const { books, authors } = require('../data/static')
const Author = require('../models/Author')
const Book = require('../models/Book')

const resolvers = {
  //  QUERRY
  Query: {
    books: async (parent, args, { mongooseDataMethods }) =>
      await mongooseDataMethods.getAllBooks(),
    book: (parent, args) => books.find((book) => book.id == args.id),
    authors: async (parent, args, { mongooseDataMethods }) =>
      await mongooseDataMethods.getAllAuthors(),
    author: (parent, args) => authors.find((author) => author.id == args.id),
  },
  Book: {
    author: (parent, args) => {
      return authors.find((author) => author.id == parent.authorId)
    },
  },
  Author: {
    books: (parent, args) => {
      return books.filter((book) => book.authorId == parent.id)
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
