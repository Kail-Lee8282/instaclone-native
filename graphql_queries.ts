import { gql } from "@apollo/client";

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const ME_QUERY = gql`
  query me {
    me {
      userName
      avatar
      totalFollowing
      totalFollowers
    }
  }
`;

const SEARCH_PHOTOS = gql`
  query searchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      id
      file
    }
  }
`;
