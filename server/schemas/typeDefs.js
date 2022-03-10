const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
  }

  type User {
    _id: ID!
    username: String
    email: String
    savedGames: [Game]
  }

  type Game {
    name: String
    gameId: ID!
    background_image: String
  }

  input savedGamesInput {
    name: String
    gameId: ID!
    background_image: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveGame(body: savedGamesInput): User
    removeGame(gameId: ID!): User
  }
`;

module.exports = typeDefs;