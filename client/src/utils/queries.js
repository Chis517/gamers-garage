import { gql } from "@apollo/client";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      savedGamess {
        name
        id
        background_image
        rating
      }
    }
  }
`;