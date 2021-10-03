// resolvers/books.js
const { posts, books } = require('../data');
const { composeResolvers } = require('@graphql-tools/resolvers-composition');
const { authenticateReq } = require('../utils/auth');

const booksResolversFunc = async () => {
  let postsData = await posts

  const booksResolvers = {
    Query: {
      books: () => books,
      book: (parent, { id }) => {
        return books.find((book) => book.id === id);
      }
    },
    Book: {
      posts: (book) => {
        return postsData.find((postData) => postData.id === book.authorId);
      }
    },
    Mutation: {
      createBook: (parent, { newBook }) => {
        const createdBook = { id: books.length + 1, ...newBook };
        books.push(createdBook);
        return createdBook;
      }
    }
  };

  return composeResolvers(booksResolvers, {
    '*.*': [authenticateReq],
  })
}

module.exports = booksResolversFunc;
