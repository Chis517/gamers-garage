const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    gameCount: Int
    savedGames: [Game]
  }

  type Game {
    name: String!
    gameId: String!
    background_image: String
  }

  type Query {
    me: User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveGame(game: GameInput): User
    removeGame(gameId: String!): User
  }

  input GameInput {
    name: String!
    gameId: String!
    background_image: String
  }
`;

module.exports = typeDefs;