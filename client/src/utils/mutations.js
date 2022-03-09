import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_GAME = gql`
  mutation saveGame($game: GameInput!) {
    saveGame(game: $game) {
      username
      email
      savedGames {
        name
        id
        background_image
        rating
      }
    }
  }
`;

export const REMOVE_GAME = gql`
  mutation removeGame($gameId: String!) {
    removeGame(gameId: $gameId) {
      _id
      username
      email
      savedGames {
        name
        id
        background_image
        rating
      }
      gameCount
    }
  }
`;