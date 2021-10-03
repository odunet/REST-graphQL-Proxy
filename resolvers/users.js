const { composeResolvers } = require('@graphql-tools/resolvers-composition');
const { authenticateReq } = require('../utils/auth');
const {users} = require('../assets/data');

const usersResolversFunc = async () => {
  let userData = await users

  const usersResolvers = {
  Query: {
    users: () => userData,
    user: (parent, { id }) => userData.find((userData) => userData.id === id)
  }
  };

  return composeResolvers(usersResolvers, {
    '*.*': [authenticateReq],
  })
}

module.exports =  usersResolversFunc