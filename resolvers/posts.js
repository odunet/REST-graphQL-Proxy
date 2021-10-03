const { composeResolvers } = require('@graphql-tools/resolvers-composition');
const { posts, users } = require('../assets/data');
const { authenticateReq } = require('../utils/auth');

const postsResolversFunc = async () => {
  let postsData = await posts
  let usersData = await users

  const postsResolvers = {
  Query: {
    posts: () => postsData,
    post: (parent, { id }) => postsData.find((postData) => postsData.id === id)
  },
  Post: {
    users: (post) => {
      return usersData.filter((userData) => userData.id === post.id);
    },
  },
  };

  return composeResolvers(postsResolvers, {
    '*.*': [authenticateReq],
  })
}

module.exports =  postsResolversFunc 