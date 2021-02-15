const { AuthenticationError } = require('apollo-server')

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config')

// 
module.exports = (context) => {
  //context = { ... headers}
  // Gets the header from the context apollo server
  const authHeader = context.req.headers.authorization;
  // Checks the auth header was there/sent
  if(authHeader){
    // Gets the token from the auth header then splits to array ['Bearer', 'token']
    const token = authHeader.split('Bearer ')[1];
    // Checks that token exists
    if(token){
      // Checks that token is valid
      try {
        const user = jwt.verify(token, SECRET_KEY);
        
        return user;
      } catch (error) {
        throw new AuthenticationError('Invalid/Expired token')
      }
    }
    // If token auth failed/wrong format
    throw new Error('Authentication token must be \'Bearer [token]')
  }
  // If auth header wasn't recieved
  throw new Error('Authorization header must be provided')
}