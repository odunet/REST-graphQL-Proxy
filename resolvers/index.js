const postsResolversFunc = require('./posts');
const booksResolversFunc = require('./books');
const usersResolversFunc = require('./users');

const rootResolver = {};

const resolvers = async () => {
  try {
    const usersResolvers = await usersResolversFunc()
    const postsResolvers = await postsResolversFunc()
    const bookResolvers = await booksResolversFunc()
    const resolvers = [rootResolver, postsResolvers, bookResolvers, usersResolvers];
    return resolvers
  } catch (e) {
    console.log(e);
  }
}

module.exports = resolvers;