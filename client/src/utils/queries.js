import { gql } from "@apollo/client";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      savedGames {
        name
        gameId
        background_image
      }
    }
  }
`;